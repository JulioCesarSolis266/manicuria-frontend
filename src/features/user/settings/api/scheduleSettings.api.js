import { fetchWithAuth } from "../../../../api/fetchWithAuth";

export const getScheduleSettings = () => {
  return fetchWithAuth("/schedule-settings");
};

export const updateScheduleSettings = (data) => {
  return fetchWithAuth("/schedule-settings", {
    method: "PUT",
    body: JSON.stringify(data),
  });
};
