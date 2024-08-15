import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './api/auth';
import { jwtDecode } from 'jwt-decode';

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

    const decodedToken = jwtDecode<{ role: string }>(token);
    const userRole = decodedToken.role;

    const url = req.nextUrl;

    if (userRole === 'cashier' && url.pathname.startsWith('/dashboard-admin')) {
      return NextResponse.redirect(new URL('/dashboard-cashier/products', req.url));
    } else if (userRole === 'admin' && url.pathname.startsWith('/dashboard-cashier')) {
      return NextResponse.redirect(new URL('/dashboard-admin', req.url));
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
