import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config/api";
import { fetchWithAuth } from "../../../api/fetchWithAuth";
import toast from "react-hot-toast";
import { validateForm } from "../utils/validateForm";

export const useRegister = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    surname: "",
    username: "",
    phone: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setFormErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const errors = validateForm(form);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error("Revisá los campos");
      setLoading(false);
      return;
    }

    try {
      const res = await fetchWithAuth(`${API_URL.AUTH}/register`, {
        method: "POST",
        body: JSON.stringify({
          name: form.name.trim(),
          surname: form.surname.trim(),
          username: form.username.trim(),
          phone: form.phone.trim(),
          password: form.password,
        }),
      });

      if (!res) return;

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Error al registrar");
      }

      toast.success("Usuario creado correctamente");
      navigate("/users", { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/users");
  };

  return {
    form,
    formErrors,
    loading,
    handleChange,
    handleSubmit,
    handleCancel,
  };
};
