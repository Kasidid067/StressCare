"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";


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
        <main className="min-h-screen bg-green-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

                <h1 className="text-center text-4xl font-bold text-green-700">
                    StressCare
                </h1>

                <p className="mt-2 text-center text-gray-500">
                    เข้าสู่ระบบ
                </p>

                <form onSubmit={handleLogin} className="mt-8 space-y-4">

                    <input
                        type="text"
                        placeholder="รหัสนิสิต"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 p-3 focus:border-green-500 focus:outline-none"
                    />

                    <div className="relative">

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="รหัสผ่าน"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-xl border border-gray-300 bg-white p-3 pr-12 text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:outline-none"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600"
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
                        className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
                    >
                        {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                    </button>

                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    ยังไม่มีบัญชี ?

                    <Link
                        href="/auth/register"
                        className="ml-2 font-semibold text-green-700 hover:underline"
                    >
                        สมัครสมาชิก
                    </Link>
                </p>

            </div>
        </main>
    );
}