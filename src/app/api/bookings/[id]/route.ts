import { connectToDB } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { NextResponse } from 'next/server';

export async function DELETE(_: Request, context: any) {
  const id = context?.params?.id;

  if (!id) {
    return NextResponse.json({ error: 'Missing booking ID' }, { status: 400 });
  }

  await connectToDB();

  try {
    const deleted = await Booking.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    console.log(`🗑️ Booking ${id} deleted.`);
    return NextResponse.json({ message: 'Booking deleted successfully' });
  } catch (error: any) {
    console.error('❌ Deletion error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
