// Verifies user is logged in
export { default } from 'next-auth/middleware';

// Verfifies for logged in for these paths only
export const config = { matcher: ['/views/:path*'] }