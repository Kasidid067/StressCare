"use client";

import {
    HeartPulse,
    Brain,
} from "lucide-react";

interface Props {

    open: boolean;

    data: any;

    onClose: () => void;

}

export default function AssessmentDetailDialog({

    open,

    data,

    onClose,

}: Props) {

    if (!open || !data) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-2xl bg-white p-8">

                <div className="mb-8 flex items-center justify-between">

                    <h2 className="text-3xl font-bold text-green-700">

                        ผลการประเมิน ST-5

                    </h2>

                    <button

                        onClick={onClose}

                        className="rounded-lg border px-4 py-2"

                    >

                        ปิด

                    </button>

                </div>

                <div className="grid gap-5 md:grid-cols-2">

                    <div className="rounded-xl border p-5">

                        <p className="text-gray-500">

                            คะแนนรวม

                        </p>

                        <h3 className="mt-2 text-4xl font-bold">

                            {data.stressScore}

                        </h3>

                    </div>

                    <div className="rounded-xl border p-5">

                        <p className="text-gray-500">

                            ระดับความเครียด

                        </p>

                        <h3 className="mt-2 text-3xl font-bold">

                            {data.stressLevel}

                        </h3>

                    </div>

                    <div className="rounded-xl border p-5">

                        <div className="mb-3 flex items-center gap-2">

                            <HeartPulse />

                            ชีพจร

                        </div>

                        <h3 className="text-3xl font-bold">

                            {data.pulse?.bpm ?? "-"}

                        </h3>

                        <p>BPM</p>

                    </div>

                    <div className="rounded-xl border p-5">

                        <p className="mb-3">

                            ค่าออกซิเจน

                        </p>

                        <h3 className="text-3xl font-bold">

                            {data.pulse?.spo2 ?? "-"}

                        </h3>

                        <p>%</p>

                    </div>

                </div>

                <div className="mt-8 rounded-xl border p-6">

                    <h3 className="mb-3 flex items-center gap-2 text-xl font-bold">

                        <Brain />

                        AI Summary

                    </h3>

                    <p>

                        {data.aiSummary}

                    </p>

                </div>

                <div className="mt-6 rounded-xl border p-6">

                    <h3 className="mb-3 text-xl font-bold">

                        คำแนะนำ

                    </h3>

                    <p>

                        {data.recommendation}

                    </p>

                </div>

                <div className="mt-6 rounded-xl border p-6">

                    <h3 className="mb-5 text-xl font-bold">

                        คะแนนแต่ละข้อ

                    </h3>

                    <div className="grid gap-3">

                        {data.assessment.answers.map(
                            (item: any) => (

                                <div
                                    key={item.id}
                                    className="flex items-center justify-between rounded-lg bg-gray-100 p-4"
                                >

                                    <span>

                                        ข้อ {item.questionNo}

                                    </span>

                                    <span className="font-bold">

                                        {item.score}

                                    </span>

                                </div>

                            )
                        )}

                    </div>

                </div>

            </div>

        </div>

    );

}