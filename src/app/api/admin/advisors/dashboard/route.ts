import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {

    const session = await auth();

    if (
        !session?.user ||
        session.user.role !== "ADVISOR"
    ) {
        return NextResponse.json(
            {
                message: "Forbidden",
            },
            {
                status: 403,
            }
        );
    }
    const advisorId = Number(session.user.id);
    const students = await prisma.user.findMany({

        where: {
            advisorId,
            role: "STUDENT",
        },

        include: {
            results: {
                take: 1,
                orderBy: {
                    createdAt: "desc",
                },
            },

        },

        orderBy: {
            fullname: "asc",
        },

    });

    return NextResponse.json({
        totalStudents: students.length,
        students,

    });

}