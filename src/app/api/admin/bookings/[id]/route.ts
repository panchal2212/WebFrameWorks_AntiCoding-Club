import { connectToDB } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { NextResponse } from 'next/server';

export async function DELETE(
  _: Request,
  context: any // ✅ Let Next.js infer everything to avoid conflict with Vercel types
) {
  const id = context.params?.id;

  if (!id) {
    return NextResponse.json({ error: 'Missing booking ID' }, { status: 400 });
  }

  await connectToDB();

  try {
    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    console.log(`✅ Admin deleted booking ${id}`);
    return NextResponse.json({ message: 'Booking deleted successfully' });
  } catch (error: any) {
    console.error('❌ Deletion error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
