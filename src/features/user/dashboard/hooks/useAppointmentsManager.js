import { useState, useMemo } from "react";
import { fetchWithAuth } from "../../../../api/fetchWithAuth";
import { API_URL } from "../../../../config/api";
import toast from "react-hot-toast";

export const useAppointmentsManager = (appointments, setAppointments) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");

  const statusMap = {
    pending: "Pendiente",
    completed: "Completado",
    cancelled: "Cancelado",
  };

  // 🔍 FILTRO
  const filteredAppointments = useMemo(() => {
    return appointments.filter((a) => {
      const fullName =
        `${a.client?.name || ""} ${a.client?.surname || ""}`.toLowerCase();

      const matchesSearch = fullName.includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "all" ? true : a.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [appointments, search, statusFilter]);

  // 🗑 DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este turno?")) return;

    try {
      const res = await fetchWithAuth(`${API_URL.APPOINTMENTS}/${id}`, {
        method: "DELETE",
      });

      if (!res) return;

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Error al eliminar turno");
        return;
      }

      toast.success("Turno eliminado correctamente");

      setAppointments((prev) => prev.filter((a) => a.id !== id));
    } catch {
      toast.error("Error eliminando turno");
    }
  };

  // 🔄 UPDATE (CORREGIDO)
  const updateAppointment = async (id, updates) => {
    try {
      const res = await fetchWithAuth(`${API_URL.APPOINTMENTS}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!res) return false;

      const data = await res.json();

      console.log("STATUS:", res.status);
      console.log("RESPONSE:", data);

      if (!res.ok) {
        toast.error(data.message || "Error al actualizar turno");
        return false;
      }

      toast.success("Turno actualizado");

      // 🔥 SOLUCIÓN: volver a traer todo
      const refetch = await fetchWithAuth(API_URL.APPOINTMENTS);
      const refetchData = await refetch.json();

      setAppointments(refetchData.appointments || []);

      return true;
    } catch (err) {
      console.error(err);
      toast.error("Error actualizando turno");
      return false;
    }
  };

  return {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    statusMap,
    filteredAppointments,
    handleDelete,
    updateAppointment,
  };
};
