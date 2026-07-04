"use client";

import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import ActivityForm, {
  ActivityFormData,
} from "@/components/activity/ActivityForm";
import ActivityTable from "@/components/activity/ActivityTable";
import DeleteActivityDialog from "@/components/activity/DeleteActivityDialog";
import {
  createActivity,
  deleteActivity,
  updateActivity,
} from "@/services/activity.service";
import { useActivities } from "@/hooks/useActivities";
import type { Activity } from "@/types/activity";

export default function AdminActivitiesPage() {
  const {
    activities,
    loading,
    refresh,
  } = useActivities();
  const [
    keyword,
    setKeyword,
  ] = useState("");
  const [
    open,
    setOpen,
  ] = useState(false);
  const [
    editing,
    setEditing,
  ] =
    useState<Activity | null>(null);
  const [
    deleting,
    setDeleting,
  ] =
    useState<Activity | null>(null);
  const filteredActivities =
    useMemo(() => {
      const key =
        keyword
          .trim()
          .toLowerCase();
      return activities.filter(
        (activity) => {
          return (
            activity.title
              .toLowerCase()
              .includes(key)
            ||
            activity.description
              .toLowerCase()
              .includes(key)
            ||
            activity.category
              .toString()
              .toLowerCase()
              .includes(key)
          );
        }
      );
    }, [
      activities,
      keyword,
    ]);
  async function handleSubmit(
    data: ActivityFormData
  ) {
    try {
      if (
        !data.title.trim()
      ) {
        alert(
          "กรุณากรอกชื่อกิจกรรม"
        );
        return;
      }
      if (
        !data.description.trim()
      ) {
        alert(
          "กรุณากรอกรายละเอียด"
        );
        return;
      }
      if (
        data.duration <= 0
      ) {
        alert(
          "ระยะเวลาต้องมากกว่า 0 นาที"
        );
        return;
      }
      if (editing) {
        await updateActivity(
          editing.id,
          data
        );
        alert(
          "แก้ไขกิจกรรมสำเร็จ"
        );
      } else {
        await createActivity(
          data
        );
        alert(
          "เพิ่มกิจกรรมสำเร็จ"
        );
      }
      await refresh();
      setEditing(null);
      setOpen(false);
    } catch (error) {
      console.error(error);
      alert(
        "เกิดข้อผิดพลาด"
      );
    }
  }

  async function confirmDelete() {
    if (!deleting)
      return;
    try {
      await deleteActivity(
        deleting.id
      );
      alert(
        "ลบกิจกรรมสำเร็จ"
      );
      setDeleting(null);
      setEditing(null);
      await refresh();
    } catch (error) {
      console.error(error);
      alert(
        "ไม่สามารถลบกิจกรรมได้"
      );
    }
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-5xl">
            ⏳
          </div>
          <p>
            กำลังโหลดข้อมูล...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-green-700">
            จัดการกิจกรรม
          </h1>
          <p className="mt-2 text-gray-500">
            เพิ่ม แก้ไข และลบกิจกรรมสำหรับนักศึกษา
          </p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white"
        >
          <Plus size={18} />
          เพิ่มกิจกรรม
        </button>
      </div>
      <div className="rounded-xl bg-white p-6 shadow">
        <div className="relative mb-6 max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-4 text-gray-400"
          />
          <input
            value={keyword}
            onChange={(e) =>
              setKeyword(
                e.target.value
              )
            }
            placeholder="ค้นหากิจกรรม..."
            className="w-full rounded-xl border py-3 pl-11 pr-4"
          />
        </div>
        <ActivityTable
          activities={filteredActivities}
          onEdit={(activity) => {
            setEditing(activity);
            setOpen(true);
          }}
          onDelete={(activity) => {
            setDeleting(activity);
          }}
        />
      </div>

      <ActivityForm
        open={open}
        initialData={editing}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        onSubmit={handleSubmit}
      />

      <DeleteActivityDialog
        open={!!deleting}
        activity={deleting}
        onClose={() => {
          setDeleting(null);
        }}
        onConfirm={confirmDelete}
      />
      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-bold">
          สรุปข้อมูล
        </h2>
        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-xl bg-green-50 p-5">
            <p className="text-gray-500">
              กิจกรรมทั้งหมด
            </p>
            <h3 className="mt-2 text-3xl font-bold text-green-700">
              {activities.length}
            </h3>
          </div>
          <div className="rounded-xl bg-green-50 p-5">
            <p className="text-gray-500">
              ผ่อนคลาย
            </p>
            <h3 className="mt-2 text-3xl font-bold text-green-700">
              {
                activities.filter(
                  a =>
                    a.category ===
                    "RELAX"
                ).length
              }
            </h3>
          </div>
          <div className="rounded-xl bg-yellow-50 p-5">
            <p className="text-gray-500">
              ออกกำลังกาย
            </p>
            <h3 className="mt-2 text-3xl font-bold text-yellow-600">
              {
                activities.filter(
                  a =>
                    a.category ===
                    "EXERCISE"
                ).length
              }
            </h3>
          </div>
          <div className="rounded-xl bg-red-50 p-5">
            <p className="text-gray-500">
              สมาธิ / อื่น ๆ
            </p>
            <h3 className="mt-2 text-3xl font-bold text-red-600">
              {
                activities.filter(
                  a =>
                    a.category ===
                    "MEDITATION" ||
                    a.category ===
                    "MUSIC" ||
                    a.category ===
                    "OTHER"
                ).length
              }
            </h3>
          </div>
        </div>
      </div>
    </main>
  );
}