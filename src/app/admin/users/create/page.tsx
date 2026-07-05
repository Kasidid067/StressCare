"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMajor } from "@/hooks/useMajor";
import { useAdvisor } from "../../../../hooks/useAdvisor";

export default function CreateUserPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const { majors } = useMajor();
  const { advisors } = useAdvisor();

  const [form, setForm] = useState({
    studentId: "",
    fullname: "",
    email: "",
    phone: "",
    password: "",
    role: "STUDENT",
    year: 1,
    majorId: 1,
    advisorId: "",
  });

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(
        "/api/admin/users/create",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            ...form,
            advisorId: form.advisorId
              ? Number(form.advisorId)
              : null,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("เพิ่มผู้ใช้สำเร็จ");

      router.push("/admin/users");

      router.refresh();
    } catch {
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl p-8">

      <h1 className="mb-8 text-3xl font-bold text-green-700">
        เพิ่มผู้ใช้งาน
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow" style={{ boxShadow: "var(--shadow)" }}
      >

        <input
          placeholder="รหัส"
          value={form.studentId}
          onChange={(e) =>
            setForm({
              ...form,
              studentId: e.target.value,
            })
          }
          className="w-full rounded-xl border p-3"
        />

        <input
          placeholder="ชื่อ"
          value={form.fullname}
          onChange={(e) =>
            setForm({
              ...form,
              fullname: e.target.value,
            })
          }
          className="w-full rounded-xl border p-3"
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
          className="w-full rounded-xl border p-3"
        />

        <input
          placeholder="เบอร์โทร"
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value,
            })
          }
          className="w-full rounded-xl border p-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
          className="w-full rounded-xl border p-3"
        />

        <select
          value={form.role}
          onChange={(e) =>
            setForm({
              ...form,
              role: e.target.value,
            })
          }
          className="w-full rounded-xl border p-3"
        >
          <option value="STUDENT">
            Student
          </option>

          <option value="ADVISOR">
            Advisor
          </option>

          <option value="STAFF">
            Staff
          </option>

          <option value="ADMIN">
            Admin
          </option>
        </select>

        <input
          type="number"
          min={1}
          max={4}
          value={form.year}
          onChange={(e) =>
            setForm({
              ...form,
              year: Number(e.target.value),
            })
          }
          className="w-full rounded-xl border p-3"
        />

        <select
          value={form.majorId}
          onChange={(e) =>
            setForm({
              ...form,
              majorId: Number(e.target.value),
            })
          }
          className="w-full rounded-xl border p-3"
        >

          {majors.map((major) => (
            <option
              key={major.id}
              value={major.id}
            >
              {major.name}
            </option>
          ))}

        </select>

        <label className="block">
          <span className="mb-2 block font-medium">
            อาจารย์ที่ปรึกษา
          </span>

          <select
            value={form.advisorId}
            onChange={(e) =>
              setForm({
                ...form,
                advisorId: e.target.value,
              })
            }
            className="w-full rounded-xl border p-3"
          >
            <option value="">
              -- ไม่มี --
            </option>

            {advisors.map((advisor) => (
              <option
                key={advisor.id}
                value={advisor.id}
              >
                {advisor.fullname}
              </option>
            ))}
          </select>
        </label>

        <button
          disabled={loading}
          className="w-full rounded-xl bg-green-600 py-3 text-white"
        >
          {loading
            ? "กำลังบันทึก..."
            : "เพิ่มผู้ใช้งาน"}
        </button>

      </form>

    </main>
  );
}