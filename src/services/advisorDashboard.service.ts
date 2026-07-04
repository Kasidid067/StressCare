import api from "@/lib/axios";

export async function getAdvisorDashboard() {

    const res =
        await api.get(
            "/advisor/dashboard"
        );

    return res.data;

}