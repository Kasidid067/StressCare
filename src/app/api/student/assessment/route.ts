import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Role, StressLevel } from "@prisma/client";

export async function POST(req: Request) {
    console.log("========== ST5 API START ==========");

    try {
        const session = await auth();

        console.log("Session:", session?.user);

        if (
            !session?.user ||
            session.user.role !== Role.STUDENT
        ) {
            console.log("Forbidden");

            return NextResponse.json(
                { message: "Forbidden" },
                { status: 403 }
            );
        }

        const body = await req.json();

        const answers: {
            questionNo: number;
            score: number;
        }[] = body.answers;

        console.log("Answers:", answers);

        if (!answers || answers.length !== 5) {
            return NextResponse.json(
                {
                    message:
                        "กรุณาตอบคำถามให้ครบทั้ง 5 ข้อ",
                },
                {
                    status: 400,
                }
            );
        }

        const totalScore = answers.reduce(
            (sum, item) => sum + item.score,
            0
        );

        let stressLevel: StressLevel;

        if (totalScore <= 4) {
            stressLevel = StressLevel.LOW;
        } else if (totalScore <= 7) {
            stressLevel = StressLevel.MEDIUM;
        } else {
            stressLevel = StressLevel.HIGH;
        }

        console.log("Score:", totalScore);
        console.log("Level:", stressLevel);

        let recommendation = "";

        switch (stressLevel) {
            case StressLevel.LOW:
                recommendation =
                    "ความเครียดอยู่ในระดับต่ำ ควรรักษาพฤติกรรมที่ดี พักผ่อนให้เพียงพอ และออกกำลังกายอย่างสม่ำเสมอ";
                break;

            case StressLevel.MEDIUM:
                recommendation =
                    "ความเครียดอยู่ในระดับปานกลาง ควรผ่อนคลายด้วยการฟังเพลง ฝึกหายใจ ออกกำลังกาย หรือทำกิจกรรมที่ชอบ";
                break;

            case StressLevel.HIGH:
                recommendation =
                    "ความเครียดอยู่ในระดับสูง ควรปรึกษาอาจารย์ที่ปรึกษา เจ้าหน้าที่ หรือผู้เชี่ยวชาญด้านสุขภาพจิต";
                break;
        }

        const assessment = await prisma.$transaction(
            async (tx) => {

                console.log("Creating ST5 Assessment...");

                const assessment =
                    await tx.sT5Assessment.create({
                        data: {
                            userId: Number(
                                session.user.id
                            ),
                            totalScore,
                            answers: {
                                create: answers.map(
                                    (item) => ({
                                        questionNo:
                                            item.questionNo,
                                        score:
                                            item.score,
                                    })
                                ),
                            },
                        },
                    });

                console.log(
                    "Assessment Created:",
                    assessment
                );

                const latestPulse =
                    await tx.pulseRecord.findFirst({
                        where: {
                            userId: Number(
                                session.user.id
                            ),
                        },
                        orderBy: {
                            recordedAt: "desc",
                        },
                    });

                console.log(
                    "Latest Pulse:",
                    latestPulse
                );

                let aiSummary = "";

                if (latestPulse) {

                    if (
                        stressLevel ===
                            StressLevel.HIGH &&
                        latestPulse.bpm > 100
                    ) {
                        aiSummary =
                            `คะแนน ST-5 อยู่ในระดับสูง และชีพจร ${latestPulse.bpm} BPM สูงกว่าปกติ`;
                    }
                    else if (
                        stressLevel ===
                        StressLevel.HIGH
                    ) {
                        aiSummary =
                            `คะแนน ST-5 อยู่ในระดับสูง ชีพจร ${latestPulse.bpm} BPM`;
                    }
                    else if (
                        stressLevel ===
                        StressLevel.MEDIUM
                    ) {
                        aiSummary =
                            `คะแนน ST-5 อยู่ในระดับปานกลาง ชีพจร ${latestPulse.bpm} BPM`;
                    }
                    else {
                        aiSummary =
                            `คะแนน ST-5 อยู่ในระดับต่ำ ชีพจร ${latestPulse.bpm} BPM`;
                    }

                } else {

                    aiSummary =
                        "ไม่พบข้อมูลชีพจรล่าสุด";

                }

                console.log({
                    pulseId: latestPulse?.id,
                    aiSummary,
                });

                const stressResult =
                    await tx.stressResult.create({
                        data: {
                            userId: Number(
                                session.user.id
                            ),
                            assessmentId:
                                assessment.id,
                            pulseId:
                                latestPulse?.id,
                            stressScore:
                                totalScore,
                            stressLevel,
                            recommendation,
                            aiSummary,
                        },
                    });

                console.log(
                    "StressResult Created:",
                    stressResult
                );

                return assessment;
            }
        );

        console.log(
            "========== SUCCESS =========="
        );

        return NextResponse.json({
            success: true,
            assessmentId:
                assessment.id,
            totalScore,
            stressLevel,
            recommendation,
        });

    } catch (error) {

        console.error(
            "Assessment Error:",
            error
        );

        return NextResponse.json(
            {
                message:
                    "เกิดข้อผิดพลาดภายในระบบ",
            },
            {
                status: 500,
            }
        );
    }
}