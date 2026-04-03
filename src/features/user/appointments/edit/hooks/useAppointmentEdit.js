import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../../auth/context/AuthContext";
import { API_URL } from "../../../../../config/api";
import toast from "react-hot-toast";

export const useAppointmentEdit = (id, navigate) => {
  const { token } = useContext(AuthContext);

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    serviceId: "",
    date: "",
    status: "",
    description: "",
    clientName: "",
    clientSurname: "",
  });

  const formatForInput = (isoString) => {
    const d = new Date(isoString);
    const offset = d.getTimezoneOffset() * 60000;
    return new Date(d.getTime() - offset).toISOString().slice(0, 16);
  };

  // ================= FETCH =================
  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await fetch(`${API_URL.APPOINTMENTS}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          toast.error("Error obteniendo turno");
          return;
        }

        const data = await res.json();

        setAppointment(data);

        setForm({
          serviceId: data.serviceId || "",
          date: data.date ? formatForInput(data.date) : "",
          status: data.status || "pending",
          description: data.description || "",
          clientName: data.client?.name || "",
          clientSurname: data.client?.surname || "",
        });
      } catch (error) {
        toast.error("Error de red al cargar el turno");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id, token]);

  // ================= UPDATE =================
  const handleUpdate = async () => {
    try {
      const body = {
        serviceId: form.serviceId,
        status: form.status,
        description: form.description,
      };

      const originalDateISO = new Date(appointment.date).toISOString();
      const editedDateISO = new Date(form.date).toISOString();

      if (originalDateISO !== editedDateISO) {
        body.date = editedDateISO;
      }

      const res = await fetch(`${API_URL.APPOINTMENTS}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Error al actualizar turno");
        return;
      }

      toast.success("Turno actualizado correctamente");
      navigate("/mis-turnos");
    } catch {
      toast.error("Error inesperado");
    }
  };

  return {
    form,
    setForm,
    loading,
    appointment,
    handleUpdate,
  };
};
