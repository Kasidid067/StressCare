import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";

export async function GET() {

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

    const user =
        await prisma.user.findUnique({
            where: {
                id: Number(session.user.id),
            },

            include: {
                results: {
                    orderBy: {
                        createdAt: "desc",
                    },
                    take: 1,
                },
            },
        });

    if (!user) {
        return NextResponse.json(
            {
                message: "ไม่พบผู้ใช้",
            },
            {
                status: 404,
            }
        );
    }

    const latestResult =
        user.results[0] ?? null;

    const history =
        await prisma.stressResult.findMany({
            where: {
                userId: user.id,
            },
            orderBy: {
                createdAt: "asc",
            },
            select: {
                stressScore: true,
                createdAt: true,
            },
        });

    const activities =
        latestResult
            ? await prisma.activity.findMany({
                where: {
                    stressLevel:
                        latestResult.stressLevel,
                },
            })
            : [];
    return NextResponse.json({
        fullname: user.fullname,

        latestResult: latestResult
            ? {
                stressScore: latestResult.stressScore,
                stressLevel: latestResult.stressLevel,
                createdAt: latestResult.createdAt,
            }
            : null,

        history: history.map((item) => ({
            score: item.stressScore,
            createdAt: item.createdAt,
        })),

        activities: activities.map((activity) => ({
            id: activity.id,
            title: activity.title,
            description: activity.description,
            duration: activity.duration,
            category: activity.category,
            image: activity.image,
        })),
    });
}