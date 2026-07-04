import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Role, StressLevel } from "@prisma/client";

export async function GET() {
    try {
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

        const advisorId = Number(session.user.id);

        const students =
            await prisma.user.findMany({
                where: {
                    advisorId,
                    role: Role.STUDENT,
                },
                include: {
                    results: {
                        orderBy: {
                            createdAt: "desc",
                        },
                        take: 1,
                        include: {
                            pulse: true,
                        },
                    },
                },
            });

        let low = 0;
        let medium = 0;
        let high = 0;

        let totalScore = 0;
        let totalBpm = 0;

        let scoreCount = 0;
        let bpmCount = 0;

        students.forEach((student) => {

            const result =
                student.results[0];

            if (!result) return;

            scoreCount++;
            totalScore +=
                result.stressScore;

            if (result.pulse) {

                bpmCount++;

                totalBpm +=
                    result.pulse.bpm;

            }

            switch (result.stressLevel) {

                case StressLevel.LOW:
                    low++;
                    break;

                case StressLevel.MEDIUM:
                    medium++;
                    break;

                case StressLevel.HIGH:
                    high++;
                    break;

            }

        });

        return NextResponse.json({

            totalStudents:
                students.length,

            low,

            medium,

            high,

            averageScore:

                scoreCount === 0
                    ? 0
                    : Number(
                        (
                            totalScore /
                            scoreCount
                        ).toFixed(2)
                    ),

            averageBpm:

                bpmCount === 0
                    ? 0
                    : Number(
                        (
                            totalBpm /
                            bpmCount
                        ).toFixed(2)
                    ),

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