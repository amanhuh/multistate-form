import { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from "@/lib/mongoose";
import Submission from "@/models/Submission";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    await connectToDB();
    console.log("✅ Mongo connected for email check");
  
    const existing = await Submission.findOne({ email, isSubmitted: true });
    if (existing?.isSubmitted) {
      return res.status(200).json({ alreadySubmitted: true });
    }
  
    return res.status(200).json({ alreadySubmitted: false });
  } catch (err) {
    console.error("Check error:", err);
    return res.status(500).json({ error: 'Server error' });
  }
}
