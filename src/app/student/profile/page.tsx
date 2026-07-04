"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getProfile, updateProfile } from "@/services/profile.service";
import type { ProfileData } from "@/types/profile";

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getProfile();

        setProfile(data);
        setFullname(data.fullname);
        setPhone(data.phone ?? "");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  async function handleSave() {
    try {
      await updateProfile(fullname, phone);

      toast.success("บันทึกข้อมูลเรียบร้อย");

      setProfile((prev) =>
        prev
          ? {
              ...prev,
              fullname,
              phone,
            }
          : prev
      );
    } catch {
      toast.error("ไม่สามารถบันทึกข้อมูลได้");
    }
  }

  if (loading || !profile) {
    return (
      <div className="flex items-center justify-center py-20">
        กำลังโหลด...
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-3xl p-8">

      <h1 className="mb-8 text-3xl font-bold text-green-700">
        ข้อมูลส่วนตัว
      </h1>

      <div className="rounded-2xl bg-white p-8 shadow space-y-5">

        <div>
          <label className="font-semibold">
            รหัสนิสิต
          </label>

          <input
            value={profile.studentId}
            disabled
            className="mt-2 w-full rounded-xl border bg-gray-100 p-3"
          />
        </div>

        <div>
          <label className="font-semibold">
            ชื่อ-นามสกุล
          </label>

          <input
            value={fullname}
            onChange={(e) =>
              setFullname(e.target.value)
            }
            className="mt-2 w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="font-semibold">
            Email
          </label>

          <input
            value={profile.email}
            disabled
            className="mt-2 w-full rounded-xl border bg-gray-100 p-3"
          />
        </div>

        <div>
          <label className="font-semibold">
            เบอร์โทรศัพท์
          </label>

          <input
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            className="mt-2 w-full rounded-xl border p-3"
          />
        </div>

        <div className="grid grid-cols-2 gap-5">

          <div>
            <label className="font-semibold">
              สาขา
            </label>

            <input
              value={profile.major.name}
              disabled
              className="mt-2 w-full rounded-xl border bg-gray-100 p-3"
            />
          </div>

          <div>
            <label className="font-semibold">
              ชั้นปี
            </label>

            <input
              value={profile.year}
              disabled
              className="mt-2 w-full rounded-xl border bg-gray-100 p-3"
            />
          </div>

        </div>

        <button
          onClick={handleSave}
          className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
        >
          บันทึกข้อมูล
        </button>

      </div>

    </main>
  );
}