import formidable, { Fields, Files, File } from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { connectToDB } from '@/lib/mongoose';
import Submission from "@/models/Submission";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const uploadDir = path.join(process.cwd(), "public/uploads");

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

    const data = {
      ...normalizedFields,
      image: imagePath,
    };

    await connectToDB();
    const saved = await Submission.create(data);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ success: true, data });

  } catch (error) {
    console.error("Form parsing error:", error);
    return res.status(500).json({ error: "Form parsing failed" });
  }
}
