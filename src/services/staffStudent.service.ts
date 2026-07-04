import api from "@/lib/axios";

export async function getStaffStudents() {

    const res =
        await api.get(
            "/staff/students"
        );

    return res.data;

}