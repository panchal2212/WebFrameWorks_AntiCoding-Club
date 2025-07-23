import { connectToDB } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { NextResponse, type NextRequest } from 'next/server';
import type { RouteHandlerContext } from 'next/dist/server/web/types'; // ✅ correct typing

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

    // Update logic here (customize as needed)
    booking.status = 'updated';
    await booking.save();

    console.log(`📦 Booking ${id} patched by admin`);

    return NextResponse.json({ message: 'Booking updated' });
  } catch (err: any) {
    console.error('❌ Booking update error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
