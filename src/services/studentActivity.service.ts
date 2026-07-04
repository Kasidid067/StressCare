import axios from "axios";
import type { Activity } from "@/types/activity";

const API =
    "/api/student/activities";

export async function getStudentActivities() {
    const { data } =
        await axios.get<Activity[]>(
            API
        );
    return data;
}