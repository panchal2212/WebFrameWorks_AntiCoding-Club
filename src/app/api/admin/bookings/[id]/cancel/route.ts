import { connectToDB } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { NextResponse, type NextRequest } from 'next/server';

export async function PATCH(request: NextRequest, context: any) {
  const id = context?.params?.id;

  if (!id) {
    return NextResponse.json({ error: 'Missing booking ID' }, { status: 400 });
  }

  await connectToDB();

  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    if (booking.status === 'cancelled') {
      return NextResponse.json({ message: 'Booking already cancelled' }, { status: 200 });
    }

    booking.status = 'cancelled';
    await booking.save();

    console.log(`❌ Booking ${id} cancelled by admin.`);
    return NextResponse.json({ message: 'Booking cancelled successfully' });
  } catch (err: any) {
    console.error('❌ Cancel error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
