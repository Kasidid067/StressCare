"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Major {
  id: number;
  name: string;
}

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [majors, setMajors] = useState<Major[]>([]);

  const [form, setForm] = useState({
    studentId: "",
    fullname: "",
    phone: "",
    email: "",
    year: 1,
    majorId: 0,
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    async function loadMajors() {
      try {
        const res = await fetch("/api/admin/majors");

        const data = await res.json();

        setMajors(data);
      } catch (err) {
        console.error(err);
        toast.error("ไม่สามารถโหลดข้อมูลสาขาได้");
      }
    }

    loadMajors();
  }, []);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (
      !form.studentId ||
      !form.fullname ||
      !form.phone ||
      !form.email ||
      !form.password ||
      !form.confirmPassword ||
      form.majorId === 0
    ) {
      toast.warning("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("รหัสผ่านไม่ตรงกัน");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/register", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          studentId: form.studentId,
          fullname: form.fullname,
          phone: form.phone,
          email: form.email,
          year: form.year,
          majorId: form.majorId,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("สมัครสมาชิกสำเร็จ 🎉");

      setForm({
        studentId: "",
        fullname: "",
        phone: "",
        email: "",
        year: 1,
        majorId: 0,
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
    } catch {
      toast.error("เกิดข้อผิดพลาดของ Server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl">

        <h1 className="text-center text-4xl font-bold text-green-700">
          StressCare
        </h1>

        <p className="mt-2 text-center text-gray-500">
          สมัครสมาชิก
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-4"
        >

          <input
            type="text"
            placeholder="รหัสนิสิต"
            value={form.studentId}
            onChange={(e) =>
              setForm({
                ...form,
                studentId: e.target.value,
              })
            }
            className="w-full rounded-xl border border-gray-300 p-3 focus:border-green-500 focus:outline-none"
          />

          <input
            type="text"
            placeholder="ชื่อ-นามสกุล"
            value={form.fullname}
            onChange={(e) =>
              setForm({
                ...form,
                fullname: e.target.value,
              })
            }
            className="w-full rounded-xl border border-gray-300 p-3 focus:border-green-500 focus:outline-none"
          />

          <input
            type="text"
            placeholder="เบอร์โทรศัพท์"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
            className="w-full rounded-xl border border-gray-300 p-3 focus:border-green-500 focus:outline-none"
          />

          <select
            value={form.majorId}
            onChange={(e) =>
              setForm({
                ...form,
                majorId: Number(e.target.value),
              })
            }
            className="w-full rounded-xl border border-gray-300 p-3 focus:border-green-500 focus:outline-none"
          >
            <option value={0}>
              เลือกสาขาวิชา
            </option>

            {majors.map((major) => (
              <option
                key={major.id}
                value={major.id}
              >
                {major.name}
              </option>
            ))}
          </select>

          <select
            value={form.year}
            onChange={(e) =>
              setForm({
                ...form,
                year: Number(e.target.value),
              })
            }
            className="w-full rounded-xl border border-gray-300 p-3 focus:border-green-500 focus:outline-none"
          >
            <option value={1}>ชั้นปีที่ 1</option>
            <option value={2}>ชั้นปีที่ 2</option>
            <option value={3}>ชั้นปีที่ 3</option>
            <option value={4}>ชั้นปีที่ 4</option>
          </select>
          <input
            type="email"
            placeholder="อีเมล"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="w-full rounded-xl border border-gray-300 p-3 focus:border-green-500 focus:outline-none"
          />

          <input
            type="password"
            placeholder="รหัสผ่าน"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            className="w-full rounded-xl border border-gray-300 p-3 focus:border-green-500 focus:outline-none"
          />

          <input
            type="password"
            placeholder="ยืนยันรหัสผ่าน"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({
                ...form,
                confirmPassword: e.target.value,
              })
            }
            className="w-full rounded-xl border border-gray-300 p-3 focus:border-green-500 focus:outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-green-600 py-3 text-lg font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {loading ? "กำลังสมัครสมาชิก..." : "สมัครสมาชิก"}
          </button>

        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          มีบัญชีผู้ใช้งานแล้ว ?

          <Link
            href="/auth/login"
            className="ml-2 font-semibold text-green-700 hover:underline"
          >
            เข้าสู่ระบบ
          </Link>
        </div>

      </div>
    </main>
  );
}