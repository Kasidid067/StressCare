import axios from "axios";

export async function getStaffStudent(
    id: number
) {
    const { data } =
        await axios.get(
            `/api/staff/students/${id}`
        );

    return data;
}