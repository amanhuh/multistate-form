import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const data: { [key: string]: any } = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    console.log('Received form data:', data);

    return NextResponse.json(
      { 
        message: 'Form data received successfully',
        data: data 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing form data:', error);

    return NextResponse.json(
      { 
        message: 'Error processing form data',
        error: error instanceof Error ? error.message : 'Unknown error'
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