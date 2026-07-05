import Link from "next/link";

export default function QuickAction() {

    return (

        <div className="theme-card rounded-xl p-6">

            <h2 className="mb-4 text-xl font-bold">

                เมนูลัด

            </h2>

            <div className="space-y-3">

                <Link
                    href="/student/assessment"
                    className="block rounded-lg bg-green-600 p-3 text-center text-white"
                >
                    เริ่มประเมิน
                </Link>

                <Link
                    href="/student/history"
                    className="block rounded-lg bg-blue-600 p-3 text-center text-white"
                >
                    ประวัติ
                </Link>

            </div>

        </div>

    );

}