import User from '@/models/User';
import { NextResponse, type NextRequest } from 'next/server';

export async function PATCH(request: NextRequest, context: any) {
  const id = context.params?.id;

  try {
    const { role } = await request.json();
    if (!role || !['user', 'admin'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true });
    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.error('Update role error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
