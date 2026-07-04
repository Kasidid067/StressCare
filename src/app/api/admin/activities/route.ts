import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {
    ActivityCategory,
    Role,
    StressLevel,
} from "@prisma/client";

export async function GET() {
    const session = await auth();
    if (
        !session?.user ||
        session.user.role !== Role.ADMIN
    ) {
        return NextResponse.json(
            { message: "Forbidden" },
            { status: 403 }
        );

    }

    const activities =
        await prisma.activity.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    return NextResponse.json(
        activities
    );
}

export async function POST(
    req: Request
) {

    const session = await auth();
    if (
        !session?.user ||
        session.user.role !== Role.ADMIN
    ) {
        return NextResponse.json(
            { message: "Forbidden" },
            { status: 403 }
        );

    }
    const body =
        await req.json();

    const {
        title,
        description,
        duration,
        stressLevel,
        category,
        image,
    } = body;
    if (
        !title ||
        !description ||
        !duration
    ) {
        return NextResponse.json(
            {
                message:
                    "กรอกข้อมูลไม่ครบ",
            },
            {
                status: 400,
            }
        );
    }
    const activity =
        await prisma.activity.create({
            data: {
                title,
                description,
                duration:
                    Number(duration),
                stressLevel:
                    stressLevel as StressLevel,
                category:
                    category as ActivityCategory,
                image:
                    image ?? null,
            },
        });
    return NextResponse.json(
        activity
    );
}