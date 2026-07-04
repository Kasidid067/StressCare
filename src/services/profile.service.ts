import axios from "axios";

export async function getProfile() {
    const { data } = await axios.get("/api/student/profile");
    return data;
}

export async function updateProfile(
    fullname: string,
    phone: string
) {
    const { data } = await axios.put(
        "/api/student/profile",
        {
            fullname,
            phone,
        }
    );

    return data;
}