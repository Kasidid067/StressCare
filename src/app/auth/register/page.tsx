"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  HeartPulse,
  IdCard,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react";

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
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.12),_transparent_35%),linear-gradient(135deg,_rgba(255,255,255,0.45),_rgba(248,250,252,0.9))] px-4 py-10 dark:bg-[radial-gradient(circle_at_top_left,_rgba(45,212,191,0.14),_transparent_35%),linear-gradient(135deg,_rgba(15,23,42,0.8),_rgba(15,23,42,1))]">
      <div className="w-full max-w-xl rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8" style={{ boxShadow: "var(--shadow)" }}>

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-blue-500 shadow-lg">
          <HeartPulse className="h-8 w-8 text-white" />
        </div>

        <h1 className="mt-4 text-center text-3xl font-bold text-[var(--accent-strong)]">
          StressCare
        </h1>

        <p className="mt-2 text-center text-[var(--content-muted)]">
          สมัครสมาชิก
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-4"
        >

          <div className="relative">
            <IdCard className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--content-muted)]" />
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
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-3 pl-11 text-[var(--content-text)] focus:border-[var(--accent)] focus:outline-none"
            />
          </div>

          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--content-muted)]" />
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
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-3 pl-11 text-[var(--content-text)] focus:border-[var(--accent)] focus:outline-none"
            />
          </div>

          <div className="relative">
            <Phone className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--content-muted)]" />
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
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-3 pl-11 text-[var(--content-text)] focus:border-[var(--accent)] focus:outline-none"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative">
              <GraduationCap className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--content-muted)]" />
              <select
                value={form.majorId}
                onChange={(e) =>
                  setForm({
                    ...form,
                    majorId: Number(e.target.value),
                  })
                }
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-3 pl-11 text-[var(--content-text)] focus:border-[var(--accent)] focus:outline-none"
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
            </div>

            <select
              value={form.year}
              onChange={(e) =>
                setForm({
                  ...form,
                  year: Number(e.target.value),
                })
              }
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-3 text-[var(--content-text)] focus:border-[var(--accent)] focus:outline-none"
            >
              <option value={1}>ชั้นปีที่ 1</option>
              <option value={2}>ชั้นปีที่ 2</option>
              <option value={3}>ชั้นปีที่ 3</option>
              <option value={4}>ชั้นปีที่ 4</option>
            </select>
          </div>

          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--content-muted)]" />
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
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-3 pl-11 text-[var(--content-text)] focus:border-[var(--accent)] focus:outline-none"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--content-muted)]" />
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
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-3 pl-11 text-[var(--content-text)] focus:border-[var(--accent)] focus:outline-none"
              />
            </div>

            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--content-muted)]" />
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
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-3 pl-11 text-[var(--content-text)] focus:border-[var(--accent)] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[var(--accent)] py-3 text-lg font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "กำลังสมัครสมาชิก..." : "สมัครสมาชิก"}
          </button>

        </form>

        <div className="mt-6 text-center text-sm text-[var(--content-muted)]">
          มีบัญชีผู้ใช้งานแล้ว ?

          <Link
            href="/auth/login"
            className="ml-2 font-semibold text-[var(--accent-strong)] hover:underline"
          >
            เข้าสู่ระบบ
          </Link>
        </div>

      </div>
    </main>
  );
}