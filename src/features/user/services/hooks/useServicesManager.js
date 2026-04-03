import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { API_URL } from "../../../../config/api";
import { fetchWithAuth } from "../../../../api/fetchWithAuth";

export const useServicesManager = () => {
  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    durationMinutes: "",
    category: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  // ================= FETCH =================
  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetchWithAuth(API_URL.SERVICES);
      if (!res) return;

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Error cargando servicios");
        return;
      }

      setServices(data.services || []);
    } catch (error) {
      console.error(error);
      toast.error("Error inesperado al cargar servicios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // ================= EDIT =================
  const handleEdit = (s) => {
    setEditingId(s.id);
    setForm({
      name: s.name || "",
      price: s.price || "",
      durationMinutes: s.durationMinutes || "",
      category: s.category || "",
      description: s.description || "",
    });
    setErrors({});
  };

  // ================= VALIDATION =================
  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (!form.price || isNaN(form.price))
      newErrors.price = "El precio debe ser un número.";
    if (!form.durationMinutes || isNaN(form.durationMinutes))
      newErrors.durationMinutes = "La duración debe ser un número.";
    if (Number(form.durationMinutes) < 15)
      newErrors.durationMinutes = "Mínimo 15 minutos";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ================= SAVE =================
  const handleSave = async (id) => {
    if (!validate()) return;

    try {
      const res = await fetchWithAuth(`${API_URL.SERVICES}/${id}`, {
        method: "PUT",
        body: JSON.stringify(form),
      });

      if (!res) return;

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Error actualizando servicio");
        return;
      }

      toast.success("Servicio actualizado correctamente");

      setServices((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...form } : s)),
      );

      setEditingId(null);
    } catch (error) {
      console.error(error);
      toast.error("Error inesperado al actualizar servicio");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este servicio?")) return;

    try {
      const res = await fetchWithAuth(`${API_URL.SERVICES}/${id}`, {
        method: "DELETE",
      });

      if (!res) return;

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "No se pudo eliminar el servicio");
        return;
      }

      toast.success("Servicio eliminado correctamente");

      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      console.error(error);
      toast.error("Error inesperado al eliminar servicio");
    }
  };

  return {
    services,
    loading,
    editingId,
    form,
    errors,
    setForm,
    setEditingId,
    handleEdit,
    handleSave,
    handleDelete,
  };
};
