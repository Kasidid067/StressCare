import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {
    ActivityCategory,
    Role,
    StressLevel,
} from "@prisma/client";

interface Params {
    params: Promise<{
        id: string;
    }>;
}

// =========================
// GET Activity By ID
// =========================
export async function GET(
    req: Request,
    { params }: Params
) {
    const session = await auth();
    if (
        !session?.user ||
        session.user.role !== Role.ADMIN
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
    const { id } = await params;
    const activity =
        await prisma.activity.findUnique({
            where: {
                id: Number(id),
            },
        });
    if (!activity) {
        return NextResponse.json(
            {
                message: "ไม่พบกิจกรรม",
            },
            {
                status: 404,
            }
        );
    }
    return NextResponse.json(
        activity
    );
}

// =========================
// UPDATE
// =========================
export async function PUT(
    req: Request,
    { params }: Params
) {
    const session = await auth();
    if (
        !session?.user ||
        session.user.role !== Role.ADMIN
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
    const { id } = await params;
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
    const activity =
        await prisma.activity.update({
            where: {
                id: Number(id),
            },
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

// =========================
// DELETE
// =========================
export async function DELETE(
    req: Request,
    { params }: Params
) {
    const session = await auth();
    if (
        !session?.user ||
        session.user.role !== Role.ADMIN
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
    const { id } = await params;
    // ป้องกันลบถ้ามี ActivityLog อ้างอิง
    const logCount =
        await prisma.activityLog.count({
            where: {
                activityId:
                    Number(id),
            },
        });
    if (logCount > 0) {
        return NextResponse.json(
            {
                message:
                    "ไม่สามารถลบกิจกรรมนี้ได้ เนื่องจากมีประวัติการใช้งานแล้ว",
            },
            {
                status: 400,
            }
        );
    }
    await prisma.activity.delete({
        where: {
            id: Number(id),
        },
    });
    return NextResponse.json({
        success: true,
    });
}