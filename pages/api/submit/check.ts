import { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from "@/lib/mongoose";
import Submission from "@/models/Submission";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, submit } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    await connectToDB();
    console.log("✅ Mongo connected for email check");

    if (submit === "true") {
      const submittedEntry = await Submission.findOne({ email, isSubmitted: true });
      if (submittedEntry) {
        return res.status(200).json({ alreadySubmitted: true });
      }
      return res.status(200).json({ alreadySubmitted: false });
    } else {
      const existingEntry = await Submission.findOne({ email });
      console.log(existingEntry)
      if (existingEntry) {
        return res.status(200).json({ exists: true, data: existingEntry });
      }
    }

    return res.status(200).json({ exists: false });
  } catch (err) {
    console.error("❌ Check error:", err);
    return res.status(500).json({ error: 'Server error' });
  }
}
