import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
        return NextResponse.json(
            { message: "Forbidden" },
            { status: 403 }
        );
    }

    const { id } = await params;

    const user = await prisma.user.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            major: true,
            advisor: true,
        },
    });

    return NextResponse.json(user);
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
        return NextResponse.json(
            { message: "Forbidden" },
            { status: 403 }
        );
    }

    const { id } = await params;
    const body = await req.json();

    const updateData: Prisma.UserUncheckedUpdateInput = {
        fullname: body.fullname,
        email: body.email,
        phone: body.phone,
        role: body.role,
        year: body.year,
        majorId: body.majorId,
        advisorId: body.advisorId || null,
        status: body.status,
    };

    if (body.password) {
        updateData.password = await bcrypt.hash(
            body.password,
            10
        );
    }

    const user = await prisma.user.update({
        where: {
            id: Number(id),
        },
        data: updateData,
    });

    return NextResponse.json(user);
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
        return NextResponse.json(
            { message: "Forbidden" },
            { status: 403 }
        );
    }

    const { id } = await params;
    const userId = Number(id);
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!user) {
        return NextResponse.json(
            { message: "ไม่พบผู้ใช้งาน" },
            { status: 404 }
        );
    }

    await prisma.user.delete({
        where: {
            id: userId,
        },
    });

    return NextResponse.json({
        success: true,
        message: "ลบผู้ใช้งานสำเร็จ",
    });
}