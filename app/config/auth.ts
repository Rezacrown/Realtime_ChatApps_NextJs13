// Import PrismaAdapter dari @next-auth/prisma-adapter
import { PrismaAdapter } from "@next-auth/prisma-adapter";

// Import tipe NextAuthOptions dari next-auth
import type {
  NextAuthOptions,
  User as NextAuthUserWithStringId,
} from "next-auth";

// Import GithubProvider dari next-auth/providers/github
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

// Import instance PrismaClient
import { prisma } from "./db";

// Membuat variabel untuk konfigurasi NextAuth nya
export const authOptions: NextAuthOptions = {
  // Gunakan Prisma sebagai adapter
  adapter: PrismaAdapter(prisma),

  // Definisikan provider Github untuk otentikasi
  providers: [
    // Credential Github dari env
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_SECRET_ID as string,
      profile(profile, tokens) {
        return {
          id: String(profile.id), // need to convert ke string
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
        } as NextAuthUserWithStringId;
      },
    }),

    GoogleProvider({
      // Credential Google dari env
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  debug: true,
};
