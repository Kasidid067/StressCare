"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ST5Question from "@/components/student/ST5Question";
import { ST5_QUESTIONS } from "@/data/st5Questions";

export default function AssessmentPage() {
    const router = useRouter();

    const [answers, setAnswers] = useState<(number | null)[]>(
        Array(5).fill(null)
    );

    function updateAnswer(
        index: number,
        score: number
    ) {
        const copy = [...answers];
        copy[index] = score;
        setAnswers(copy);
    }

    async function submit() {
        // ตรวจสอบว่าตอบครบหรือยัง
        if (answers.some((answer) => answer === null)) {
            alert("กรุณาตอบคำถามให้ครบทุกข้อ");
            return;
        }

        // แปลงข้อมูลให้อยู่ในรูปแบบที่ API ต้องการ
        const payload = answers.map((score, index) => ({
            questionNo: index + 1,
            score: score as number,
        }));

        try {
            const res = await fetch(
                "/api/student/assessment",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        answers: payload,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                alert(
                    data.message ||
                        "เกิดข้อผิดพลาด"
                );
                return;
            }

            // ไปหน้าผลลัพธ์
            router.push(
                `/student/result/${data.assessmentId}`
            );
        } catch (error) {
            console.error(error);
            alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
        }
    }

    return (
        <main className="mx-auto max-w-5xl space-y-6 p-8">
            <div>
                <h1 className="text-4xl font-bold">
                    แบบประเมิน ST-5
                </h1>

                <p className="mt-2 text-gray-500">
                    กรุณาเลือกคำตอบที่ตรงกับความรู้สึกของคุณในช่วง
                    2-4 สัปดาห์ที่ผ่านมา
                </p>
            </div>

            {ST5_QUESTIONS.map((item, index) => (
                <ST5Question
                    key={item.no}
                    no={item.no}
                    question={item.question}
                    value={answers[index]}
                    onChange={(score) =>
                        updateAnswer(index, score)
                    }
                />
            ))}

            <button
                onClick={submit}
                className="w-full rounded-xl bg-green-600 py-4 text-lg font-semibold text-white transition hover:bg-green-700"
            >
                ส่งแบบประเมิน
            </button>
        </main>
    );
}