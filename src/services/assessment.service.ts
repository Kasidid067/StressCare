import axios from "axios";

export async function getAssessment(id: number) {
  const { data } = await axios.get(
    `/api/student/assessment/${id}`
  );

  return data;
}