import { connectToDB } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { NextResponse, type NextRequest } from 'next/server';
import type { RouteHandlerContext } from 'next/dist/server/web/types';

export async function PATCH(
  request: NextRequest,
  context: RouteHandlerContext<{ id: string }>
) {
  const { id } = context.params;

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

    console.log(`❌ Booking ${id} rejected by admin.`);

    return NextResponse.json({ message: 'Booking rejected' });
  } catch (err: any) {
    console.error('❌ Rejection error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
