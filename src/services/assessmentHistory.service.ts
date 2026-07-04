import api from "@/lib/axios";

export async function getAssessmentHistory() {

    const res =
        await api.get(
            "/student/assessment-history"
        );

    return res.data;

}