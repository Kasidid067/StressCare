"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, HeartPulse, Lock, User } from "lucide-react";


export default function LoginPage() {
    const router = useRouter();

    const [studentId, setStudentId] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        if (!studentId || !password) {
            toast.error("กรุณากรอกข้อมูลให้ครบ");
            return;
        }

        setLoading(true);

        const result = await signIn("credentials", {
            studentId,
            password,
            redirect: false,
        });

        setLoading(false);

        if (result?.error) {
            toast.error("รหัสนิสิตหรือรหัสผ่านไม่ถูกต้อง");
            return;
        }

        toast.success("เข้าสู่ระบบสำเร็จ");

        const res = await fetch("/api/auth/session");
        const session = await res.json();

        if (!session?.user) {
            toast.error("ไม่พบข้อมูลผู้ใช้");
            return;
        }

        switch (session.user.role) {
            case "ADMIN":
                router.replace("/admin/dashboard");
                break;

            case "STAFF":
                router.replace("/staff/dashboard");
                break;

            case "ADVISOR":
                router.replace("/advisor/dashboard");
                break;

            default:
                router.replace("/student/dashboard");
        }



        router.refresh();
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.12),_transparent_35%),linear-gradient(135deg,_rgba(255,255,255,0.45),_rgba(248,250,252,0.9))] px-4 py-10 dark:bg-[radial-gradient(circle_at_top_left,_rgba(45,212,191,0.14),_transparent_35%),linear-gradient(135deg,_rgba(15,23,42,0.8),_rgba(15,23,42,1))]">
            <div className="w-full max-w-md rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8" style={{ boxShadow: "var(--shadow)" }}>

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-blue-500 shadow-lg">
                    <HeartPulse className="h-8 w-8 text-white" />
                </div>

                <h1 className="mt-4 text-center text-3xl font-bold text-[var(--accent-strong)]">
                    StressCare
                </h1>

                <p className="mt-2 text-center text-[var(--content-muted)]">
                    เข้าสู่ระบบ
                </p>

                <form onSubmit={handleLogin} className="mt-8 space-y-4">

                    <div className="relative">
                        <User className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--content-muted)]" />

                        <input
                            type="text"
                            placeholder="รหัสนิสิต"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-3 pl-11 text-[var(--content-text)] placeholder:text-[var(--content-muted)] focus:border-[var(--accent)] focus:outline-none"
                        />
                    </div>

                    <div className="relative">
                        <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--content-muted)]" />

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="รหัสผ่าน"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-3 pl-11 pr-12 text-[var(--content-text)] placeholder:text-[var(--content-muted)] focus:border-[var(--accent)] focus:outline-none"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--content-muted)] hover:text-[var(--accent)]"
                        >
                            {showPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-[var(--accent)] py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                    </button>

                </form>

                <p className="mt-6 text-center text-sm text-[var(--content-muted)]">
                    ยังไม่มีบัญชี ?

                    <Link
                        href="/auth/register"
                        className="ml-2 font-semibold text-[var(--accent-strong)] hover:underline"
                    >
                        สมัครสมาชิก
                    </Link>
                </p>

            </div>
        </main>
    );
}