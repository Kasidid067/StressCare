import axios from "axios";
import type { Activity } from "@/types/activity";

const API = "/api/admin/activities";

export interface ActivityRequest {
    title: string;
    description: string;
    duration: number;
    category: string;
    stressLevel: string;
    image?: string;
}

export async function getActivities() {
    const { data } =
        await axios.get<Activity[]>(API);
    return data;
}

export async function getActivity(
    id: number
) {
    const { data } =
        await axios.get<Activity>(
            `${API}/${id}`
        );
    return data;
}

export async function createActivity(
    body: ActivityRequest
) {
    const { data } =
        await axios.post(
            API,
            body
        );
    return data;
}

export async function updateActivity(
    id: number,
    body: ActivityRequest
) {
    const { data } =
        await axios.put(
            `${API}/${id}`,
            body
        );
    return data;
}

export async function deleteActivity(
    id: number
) {
    const { data } =
        await axios.delete(
            `${API}/${id}`
        );
    return data;
}