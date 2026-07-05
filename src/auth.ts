import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

function isAuthBypassEnabled() {
  return (
    process.env.NEXT_PUBLIC_AUTH_BYPASS === "true" ||
    process.env.AUTH_BYPASS === "true"
  );
}

const fakeSession = {
  user: {
    id: "1",
    name: "Development User",
    email: "dev@example.com",
    role: "ADMIN",
  },
};

const nextAuth = NextAuth({
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/login",
  },

  providers: [
    Credentials({
      name: "Credentials",

      credentials: {
        studentId: {
          label: "Student ID",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.studentId || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            studentId: credentials.studentId as string,
          },
        });

        if (!user) {
          return null;
        }

        // ถ้ามี status ใน User
        if ("status" in user && user.status === "INACTIVE") {
          return null;
        }

        const valid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!valid) {
          return null;
        }

        // อัปเดตเวลา Login ล่าสุด
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            lastLogin: new Date(),
          },
        });

        return {
          id: String(user.id),
          name: user.fullname,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }

      return session;
    },

    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
});

export const {
  handlers,
  signIn,
  signOut,
} = nextAuth;

export async function auth() {
  if (isAuthBypassEnabled()) {
    return fakeSession;
  }

  return nextAuth.auth();
}