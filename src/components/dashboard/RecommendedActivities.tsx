import DashboardSection from "./DashboardSection";

import type {
    RecommendedActivity,
} from "@/types/adminDashboard";

interface Props {
    activities?: RecommendedActivity[];
}

export default function RecommendedActivities({
    activities = [],
}: Props) {
    console.log("Activities :", activities);
    return (

        <DashboardSection
            title="⭐ กิจกรรมแนะนำ"
        >

            <div className="space-y-4">
                {activities.map(activity => (
                    <div
                        key={activity.id}
                        className="rounded-xl border p-4"
                    >

                        <h3 className="font-semibold">

                            {activity.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            {activity.description}
                        </p>

                        <div
                            className="mt-2 flex justify-between text-sm"
                        >

                            <span>
                                {activity.category}
                            </span>

                            <span>
                                {activity.duration} นาที
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </DashboardSection>
    );
}