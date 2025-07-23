import { connectToDB } from '@/lib/mongodb';
import ServiceOffer from '@/models/ServiceOffer';
import { NextResponse } from 'next/server';

export async function GET(_: Request, context: any) {
  const id = context?.params?.id;

  if (!id) {
    return NextResponse.json({ error: 'Missing offer ID' }, { status: 400 });
  }

  await connectToDB();

  try {
    const offer = await ServiceOffer.findById(id);

    if (!offer) {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 });
    }

    return NextResponse.json(offer);
  } catch (error: any) {
    console.error('❌ Fetch offer error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
