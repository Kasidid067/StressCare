import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json(
      { message: "Forbidden" },
      { status: 403 }
    );
  }

  const { studentId, advisorId } =
    await req.json();

  await prisma.user.update({
    where: {
      id: studentId,
    },
    data: {
      advisorId,
    },
  });

  return NextResponse.json({
    success: true,
  });
}