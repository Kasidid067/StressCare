import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";

export async function GET() {

    const session = await auth();

    if (
        !session?.user ||
        session.user.role !== Role.STUDENT
    ) {
        return NextResponse.json(
            {
                message: "Unauthorized",
            },
            {
                status: 401,
            }
        );
    }

    const logs =
        await prisma.activityLog.findMany({
            where: {
                userId:
                    Number(session.user.id),
            },
            include: {
                activity: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    return NextResponse.json(
        logs
    );
}

export async function POST(
    req: Request
) {
    const session = await auth();
    if (
        !session?.user ||
        session.user.role !== Role.STUDENT
    ) {
        return NextResponse.json(
            {
                message: "Unauthorized",
            },
            {
                status: 401,
            }
        );
    }
    const body =
        await req.json();

    const {
        activityId,
    } = body;

    const exists =
        await prisma.activityLog.findFirst({
            where: {
                userId:
                    Number(session.user.id),
                activityId,
            },
        });
    if (exists) {
        return NextResponse.json(
            {
                message:
                    "ทำกิจกรรมนี้แล้ว",
            },
            {
                status: 400,
            }
        );
    }

    const log =
        await prisma.activityLog.create({
            data: {
                userId:
                    Number(session.user.id),
                activityId,
                completed: true,
                completedAt:
                    new Date(),
            },
        });
    return NextResponse.json(
        log
    );
}