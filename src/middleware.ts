// Verifies user is logged inx
import { withAuth } from "next-auth/middleware"

export default withAuth({})

// Verfifies for logged in for these paths only
export const config = { matcher: ['/views/:path*'] }