"use client";

import WelcomeCard from "@/components/student/WelcomeCard";
import LatestStressCard from "@/components/student/LatestStressCard";
import StressHistoryChart from "@/components/student/StressHistoryChart";
import RecommendedActivities from "@/components/student/RecommendedActivities";
import QuickAction from "@/components/student/QuickAction";

import { useStudentDashboard } from "@/hooks/useStudentDashboard";

export default function StudentDashboardPage() {

    const {
        dashboard,
        loading,
    } = useStudentDashboard();

    if (loading) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />
                    <p className="text-lg">
                        กำลังโหลดข้อมูล...
                    </p>
                </div>
            </div>
        );
    }

    if (!dashboard) {
        return (
            <div className="p-10">
                ไม่พบข้อมูล
            </div>
        );
    }

    return (
        <main className="space-y-8 p-8">
            <WelcomeCard
                fullname={dashboard.fullname}
            />

            <div className="grid gap-6 lg:grid-cols-3">
                <LatestStressCard
                    latest={dashboard.latestResult}
                />
                <QuickAction />

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow" style={{ boxShadow: "var(--shadow)" }}>
                    <h2 className="mb-4 text-xl font-bold">
                        สรุป
                    </h2>

                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span>
                                จำนวนครั้งที่ประเมิน
                            </span>

                            <span className="font-bold">
                                {dashboard.history.length}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>
                                กิจกรรมแนะนำ
                            </span>

                            <span className="font-bold">
                                {dashboard.activities.length}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <StressHistoryChart
                history={dashboard.history}
            />
            <RecommendedActivities
                activities={dashboard.activities}
            />
        </main>
    );
}