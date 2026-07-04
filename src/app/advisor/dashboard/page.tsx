"use client";

import {
    Users,
    Heart,
    Activity,
    BarChart3,
    HeartPulse,
} from "lucide-react";

import {
    useAdvisorDashboard,
} from "@/hooks/useAdvisorDashboard";

function Card({
    title,
    value,
    icon,
    color,
}: {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    color: string;
}) {
    return (
        <div className="rounded-2xl bg-white p-6 shadow">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-gray-500">
                        {title}
                    </p>

                    <h2 className="mt-3 text-4xl font-bold">
                        {value}
                    </h2>

                </div>

                <div
                    className={`rounded-full p-4 ${color}`}
                >
                    {icon}
                </div>

            </div>

        </div>
    );
}

export default function AdvisorDashboard() {

    const {

        data,

        loading,

    } = useAdvisorDashboard();

    if (loading) {

        return (

            <main className="flex h-[70vh] items-center justify-center">

                <p className="text-lg">

                    กำลังโหลด...

                </p>

            </main>

        );

    }

    return (

        <main className="space-y-8 p-8">

            <div>

                <h1 className="text-4xl font-bold text-green-700">

                    Dashboard อาจารย์ที่ปรึกษา

                </h1>

                <p className="mt-2 text-gray-500">

                    ภาพรวมของนักศึกษาในความดูแล

                </p>

            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                <Card
                    title="นักศึกษาในความดูแล"
                    value={data.totalStudents}
                    icon={<Users className="text-white" />}
                    color="bg-blue-500"
                />

                <Card
                    title="ความเครียดต่ำ"
                    value={data.low}
                    icon={<Heart className="text-white" />}
                    color="bg-green-500"
                />

                <Card
                    title="ความเครียดปานกลาง"
                    value={data.medium}
                    icon={<Activity className="text-white" />}
                    color="bg-yellow-500"
                />

                <Card
                    title="ความเครียดสูง"
                    value={data.high}
                    icon={<BarChart3 className="text-white" />}
                    color="bg-red-500"
                />

                <Card
                    title="คะแนน ST-5 เฉลี่ย"
                    value={data.averageScore}
                    icon={<Activity className="text-white" />}
                    color="bg-purple-500"
                />

                <Card
                    title="BPM เฉลี่ย"
                    value={data.averageBpm}
                    icon={<HeartPulse className="text-white" />}
                    color="bg-pink-500"
                />

            </div>

            <div className="rounded-2xl bg-white p-8 shadow">

                <h2 className="mb-6 text-2xl font-bold">

                    สรุปภาพรวม

                </h2>

                <div className="grid gap-6 md:grid-cols-3">

                    <div className="rounded-xl bg-green-50 p-6">

                        <h3 className="font-semibold">

                            ความเครียดต่ำ

                        </h3>

                        <p className="mt-3 text-5xl font-bold text-green-700">

                            {data.low}

                        </p>

                    </div>

                    <div className="rounded-xl bg-yellow-50 p-6">

                        <h3 className="font-semibold">

                            ความเครียดปานกลาง

                        </h3>

                        <p className="mt-3 text-5xl font-bold text-yellow-600">

                            {data.medium}

                        </p>

                    </div>

                    <div className="rounded-xl bg-red-50 p-6">

                        <h3 className="font-semibold">

                            ความเครียดสูง

                        </h3>

                        <p className="mt-3 text-5xl font-bold text-red-600">

                            {data.high}

                        </p>

                    </div>

                </div>

            </div>

        </main>

    );

}