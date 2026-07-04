import api from "@/lib/axios";

export async function getStaffDashboard() {

    const res =
        await api.get(
            "/staff/dashboard"
        );

    return res.data;

}