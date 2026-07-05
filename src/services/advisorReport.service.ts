import api from "@/lib/axios";

function normalizeReports(payload: unknown) {
    if (Array.isArray(payload)) {
        return payload;
    }

    if (payload && typeof payload === "object") {
        const data = payload as Record<string, unknown>;

        if (Array.isArray(data.data)) {
            return data.data;
        }

        if (Array.isArray(data.reports)) {
            return data.reports;
        }

        if (Array.isArray(data.students)) {
            return data.students;
        }
    }

    return [];
}

export async function getAdvisorReports() {
    const res = await api.get("/advisor/reports");
    return normalizeReports(res.data);
}