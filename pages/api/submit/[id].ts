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

  await connectToDB();

  if (req.method === "GET") {
    try {
      const existing = await Submission.findById(id);
      if (!existing) {
        return res.status(404).json({ error: "Submission not found" });
      }
      return res.status(200).json({ success: true, data: existing });
    } catch (error) {
      console.error("GET error:", error);
      return res.status(500).json({ error: "Server error" });
    }
  }

  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const uploadDir = path.join(process.cwd(), "/uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    multiples: false,
    filter: () => true,
  });

  try {
    const [fields, files] = await new Promise<[Fields, Files]>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        console.log("📝 Raw Fields from Formidable:", fields);
        console.log("📁 Raw Files:", files);
        resolve([fields, files]);
      });
    });

    const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
    const imagePath = imageFile && "filepath" in imageFile ? imageFile.filepath.replace(/^public/, '') : null;

    const normalizedFields: { [k: string]: string | number | boolean } = {};

    for (const [key, val] of Object.entries(fields)) {
      const value = Array.isArray(val) ? val[val.length - 1] : val;
      if (value !== undefined) {
        normalizedFields[key] = value;
      }
    }
    
    const parsedFields: { [key: string]: any } = { ...normalizedFields };
    if (parsedFields.step !== undefined) {
      parsedFields.step = parseInt(parsedFields.step, 10);
    }

    if (parsedFields.isSubmitted !== undefined) {
      parsedFields.isSubmitted = parsedFields.isSubmitted === "true";
    }

    if (imagePath) parsedFields.image = imagePath;
    console.log("Final normalizedFields:", normalizedFields);
    console.log("Parsed step:", parsedFields.step);
    console.log("Parsed isSubmitted:", parsedFields.isSubmitted);

    const updated = await Submission.findByIdAndUpdate(id, parsedFields, { new: true });
    if (!updated) return res.status(404).json({ error: "Submission not found" });

    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ error: "Failed to update submission" });
  }
}
