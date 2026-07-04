"use client";

import {
    Users,
    UserCheck,
    Heart,
    Activity,
    HeartPulse,
} from "lucide-react";

import {
    useStaffDashboard,
} from "@/hooks/useStaffDashboard";

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

export default function StaffDashboardPage() {
    const {
        data,
        loading,
    } = useStaffDashboard();

    if (loading) {
        return (
            <main className="flex h-[70vh] items-center justify-center">
                กำลังโหลด...
            </main>
        );
    }

    return (
        <main className="space-y-8 p-8">
            <div>
                <h1 className="text-4xl font-bold text-green-700">
                    Dashboard เจ้าหน้าที่
                </h1>
                <p className="mt-2 text-gray-500">
                    ภาพรวมของนักศึกษาทั้งมหาวิทยาลัย
                </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
                <Card
                    title="นักศึกษาทั้งหมด"
                    value={data.totalStudents}
                    icon={<Users className="text-white" />}
                    color="bg-blue-500"
                />
                <Card
                    title="อาจารย์ที่ปรึกษา"
                    value={data.totalAdvisors}
                    icon={<UserCheck className="text-white" />}
                    color="bg-purple-500"
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
                    icon={<HeartPulse className="text-white" />}
                    color="bg-red-500"
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