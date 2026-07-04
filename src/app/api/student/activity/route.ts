import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const latestResult = await prisma.stressResult.findFirst({
    where: {
      userId: Number(session.user.id),
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!latestResult) {
    return NextResponse.json([]);
  }

  const activities = await prisma.activity.findMany({
    where: {
      stressLevel: latestResult.stressLevel,
    },
    orderBy: {
      duration: "asc",
    },
  });

  return NextResponse.json(activities);
}