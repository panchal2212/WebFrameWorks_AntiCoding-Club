import { connectToDB } from '@/lib/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET(_: Request, context: any) {
  const id = context?.params?.id;

  if (!id) {
    return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
  }

  await connectToDB();

  try {
    const user = await User.findById(id).select('-password');

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error: any) {
    console.error('❌ Fetch user error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
