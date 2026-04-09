import { useState } from "react";
import toast from "react-hot-toast";
import { fetchWithAuth } from "../../../../api/fetchWithAuth";
import { API_URL } from "../../../../config/api";

export const useClientsManager = (clients, setClients) => {
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    surname: "",
    phone: "",
    notes: "",
  });

  // ================= EDIT =================
  const handleEdit = (client) => {
    setEditingId(client.id);
    setForm({
      name: client.name || "",
      surname: client.surname || "",
      phone: client.phone || "",
      notes: client.notes || "",
    });
    setErrors({});
  };

  // ================= VALIDATE =================
  const validate = () => {
    const newErrors = {};

    if (!form.name.trim() || form.name.length < 3) {
      newErrors.name = "Mínimo 3 caracteres";
    }

    if (!form.surname.trim() || form.surname.length < 3) {
      newErrors.surname = "Mínimo 3 caracteres";
    }

    if (!/^\d{8,15}$/.test(form.phone)) {
      newErrors.phone = "Teléfono inválido";
    }

    return newErrors;
  };

  // ================= SAVE =================
  const handleSave = async (id) => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetchWithAuth(`${API_URL.CLIENTS}/${id}`, {
        method: "PUT",
        body: JSON.stringify(form),
      });

      if (!res) return;

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      toast.success("Cliente actualizado");

      setClients((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...form } : c)),
      );

      setEditingId(null);
    } catch (err) {
      toast.error(err.message);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar cliente?")) return;

    try {
      const res = await fetchWithAuth(`${API_URL.CLIENTS}/${id}`, {
        method: "DELETE",
      });

      if (!res) return;

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success("Cliente eliminado");

      setClients((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      toast.error(err.message);
    }
  };

  // ================= FILTER =================
  const filteredClients = clients.filter((c) => {
    const fullName = `${c.name} ${c.surname}`.toLowerCase();
    return fullName.includes(search.toLowerCase());
  });

  return {
    editingId,
    form,
    errors,
    search,
    setSearch,
    setForm,
    setEditingId,
    handleEdit,
    handleSave,
    handleDelete,
    filteredClients,
  };
};
