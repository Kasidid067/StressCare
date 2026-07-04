import api from "@/lib/axios";

export async function getAdvisorReports() {

    const res =
        await api.get(
            "/advisor/reports"
        );

    return res.data;

}