import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {
    Role,
    StressLevel,
} from "@prisma/client";

export async function GET() {
    const session = await auth();
    if (
        !session?.user ||
        session.user.role !== Role.STAFF
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

    const students =
        await prisma.user.findMany({
            where: {
                role: Role.STUDENT,
            },
            include: {
                results: {
                    take: 1,
                    orderBy: {
                        createdAt: "desc",

                    },
                    include: {
                        pulse: true,
                    },
                },
            },
        });
    const advisors =
        await prisma.user.count({
            where: {
                role: Role.ADVISOR,
            },
        });
    let low = 0;
    let medium = 0;
    let high = 0;
    students.forEach(student => {
        const result =
            student.results[0];
        if (!result) return;
        switch (result.stressLevel) {
            case StressLevel.LOW:
                low++;
                break;
            case StressLevel.MEDIUM:
                medium++;
                break;
            case StressLevel.HIGH:
                high++;
                break;
        }
    });
    return NextResponse.json({
        totalStudents:
            students.length,
        totalAdvisors:
            advisors,
        low,
        medium,
        high,
    });
}