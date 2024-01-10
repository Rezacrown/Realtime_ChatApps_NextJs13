// Import konfigurasi NextAuth
import { authOptions } from "@/app/config/auth";

// Import NextAuth handler
import NextAuth from "next-auth/next";

// Buat handler NextAuth dengan konfigurasi
const handler = NextAuth(authOptions);

// Export handler untuk method GET dan POST
export { handler as GET, handler as POST };
