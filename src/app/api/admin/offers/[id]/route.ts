import Offer from '@/models/ServiceOffer';
import { connectToDB } from '@/lib/mongodb';
import { NextResponse, type NextRequest } from 'next/server';

export async function DELETE(request: NextRequest, context: any) {
  const id = context?.params?.id;

  if (!id) {
    return NextResponse.json({ error: 'Offer ID is missing' }, { status: 400 });
  }

  await connectToDB();

  try {
    const deleted = await Offer.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Offer deleted successfully' });
  } catch (error: any) {
    console.error('❌ Error deleting offer:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
