"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ST5_QUESTIONS } from "@/data/st5";
import { ST5_CHOICES } from "@/data/st5Choice";


export default function ST5Page() {
    const router = useRouter();

    const [answers, setAnswers] = useState<number[]>(
        Array(ST5_QUESTIONS.length).fill(-1)
    );

    function handleSelect(
        questionIndex: number,
        score: number
    ) {
        const copy = [...answers];

        copy[questionIndex] = score;

        setAnswers(copy);
    }

    async function handleSubmit() {
        if (answers.includes(-1)) {
            alert("กรุณาตอบทุกข้อ");

            return;
        }

        const res = await fetch("/api/student/st5", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                answers,
            }),
        });

        toast.success("บันทึกผลการประเมินเรียบร้อย");

        setTimeout(() => {
            router.push("/student/dashboard");
        }, 1200);
    }

    return (
        <main className="mx-auto max-w-4xl space-y-6 p-8">

            <h1 className="text-3xl font-bold text-green-700">
                แบบประเมินความเครียด ST-5
            </h1>

            {ST5_QUESTIONS.map((item, index) => (

                <div
                    key={item.id}
                    className="rounded-xl bg-white p-6 shadow"
                >

                    <h2 className="mb-5 text-lg font-semibold">

                        {item.id}. {item.question}

                    </h2>

                    <div className="grid gap-3 md:grid-cols-4">

                        {ST5_CHOICES.map((choice) => (

                            <button
                                key={choice.score}
                                onClick={() =>
                                    handleSelect(
                                        index,
                                        choice.score
                                    )
                                }
                                className={`rounded-xl border p-3 transition

                ${answers[index] ===
                                        choice.score
                                        ? "border-green-600 bg-green-600 text-white"
                                        : "border-gray-300"
                                    }
                `}
                            >

                                {choice.text}

                            </button>

                        ))}

                    </div>

                </div>

            ))}

            <button
                onClick={handleSubmit}
                className="w-full rounded-xl bg-green-600 py-4 text-white"
            >
                ส่งแบบประเมิน
            </button>

        </main>
    );
}