import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";

export async function GET() {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json(
            {
                message: "Unauthorized",
            },
            {
                status: 401,
            }
        );
    }

    const records =
        await prisma.pulseRecord.findMany({
            where: {
                userId:
                    Number(session.user.id),
            },
            orderBy: {
                recordedAt: "desc",
            },
        });
    return NextResponse.json(
        records
    );
}

export async function POST() {
    const session =
        await auth();
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

    // จำลองค่าชีพจร
    const bpm =
        Math.floor(
            Math.random() * 41
        ) + 60; // 60-100

    // จำลองค่า SpO2
    const spo2 =
        Number(
            (
                97 +
                Math.random() * 3
            ).toFixed(1)
        );

    const record =
        await prisma.pulseRecord.create({
            data: {
                userId:
                    Number(session.user.id),
                bpm,
                spo2,
            },
        });
    return NextResponse.json(
        record
    );
}