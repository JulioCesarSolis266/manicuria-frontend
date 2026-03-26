//fetch de usuarios al backend
import { API_URL } from "../../../config/api";
import { fetchWithAuth } from "../../../api/fetchWithAuth";

export const getUsers = async () => {
  const res = await fetchWithAuth(API_URL.USERS);
  if (!res) return null;

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  return data.users;
};

export const updateUser = async (id, form) => {
  const res = await fetchWithAuth(`${API_URL.USERS}/${id}`, {
    method: "PUT",
    body: JSON.stringify(form),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  return data;
};

export const deactivateUser = async (id) => {
  const res = await fetchWithAuth(`${API_URL.USERS}/${id}/deactivate`, {
    method: "PATCH",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
};

export const reactivateUser = async (id) => {
  const res = await fetchWithAuth(`${API_URL.USERS}/${id}/reactivate`, {
    method: "PATCH",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
};

export const deleteUser = async (id) => {
  const res = await fetchWithAuth(`${API_URL.USERS}/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
};
