import axios from "axios";

export async function getHistory() {

    const { data } =
        await axios.get("/api/student/history");

    return data;

}