import axios from "axios";

export async function getUser(id: number) {
  const { data } = await axios.get(`/api/admin/users/${id}`);
  return data;
}

export async function updateUser(id: number, body: unknown) {
  const { data } = await axios.put(`/api/admin/users/${id}`, body);
  return data;
}

export async function deleteUser(id: number) {
  const { data } = await axios.delete(
    `/api/admin/users/${id}`
  );

  return data;
}