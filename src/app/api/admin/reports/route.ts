import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { StressLevel } from "@prisma/client";

export async function GET(req: NextRequest) {

    const session = await auth();

    if (
        !session?.user ||
        session.user.role !== "ADMIN"
    ) {

        return NextResponse.json(
            { message: "Forbidden" },
            { status: 403 }
        );

    }

    const { searchParams } = new URL(req.url);

    const majorId = searchParams.get("majorId");
    const stressLevel = searchParams.get("stressLevel");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const search = searchParams.get("search");

    const results = await prisma.stressResult.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            user: {
                include: {
                    major: true,
                },

            },

            assessment: true,

        },

        where: {
            ...(search
                ? {
                    user: {
                        AND: [
                            majorId
                                ? {
                                    majorId:
                                        Number(
                                            majorId
                                        ),
                                }
                                : {},
                            {
                                OR: [
                                    {
                                        fullname: {
                                            contains:
                                                search,
                                        },
                                    },
                                    {
                                        studentId: {
                                            contains:
                                                search,
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                }
                : majorId
                    ? {
                        user: {
                            majorId:
                                Number(
                                    majorId
                                ),
                        },
                    }
                    : {}),
            ...(stressLevel
                ? {
                    stressLevel: stressLevel as StressLevel,
                }
                : {}),

            ...(majorId
                ? {
                    user: {
                        majorId: Number(majorId),
                    },
                }
                : {}),

            ...(startDate && endDate
                ? {
                    createdAt: {

                        gte: new Date(startDate),

                        lte: new Date(endDate),

                    },
                }
                : {}),

        },

    });
    return NextResponse.json(results);

}