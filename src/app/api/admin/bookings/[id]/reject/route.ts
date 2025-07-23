import Booking from '@/models/Booking';
import { NextResponse, type NextRequest } from 'next/server';
import { connectToDB } from '@/lib/mongodb';

export async function PATCH(request: NextRequest, context: any) {
  const id = context?.params?.id;

  if (!id) {
    return NextResponse.json({ error: 'Booking ID is missing' }, { status: 400 });
  }

  await connectToDB();

  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    if (booking.status === 'rejected') {
      return NextResponse.json({ message: 'Booking already rejected' }, { status: 200 });
    }

    booking.status = 'rejected';
    await booking.save();

    return NextResponse.json({ message: 'Booking rejected successfully' }, { status: 200 });
  } catch (err: any) {
    console.error('Error rejecting booking:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
