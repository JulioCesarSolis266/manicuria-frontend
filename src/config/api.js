const BASE_URL = import.meta.env.VITE_API_URL;

export const API_URL = {
  AUTH: `${BASE_URL}/auth`,
  USERS: `${BASE_URL}/users`,
  APPOINTMENTS: `${BASE_URL}/appointments`,
  CLIENTS: `${BASE_URL}/clients`,
  SERVICES: `${BASE_URL}/services`,
};
