// Import PrismaAdapter dari @next-auth/prisma-adapter
import { PrismaAdapter } from "@next-auth/prisma-adapter";

// Import tipe NextAuthOptions dari next-auth
import type { NextAuthOptions } from "next-auth";

// Import GithubProvider dari next-auth/providers/github
import GithubProvider from "next-auth/providers/github";

// Import instance PrismaClient
import { prisma } from "./db";

// Membuat variabel untuk konfigurasi NextAuth nya
export const authOptions: NextAuthOptions = {
  // Gunakan Prisma sebagai adapter
  adapter: PrismaAdapter(prisma),

  // Definisikan provider Github untuk otentikasi
  providers: [
    GithubProvider({
      // Credential Github dari env
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET_ID as string,
    }),
  ],
};
