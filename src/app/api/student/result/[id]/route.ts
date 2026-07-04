import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";

interface Context {
    params: Promise<{
        id: string;
    }>;
}

export async function GET(
    req: Request,
    { params }: Context
) {
    try {

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

        const { id } = await params;

        const result =
            await prisma.stressResult.findFirst({

                where: {

                    assessmentId: Number(id),

                    userId: Number(session.user.id),

                },

                include: {

                    assessment: true,

                    user: {

                        include: {

                            major: true,

                        },

                    },

                },

            });

        if (!result) {

            return NextResponse.json(
                {
                    message: "ไม่พบผลการประเมิน",
                },
                {
                    status: 404,
                }
            );

        }

        const activities =
            await prisma.activity.findMany({

                where: {

                    stressLevel:
                        result.stressLevel,

                },

                orderBy: {

                    title: "asc",

                },

            });

        return NextResponse.json({

            result,

            activities,

        });

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                message:
                    "Internal Server Error",
            },
            {
                status: 500,
            }
        );

    }
}