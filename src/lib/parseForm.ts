import { IncomingForm } from 'formidable';
import { NextRequest } from 'next/server';

export const parseForm = (req: NextRequest): Promise<{ fields: any; files: any }> => {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({ keepExtensions: true });

    form.parse(req as any, (err: any, fields: any, files: any) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
};
