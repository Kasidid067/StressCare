import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json(
      { message: "Forbidden" },
      { status: 403 }
    );
  }

  const users = await prisma.user.findMany({
    include: {
      major: true,
      advisor: {
        select: {
          id: true,
          fullname: true,
        },
      },
    },
    orderBy: {
      fullname: "asc",
    },
  });

  return NextResponse.json(users);
}