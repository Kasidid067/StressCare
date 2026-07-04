import Link from "next/link";

export default function Sidebar() {
    return (
        <aside className="h-screen w-64 bg-green-700 text-white">
            <div className="border-b border-green-600 p-6">
                <h2 className="text-2xl font-bold">
                    StressCare
                </h2>
            </div>

            <nav className="flex flex-col gap-2 p-4">

                <Link
                    href="/student/dashboard"
                    className="rounded-lg px-4 py-3 hover:bg-green-600"
                >
                    🏠 Dashboard
                </Link>

                <Link
                    href="/student/pulse"
                    className="rounded-lg px-4 py-3 hover:bg-green-600"
                >
                    ❤️ วัดชีพจร
                </Link>

                <Link
                    href="/student/assessment"
                    className="rounded-lg px-4 py-3 hover:bg-green-600"
                >
                    📝 แบบประเมิน ST-5
                </Link>

                <Link
                    href="/student/assessment-history"
                    className="rounded-lg px-4 py-3 hover:bg-green-600"
                >
                    📋 ประวัติการประเมิน
                </Link>

                <Link
                    href="/student/activity"
                    className="rounded-lg px-4 py-3 hover:bg-green-600"
                >
                    🎯 กิจกรรมแนะนำ
                </Link>

                <Link
                    href="/student/history"
                    className="rounded-lg px-4 py-3 hover:bg-green-600"
                >
                    📖 ประวัติการทำกิจกรรม
                </Link>

                <Link
                    href="/student/profile"
                    className="rounded-lg px-4 py-3 hover:bg-green-600"
                >
                    👤 โปรไฟล์
                </Link>

            </nav>
        </aside>
    );
}