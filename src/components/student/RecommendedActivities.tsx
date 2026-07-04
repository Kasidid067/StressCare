import Image from "next/image";

interface Activity {
    id: number;
    title: string;
    description: string;
    image?: string | null;
    duration: number;
    category: string;
}

interface Props {
    activities: Activity[];
}

const categoryEmoji: Record<string, string> = {
    RELAX: "🛌",
    EXERCISE: "🏃",
    MEDITATION: "🧘",
    MUSIC: "🎵",
    OTHER: "⭐",
};

export default function RecommendedActivities({
    activities,
}: Props) {
    return (
        <div className="rounded-2xl bg-white p-6 shadow">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">
                        🎯 กิจกรรมที่แนะนำ
                    </h2>
                    <p className="text-sm text-gray-500">
                        ระบบแนะนำกิจกรรมตามระดับความเครียดของคุณ
                    </p>
                </div>
            </div>
            {activities.length === 0 ? (
                <div className="flex h-52 items-center justify-center rounded-xl border border-dashed">
                    <div className="text-center">
                        <div className="text-6xl">
                            📭
                        </div>
                        <p className="mt-3 text-gray-500">
                            ยังไม่มีกิจกรรมแนะนำ
                        </p>
                    </div>
                </div>
            ) : (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {activities.map((activity) => (
                        <div
                            key={activity.id}
                            className="overflow-hidden rounded-2xl border bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            {activity.image ? (
                                <div className="relative h-44 w-full">
                                    <Image
                                        src={activity.image}
                                        alt={activity.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="flex h-44 items-center justify-center bg-green-50 text-6xl">
                                    {categoryEmoji[
                                        activity.category
                                    ] ?? "🎯"}

                                </div>
                            )}
                            <div className="p-5">
                                <h3 className="text-xl font-bold">
                                    {activity.title}
                                </h3>
                                <p className="mt-3 line-clamp-3 text-sm text-gray-600">
                                    {activity.description}
                                </p>
                                <div className="mt-5 flex items-center justify-between">
                                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                                        ⏱ {activity.duration} นาที
                                    </span>
                                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                                        {activity.category}
                                    </span>
                                </div>
                                <button
                                    className="mt-6 w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
                                >
                                    เริ่มกิจกรรม
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}