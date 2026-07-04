import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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

    const major = await prisma.major.update({
        where: {
            id: Number(id),
        },
        data: {
            name: body.name,
        },
    });

    return NextResponse.json(major);
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

    await prisma.major.delete({
        where: {
            id: Number(id),
        },
    });

    return NextResponse.json({
        success: true,
    });
}