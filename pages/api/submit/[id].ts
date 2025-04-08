// pages/api/submit/[id].ts

import formidable, { Fields, Files } from "formidable";
import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from '@/lib/mongoose';
import Submission from "@/models/Submission";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "GET") {
    await connectToDB();
    const existing = await Submission.findById(id);
    if (!existing) {
      return res.status(404).json({ error: "Submission not found" });
    }
    return res.status(200).json({ success: true, data: existing });
  }  

  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const uploadDir = path.join(process.cwd(), "/uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    multiples: false,
  });

  try {
    const [fields, files] = await new Promise<[Fields, Files]>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
    const imagePath = imageFile && "filepath" in imageFile ? imageFile?.filepath.replace(/^public/, '') : null;

    const normalizedFields = Object.fromEntries(
      Object.entries(fields).map(([key, val]) => [key, Array.isArray(val) ? val[0] : val])
    );

    const updatedData = {
      ...normalizedFields,
    };

    if (imagePath) {
      updatedData.image = imagePath;
    }

    await connectToDB();

    const updated = await Submission.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ error: "Submission not found" });
    }

    return res.status(200).json({ success: true, data: updated });

  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ error: "Failed to update submission" });
  }
}
