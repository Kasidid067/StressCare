import axios from "axios";
import type { ActivityLog } from "@/types/activityLog";

const API = "/api/student/activity-log";

export async function completeActivity(
    activityId: number
) {
    const { data } =
        await axios.post<ActivityLog>(
            API,
            {
                activityId,
            }
        );
    return data;
}

export async function getActivityLogs() {
    const { data } =
        await axios.get<ActivityLog[]>(
            API
        );
    return data;
}