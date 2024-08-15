import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './api/auth';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  try {
    const response = await verifyToken(token);

    if (response.status !== 200) {
      throw new Error('Token verification failed');
    }
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/', req.url));
  }
}

export const config = {
  matcher: ['/dashboard-cashier/:path*', '/dashboard-admin/:path*'],
};
