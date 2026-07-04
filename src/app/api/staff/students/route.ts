import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";

export async function GET() {
    try {
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
                    major: true,
                    advisor: {
                        select: {
                            id: true,
                            fullname: true,
                        },
                    },
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
                orderBy: {
                    fullname: "asc",
                },
            });
        return NextResponse.json(students);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                message: "Internal Server Error",
            },
            {
                status: 500,
            }
        );
    }
}