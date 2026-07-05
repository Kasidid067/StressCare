"use client";

import { useState } from "react";
import { useStudentActivities } from "@/hooks/useStudentActivities";
import { completeActivity } from "@/services/activityLog.service";
import { useActivityLog } from "@/hooks/useActivityLog";

export default function ActivityPage() {

  const {
    activities,
    loading,
    refresh,
  } = useStudentActivities();

  const {
    logs,
    refresh: refreshLogs,
  } = useActivityLog();

  const completedIds =
    logs.map(
      (log) => log.activityId
    );

  const [
    savingId,
    setSavingId,
  ] = useState<number | null>(null);

  async function handleComplete(
    activityId: number
  ) {
    if (
      completedIds.includes(activityId)
    ) {
      return;
    }
    try {
      setSavingId(activityId);
      await completeActivity(
        activityId
      );
      await refreshLogs();
      await refresh();
      alert("บันทึกกิจกรรมสำเร็จ");
    } catch (error) {
      console.error(error);
      alert("ไม่สามารถบันทึกกิจกรรมได้");
    } finally {
      setSavingId(null);
    }
  }
  if (loading) {
    return (
      <main className="flex h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-3 text-5xl">
            ⏳
          </div>
          <p>
            กำลังโหลดกิจกรรม...
          </p>
        </div>
      </main>
    );
  }
  return (
    <main className="mx-auto max-w-6xl p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-700">
          กิจกรรมแนะนำ
        </h1>
        <p className="mt-2 text-[var(--content-muted)]">
          เลือกทำกิจกรรมเพื่อลดระดับความเครียด
        </p>
      </div>
      {activities.length === 0 && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-10 text-center shadow" style={{ boxShadow: "var(--shadow)" }}>
          <div className="text-6xl">
            📋
          </div>
          <h2 className="mt-4 text-2xl font-bold">
            ยังไม่มีกิจกรรม
          </h2>
          <p className="mt-2 text-[var(--content-muted)]">
            กรุณาติดต่อผู้ดูแลระบบ
          </p>
        </div>
      )}
      <div className="grid gap-6 md:grid-cols-2">
        {activities.map((activity) => {
          const completed =
            completedIds.includes(
              activity.id
            );
          return (
            <div
              key={activity.id}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow" style={{ boxShadow: "var(--shadow)" }}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">
                  {activity.title}
                </h2>
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                  {activity.stressLevel}
                </span>
              </div>
              <p className="mt-4 text-[var(--content-muted)]">
                {activity.description}
              </p>
              <div className="mt-4">
                <p>
                  <strong>ประเภท :</strong>{" "}
                  {activity.category}
                </p>
                <p>
                  <strong>ระยะเวลา :</strong>{" "}
                  {activity.duration} นาที
                </p>
              </div>

              <button
                disabled={
                  completed ||
                  savingId ===
                  activity.id
                }
                onClick={() =>
                  handleComplete(
                    activity.id
                  )
                }
                className={`mt-6 w-full rounded-xl py-3 font-semibold text-white transition
                                ${completed
                    ? "bg-gray-400"
                    : "bg-green-600 hover:bg-green-700"
                  }
                                `}
              >
                {savingId === activity.id
                  ? "กำลังบันทึก..."
                  : completed
                    ? "✅ ทำกิจกรรมแล้ว"
                    : "ทำกิจกรรมเสร็จแล้ว"
                }
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}