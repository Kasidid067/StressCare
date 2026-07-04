import axios from "axios";

import type { AdminDashboard } from "@/types/adminDashboard";

export async function getAdminDashboard() {

    const { data } =
        await axios.get<AdminDashboard>(
            "/api/admin/dashboard"
        );

    return data;

}