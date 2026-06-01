import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Google,
    Credentials({
      // Credentials config for development
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("AUTH: authorize called with", credentials?.email);
        if (!credentials?.email || !credentials?.password) return null;
        
        // Manual bypass for development
        if (credentials.email === "admin@neko.com" && credentials.password === "admin123") {
          console.log("AUTH: Bypass triggered for admin@neko.com");
          return {
            id: "dev-admin",
            name: "Admin Dev",
            email: "admin@neko.com",
            role: "ADMIN",
          };
        }
        
        console.log("AUTH: Falling back to Prisma search");
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          });

          if (user && user.password) {
            const isPasswordValid = await bcrypt.compare(
              credentials.password as string,
              user.password
            );

            if (isPasswordValid) {
              return user;
            }
          }
        } catch (error) {
          console.error("AUTH: Prisma error", error);
        }
        
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});
