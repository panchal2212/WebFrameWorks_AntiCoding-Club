import { connectToDB } from '@/lib/mongodb';
import Offer from '@/models/ServiceOffer';
import { NextResponse, type NextRequest } from 'next/server';
import type { RouteHandlerContext } from 'next/dist/server/web/types';

export async function DELETE(
  request: NextRequest,
  context: RouteHandlerContext<{ id: string }>
) {
  const { id } = context.params;

  await connectToDB();

  try {
    const deletedOffer = await Offer.findByIdAndDelete(id);

    if (!deletedOffer) {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 });
    }

    console.log(`🗑️ Offer ${id} deleted by admin.`);

    return NextResponse.json({ message: 'Offer deleted successfully' });
  } catch (err: any) {
    console.error('❌ Offer deletion error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
