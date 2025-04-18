import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { FormData } from '@/app/page';
import { connectToDB }  from '@/lib/connectDb';
import { v4 as uuidv4 } from 'uuid';
import { Submissions } from '@/models/Submissions';

export async function POST(request: NextRequest) {
  try {
    await connectToDB();
    cloudinary.config({ 
      cloud_name: process.env.cloudName, 
      api_key: process.env.cloudApiKey, 
      api_secret: process.env.cloudSecret,
    });

    const formData = await request.formData();

    const data: Partial<FormData> = {
      firstname: formData.get("firstname") as string,
      lastname: formData.get("lastname") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      clgName: formData.get("clgName") as string,
      course: formData.get("course") as string,
      class: formData.get("class") as string,
      div: formData.get("div") as string,
      rollNo: formData.get("rollNo") as string,
      image: formData.get("image") as File,
    };

    const subm = await Submissions.findOne({ email: data.email });
    if (subm) {
      return NextResponse.json(
        { 
          message: 'Email already exists',
          userData: subm,
          error: 'Email already exists',
        },
        { status: 400 }
      );
    }

    let submissionData = {
      userId: uuidv4(),
      firstName: data.firstname,
      lastName: data.lastname,
      email: data.email,
      phone: data.phone,
      clgName: data.clgName,
      course: data.course,
      class: data.class,
      div: data.div,
      rollNo: data.rollNo,
      profileImage: ''
    }

    const uuid = uuidv4();
    data.userId = uuid;

    if (data.image) {
      const bytes = data.image?.arrayBuffer();
      const buffer = Buffer.from(await bytes!);
      const base64Image = `data:${data.image?.type};base64,${buffer.toString("base64")}`;

      const uploadResult = await cloudinary.uploader
        .upload(base64Image, {
          folder: 'profilePictures',
          public_id: uuid,
          resource_type: 'auto'
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
          throw new Error('Image upload failed');
        });

      submissionData.profileImage = uploadResult.secure_url;
    }
    
    const submission = new Submissions(submissionData).save();

    
    return NextResponse.json(
      { 
        message: 'Form data received successfully',
        data: {
          ...data,
          image: data.image ? 'Image uploaded' : 'No image provided',
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing form data:', error);
    return NextResponse.json(
      { 
        message: 'Error processing form data',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await connectToDB();
    const formData = await request.formData();
    const data: Partial<FormData> = {
      firstname: formData.get("firstname") as string,
      lastname: formData.get("lastname") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      clgName: formData.get("clgName") as string,
      course: formData.get("course") as string,
      class: formData.get("class") as string,
      div: formData.get("div") as string,
      rollNo: formData.get("rollNo") as string,
      image: formData.get("image") as File,
    };

    if (data.image) {

    }

    const bytes = data.image?.arrayBuffer();
    const buffer = Buffer.from(await bytes!);
    const base64Image = `data:${data.image?.type};base64,${buffer.toString("base64")}`;
    const uuid = uuidv4();

    const user = await Submissions.findOne({ email: data.email });
    if (user) {

    }

    console.log('Submission:', user);

    const uploadResult = await cloudinary.uploader
      .upload(base64Image, {
        folder: 'profilePictures',
        public_id: uuid,
        resource_type: 'auto'
    })
      .catch((error) => {
        console.error('Error uploading image:', error);
        throw new Error('Image upload failed');
      });
    
    const submission = await Submissions.findOneAndUpdate(
      { email: data.email },
      {
        firstName: data.firstname,
        lastName: data.lastname,
        phone: data.phone,
        clgName: data.clgName,
        course: data.course,
        class: data.class,
        div: data.div,
        rollNo: data.rollNo,
        profileImage: uploadResult.secure_url
      },
      { new: true }
    );

    
    return NextResponse.json(
      { 
        message: 'Form data updated successfully',
        data: {
          ...data,
          image: data.image ? 'Image uploaded' : 'No image provided',
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing form data:', error);
    return NextResponse.json(
      { 
        message: 'Error processing form data',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}; 