import { connectToDB } from '@/lib/mongodb';
import ServiceRequest from '@/models/ServiceRequest';
import { NextResponse } from 'next/server';

export async function GET(_: Request, context: any) {
  const id = context?.params?.id;

  if (!id) {
    return NextResponse.json({ error: 'Missing service request ID' }, { status: 400 });
  }

  await connectToDB();

  try {
    const request = await ServiceRequest.findById(id);

    if (!request) {
      return NextResponse.json({ error: 'Service request not found' }, { status: 404 });
    }

    return NextResponse.json(request);
  } catch (error: any) {
    console.error('❌ Fetch service request error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
