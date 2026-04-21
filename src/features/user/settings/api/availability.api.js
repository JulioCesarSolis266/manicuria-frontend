import { fetchWithAuth } from "../../../../api/fetchWithAuth";
import { API_URL } from "../../../../config/api";

export const getAvailability = () => {
  return fetchWithAuth(`${API_URL}/availability`);
};

export const updateAvailability = (data) => {
  return fetchWithAuth(`${API_URL}/availability`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};
