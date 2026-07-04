import api from "@/lib/axios";

export async function getAdvisorStudents() {

    const res =
        await api.get(
            "/advisor/students"
        );

    return res.data;

}