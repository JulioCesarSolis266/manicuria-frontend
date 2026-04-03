import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchWithAuth } from "../../../../api/fetchWithAuth";
import { API_URL } from "../../../../config/api";

export const useClientForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    surname: "",
    phone: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    const minLength = (value, min) => value.trim().length >= min;

    if (!form.name.trim()) {
      newErrors.name = "El nombre es obligatorio.";
    } else if (!minLength(form.name, 3)) {
      newErrors.name = "El nombre debe tener al menos 3 letras.";
    }

    if (!form.surname.trim()) {
      newErrors.surname = "El apellido es obligatorio.";
    } else if (!minLength(form.surname, 3)) {
      newErrors.surname = "El apellido debe tener al menos 3 letras.";
    }

    if (!form.phone) {
      newErrors.phone = "El teléfono es obligatorio.";
    } else if (!/^\d{7,15}$/.test(form.phone)) {
      newErrors.phone =
        "El teléfono debe tener entre 7 y 15 dígitos numéricos.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: null,
    }));
  };

  const handlePhoneChange = (e) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "");

    setForm((prev) => ({
      ...prev,
      phone: onlyNumbers,
    }));

    setErrors((prev) => ({
      ...prev,
      phone: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const res = await fetchWithAuth(API_URL.CLIENTS, {
        method: "POST",
        body: JSON.stringify(form),
      });

      if (!res) return;

      const data = await res.json();
      console.log("BACKEND ERROR:", data);

      if (!res.ok) {
        throw new Error(data.message || "Error al crear cliente");
      }

      toast.success("Cliente creado correctamente");
      navigate("/clients");
    } catch (error) {
      console.error(error);
      toast.error("Error inesperado al crear cliente");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/clients");
  };

  return {
    form,
    errors,
    loading,
    handleChange,
    handlePhoneChange,
    handleSubmit,
    handleCancel,
  };
};
