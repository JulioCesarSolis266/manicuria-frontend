// Logica relacionada a los usuarios, como obtenerlos, editarlos, desactivarlos, reactivarlos y eliminarlos. Tambien se maneja el estado de busqueda y filtro por estado (activo/inactivo)

import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import toast from "react-hot-toast";
import {
  getUsers,
  updateUser,
  deactivateUser,
  reactivateUser,
  deleteUser,
} from "../api/userApi";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("active");

  const [editingUser, setEditingUser] = useState(null);

  const [form, setForm] = useState({
    name: "",
    surname: "",
    username: "",
    phone: "",
  });

  const { user: currentUser } = useContext(AuthContext);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      const filtered = data.filter((u) => u.id !== currentUser?.id);
      setUsers(filtered);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!currentUser) return;
    fetchUsers();
  }, [currentUser]);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEdit = (user) => {
    setEditingUser(user.id);

    setForm({
      name: user.name || "",
      surname: user.surname || "",
      username: user.username || "",
      phone: user.phone || "",
    });
  };

  const handleUpdate = async (id) => {
    try {
      await updateUser(id, form);

      toast.success("Usuario actualizado");

      setEditingUser(null);

      fetchUsers();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeactivate = async (id) => {
    try {
      const confirmed = window.confirm("¿Desactivar este usuario?");

      if (!confirmed) return;
      await deactivateUser(id);

      toast.success("Usuario desactivado");

      fetchUsers();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleReactivate = async (id) => {
    try {
      const confirmed = window.confirm("¿Reactivar este usuario?");

      if (!confirmed) return;
      await reactivateUser(id);

      toast.success("Usuario reactivado");

      fetchUsers();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm("¿Eliminar este usuario?");

      if (!confirmed) return;
      await deleteUser(id);

      toast.success("Usuario eliminado");

      fetchUsers();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelEdit = () => {
    setEditingUser(null);
  };

  const filteredUsers = users.filter((u) => {
    const term = search.toLowerCase();

    if (statusFilter === "active" && !u.isActive) return false;
    if (statusFilter === "inactive" && u.isActive) return false;

    return (
      u.name.toLowerCase().includes(term) ||
      u.surname.toLowerCase().includes(term) ||
      u.username.toLowerCase().includes(term)
    );
  });

  return {
    users: filteredUsers,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    editingUser,
    form,
    handleChange,
    handleEdit,
    handleUpdate,
    handleDeactivate,
    handleReactivate,
    handleDelete,
    cancelEdit,
  };
};
