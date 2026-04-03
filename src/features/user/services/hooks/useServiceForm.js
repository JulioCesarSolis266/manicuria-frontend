import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_URL } from "../../../../config/api";
import { fetchWithAuth } from "../../../../api/fetchWithAuth";

export const useServiceForm = (token) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    durationMinutes: "",
    category: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "El nombre es obligatorio";
    if (!form.price || Number(form.price) <= 0)
      newErrors.price = "El precio debe ser mayor a 0";
    if (!form.durationMinutes || Number(form.durationMinutes) < 15)
      newErrors.durationMinutes = "Mínimo 15 minutos";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const cleanValue =
      name === "price" || name === "durationMinutes"
        ? value.replace(/\D/g, "")
        : value;

    setForm({ ...form, [name]: cleanValue });
    setErrors({ ...errors, [name]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetchWithAuth(API_URL.SERVICES, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          price: Number(form.price),
          durationMinutes: Number(form.durationMinutes),
          category: form.category.trim() || "",
          description: form.description.trim() || "",
        }),
      });

      if (!res) return;

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Error al crear servicio");
        return;
      }

      toast.success("Servicio creado correctamente");
      navigate("/services");
    } catch (error) {
      console.error(error);
      toast.error("Error inesperado al crear servicio");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    errors,
    loading,
    handleChange,
    handleSubmit,
  };
};
