import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();

    if (
        !session?.user ||
        session.user.role !== "STAFF"
    ) {
        return NextResponse.json(
            { message: "Forbidden" },
            { status: 403 }
        );
    }

    const { id } = await params;

    const student = await prisma.user.findUnique({

        where: {
            id: Number(id),
        },

        include: {

            major: true,

            advisor: {
                select: {
                    id: true,
                    fullname: true,
                },
            },

            pulses: {

                take: 1,

                orderBy: {
                    recordedAt: "desc",
                },

            },

            results: {

                orderBy: {
                    createdAt: "desc",
                },

            },

            assessments: {

                orderBy: {
                    createdAt: "desc",
                },

            },

        },

    });

    if (!student) {

        return NextResponse.json(
            { message: "ไม่พบนักศึกษา" },
            { status: 404 }
        );

    }

    return NextResponse.json(student);

}