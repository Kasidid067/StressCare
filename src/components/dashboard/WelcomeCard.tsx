"use client";

interface WelcomeCardProps {
  fullname: string;
}

export default function WelcomeCard({
  fullname,
}: WelcomeCardProps) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-teal-500 to-blue-500 p-8 text-white shadow-lg">

      <h2 className="text-3xl font-bold">
        👋 สวัสดี {fullname}
      </h2>

      <p className="mt-3 text-teal-50">
        ยินดีต้อนรับเข้าสู่ระบบประเมินความเครียด
      </p>

    </div>
  );
}