import User from '@/models/User';
import { NextResponse, type NextRequest } from 'next/server';

export async function DELETE(request: NextRequest, context: any) {
  const id = context.params?.id;

  try {
    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error: any) {
    console.error('User delete error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
