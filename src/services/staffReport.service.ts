import api from "@/lib/axios";

export async function getStaffReports() {

    const res =
        await api.get(
            "/staff/reports"
        );

    return res.data;

}