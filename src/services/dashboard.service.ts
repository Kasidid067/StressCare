import axios from "axios";

export async function getDashboard() {
  const { data } = await axios.get("/api/dashboard");
  return data;
}