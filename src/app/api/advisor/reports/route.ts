import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";

export async function GET() {

    const session = await auth();

    if (
        !session?.user ||
        session.user.role !== Role.ADVISOR
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

    const advisorId =
        Number(session.user.id);

    const students =
        await prisma.user.findMany({

            where: {

                advisorId,

                role: Role.STUDENT,

            },

            include: {

                major: true,

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

}