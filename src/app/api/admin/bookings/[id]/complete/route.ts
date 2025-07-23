import Booking from '@/models/Booking';
import { connectToDB } from '@/lib/mongodb';
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

    if (booking.status === 'completed') {
      return NextResponse.json({ message: 'Booking already completed' }, { status: 200 });
    }

    booking.status = 'completed';
    await booking.save();

    console.log(`✅ Booking ${id} marked as completed.`);
    return NextResponse.json({ message: 'Booking marked as completed' });
  } catch (err: any) {
    console.error('❌ Completion error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
