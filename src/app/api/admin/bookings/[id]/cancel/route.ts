import { connectToDB } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { NextResponse, type NextRequest } from 'next/server';
import type { RouteHandlerContext } from 'next/dist/server/web/types'; // ✅ key fix

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

    if (booking.status === 'cancelled') {
      return NextResponse.json({ message: 'Booking already cancelled' }, { status: 200 });
    }

    booking.status = 'cancelled';
    await booking.save();

    console.log(`❌ Booking ${id} cancelled by admin.`);

    return NextResponse.json({ message: 'Booking cancelled' });
  } catch (err: any) {
    console.error('❌ Cancellation error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
