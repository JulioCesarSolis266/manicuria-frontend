import { useEffect, useState } from "react";
import { fetchWithAuth } from "../../../../api/fetchWithAuth";
import { API_URL } from "../../../../config/api";
import toast from "react-hot-toast";

export const useAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetchWithAuth(API_URL.APPOINTMENTS);
        if (!res) return;

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || "Error al cargar turnos");
          return;
        }

        setAppointments(data.appointments || []);
      } catch {
        toast.error("Error al obtener turnos");
      } finally {
        setLoadingAppointments(false);
      }
    };

    fetchAppointments();
  }, []);

  return { appointments, setAppointments, loadingAppointments };
};
