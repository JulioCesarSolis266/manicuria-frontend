import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../../../../../api/fetchWithAuth";
import { API_URL } from "../../../../../config/api";
import toast from "react-hot-toast";

// 🔹 helper para datetime-local
const formatDate = (date) => {
  if (!date) return "";

  const d = new Date(date);

  // Ajuste para timezone local (clave)
  const offset = d.getTimezoneOffset();
  const localDate = new Date(d.getTime() - offset * 60000);

  return localDate.toISOString().slice(0, 16);
};

export const useAppointmentCreate = (initialDate) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    serviceId: "",
    date: formatDate(initialDate), // 👈 prefill correcto
    clientId: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetchWithAuth(API_URL.APPOINTMENTS, {
        method: "POST",
        body: JSON.stringify({
          serviceId: form.serviceId,
          date: new Date(form.date).toISOString(), // 👈 se guarda en UTC correctamente
          clientId: form.clientId,
          description: form.description,
        }),
      });

      if (!res) return;

      let data = null;

      try {
        data = await res.json();
      } catch {
        throw new Error("Respuesta inválida del servidor");
      }

      if (!res.ok) {
        throw new Error(data.error || data.message || "Error al crear turno");
      }

      toast.success("Turno creado correctamente");

      // 🔹 opcional: volver al dashboard
      navigate("/dashboard-manicura");
    } catch (error) {
      toast.error(error.message || "Error de red al crear el turno");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    setForm,
    loading,
    handleSubmit,
  };
};
