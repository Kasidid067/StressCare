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

    const advisors = await prisma.user.findMany({
        where: {
            role: "ADVISOR",
            status: "ACTIVE",
        },

        select: {
            id: true,
            fullname: true,
        },

        orderBy: {
            fullname: "asc",
        },
    });

    return NextResponse.json(advisors);
}