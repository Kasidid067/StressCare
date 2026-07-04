import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Role, StressLevel } from "@prisma/client";

export async function GET() {

    const session = await auth();

    if (
        !session?.user ||
        session.user.role !== Role.STUDENT
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

    const userId =
        Number(session.user.id);

    const latestResult =
        await prisma.stressResult.findFirst({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

    // ยังไม่เคยประเมิน ST5
    if (!latestResult) {
        return NextResponse.json([]);
    }
    let levels: StressLevel[] = [];

    switch (
        latestResult.stressLevel
    ) {
        case StressLevel.LOW:
            levels = [
                StressLevel.LOW,
            ];
            break;
        case StressLevel.MEDIUM:
            levels = [
                StressLevel.MEDIUM,
                StressLevel.LOW,
            ];
            break;
        case StressLevel.HIGH:
            levels = [
                StressLevel.HIGH,
            ];
            break;
    }

    const activities =
        await prisma.activity.findMany({
            where: {
                stressLevel: {
                    in: levels,
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    return NextResponse.json(
        activities
    );
}