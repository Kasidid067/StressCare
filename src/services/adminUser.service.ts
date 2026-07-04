import axios from "axios";

export async function getUsers() {
  const { data } = await axios.get("/api/admin/users");
  return data;
}