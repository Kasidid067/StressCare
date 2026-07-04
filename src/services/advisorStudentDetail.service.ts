import api from "@/lib/axios";

export async function getAdvisorStudentDetail(
    id: number
) {
    const res =
        await api.get(
            `/advisor/students/${id}`
        );

    return res.data;
}