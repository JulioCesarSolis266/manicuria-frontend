import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { API_URL } from "../../config/api";
import { FaTrash, FaEdit, FaSearch, FaRedo, FaUserSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NavBarMain from "../../components/NavBarMain";
import { fetchWithAuth } from "../../services/fetchWithAuth";
import toast from "react-hot-toast";

const DashboardAdmin = () => {
  const { user } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [statusFilter, setStatusFilter] = useState("active");
  const [form, setForm] = useState({
    name: "",
    surname: "",
    username: "",
    phone: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();

  // ===============================
  // 🧠 Obtener usuarios
  // ===============================
  const fetchUsers = async () => {
    const res = await fetchWithAuth(API_URL.USERS);
    if (!res) return;

    const data = await res.json();
    if (!res.ok) {
      toast.error(data.message || "Error al cargar usuarios");
      return;
    }

    setUsers(data.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ===============================
  // ✏️ Editar
  // ===============================
  const handleEdit = (u) => {
    setEditingUser(u.id);
    setForm({
      name: u.name,
      surname: u.surname,
      username: u.username,
      phone: u.phone || "",
      password: "",
    });
    setFormErrors({});
  };

  // ===============================
  // ✅ Validaciones
  // ===============================
  const validateForm = () => {
    const errors = {};

    if (!form.name.trim()) {
      errors.name = "El nombre es obligatorio";
    } else if (form.name.trim().length < 3) {
      errors.name = "El nombre debe tener al menos 3 caracteres";
    }
    if (!form.surname.trim()) {
      errors.surname = "El apellido es obligatorio";
    } else if (form.surname.trim().length < 3) {
      errors.surname = "El apellido debe tener al menos 3 caracteres";
    }

    if (!form.username.trim()) {
      errors.username = "El nombre de usuario es obligatorio";
    } else if (form.username.trim().length < 3) {
      errors.username = "Debe tener al menos 3 caracteres";
    }

    if (!form.phone) {
      errors.phone = "El teléfono es obligatorio";
    } else if (!/^\d+$/.test(form.phone)) {
      errors.phone = "Solo números";
    } else if (form.phone.length < 8) {
      errors.phone = "Mínimo 8 dígitos";
    } else if (form.phone.length > 15) {
      errors.phone = "Máximo 15 dígitos";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ===============================
  // 💾 Guardar cambios
  // ===============================
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const res = await fetchWithAuth(`${API_URL.USERS}/${editingUser}`, {
      method: "PUT",
      body: JSON.stringify(form),
    });

    if (!res) return;

    const data = await res.json();
    if (!res.ok) {
      toast.error(data.message || "Error al actualizar usuario");
      return;
    }

    toast.success("Usuario actualizado correctamente");
    setEditingUser(null);
    setForm({ username: "", phone: "", password: "" });
    setFormErrors({});
    fetchUsers();
  };

  // ===============================
  // 🗑️ Desactivar usuario
  // ===============================
  const handleDeactivate = async (id) => {
    if (!confirm("¿Seguro que deseas desactivar este usuario?")) return;

    const res = await fetchWithAuth(`${API_URL.USERS}/${id}/deactivate`, {
      method: "PATCH",
    });

    if (!res) return;

    const data = await res.json();
    if (!res.ok) {
      toast.error(data.message || "Error al desactivar usuario");
      return;
    }

    toast.success("Usuario desactivado");
    fetchUsers();
  };

  // ===============================
  // 🔄 Reactivar usuario
  // ===============================
  const handleReactivate = async (id) => {
    if (!confirm("¿Deseas reactivar este usuario?")) return;

    const res = await fetchWithAuth(`${API_URL.USERS}/${id}/reactivate`, {
      method: "PATCH",
    });

    if (!res) return;

    const data = await res.json();
    if (!res.ok) {
      toast.error(data.message || "Error al reactivar usuario");
      return;
    }

    toast.success("Usuario reactivado");
    fetchUsers();
  };

  // ===============================
  // 🔄 Eliminar usuario
  // ===============================
  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;

    const res = await fetchWithAuth(`${API_URL.USERS}/${id}`, {
      method: "DELETE",
    });

    if (!res) return;

    const data = await res.json();
    if (!res.ok) {
      toast.error(data.message || "Error al eliminar usuario");
      return;
    }

    toast.success("Usuario eliminado");
    fetchUsers();
  };

  // ===============================
  // 🔎 Filtro (oculta admin logueado)
  // ===============================
  const filteredUsers = users.filter((u) => {
    if (u.id === user.id) return false;

    // 🔎 Filtro por estado
    if (statusFilter === "active" && !u.isActive) return false;
    if (statusFilter === "inactive" && u.isActive) return false;

    const searchTerm = search.toLowerCase().trim();

    const fullName = `${u.name} ${u.surname}`.toLowerCase();
    const nameOnly = u.name?.toLowerCase() || "";
    const surnameOnly = u.surname?.toLowerCase() || "";
    const username = u.username?.toLowerCase() || "";

    return (
      fullName.includes(searchTerm) ||
      nameOnly.includes(searchTerm) ||
      surnameOnly.includes(searchTerm) ||
      username.includes(searchTerm)
    );
  });

  return (
    <>
      <NavBarMain />

      <div className="min-h-screen bg-slate-900 text-slate-100 px-4 py-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-2xl font-semibold">Gestión de Usuarios</h1>

            <button
              onClick={() => navigate("/register")}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-md"
            >
              Crear usuario
            </button>
          </div>

          {/* Buscador */}
          <div className="mb-4 flex items-center gap-2">
            <FaSearch className="text-slate-400" />
            <input
              type="text"
              placeholder="Buscar usuario..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 w-full max-w-xs text-sm outline-none"
            />
            {/* Filtro por estado */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm"
            >
              <option value="active">Solo activos</option>
              <option value="inactive">Solo desactivados</option>
              <option value="all">Todos</option>
            </select>
          </div>

          <p className="text-sm text-slate-400 mb-4">
            Total de usuarios: {filteredUsers.length}
          </p>

          {/* ================= MOBILE ================= */}
          <div className="md:hidden space-y-4">
            {filteredUsers.map((u, index) => {
              const isEditing = editingUser === u.id;

              return (
                <div key={u.id} className="bg-slate-800 rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-slate-400">{index + 1}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        u.isActive
                          ? "bg-emerald-600/20 text-emerald-400"
                          : "bg-red-600/20 text-red-400"
                      }`}
                    >
                      {u.isActive ? "Activo" : "Desactivado"}
                    </span>
                  </div>

                  {/* Nombre con posibilidad de editar*/}
                  <div className="mt-2">
                    {isEditing ? (
                      <>
                        <p className="text-sm font-medium">Nombre</p>
                        <input
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm"
                        />
                        {formErrors.name && (
                          <p className="text-xs text-red-400">
                            {formErrors.name}
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="text-xs text-slate-400">
                        <b>Nombre: </b>
                        {u.name}
                      </p>
                    )}
                  </div>

                  {/* Apellido */}
                  <div className="mt-2">
                    {isEditing ? (
                      <>
                        <p className="text-sm font-medium">Apellido</p>
                        <input
                          value={form.surname}
                          onChange={(e) =>
                            setForm({ ...form, surname: e.target.value })
                          }
                          className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm"
                        />
                        {formErrors.surname && (
                          <p className="text-xs text-red-400">
                            {formErrors.surname}
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="text-xs text-slate-400">
                        {" "}
                        <b>Apellido: </b>
                        {u.surname}
                      </p>
                    )}
                  </div>

                  {/* Username */}
                  <div className="mt-2">
                    {isEditing ? (
                      <>
                        <p className="text-sm font-medium">Usuario</p>
                        <input
                          value={form.username}
                          onChange={(e) =>
                            setForm({ ...form, username: e.target.value })
                          }
                          className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm"
                        />
                        {formErrors.username && (
                          <p className="text-xs text-red-400">
                            {formErrors.username}
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="text-xs text-slate-400">
                        <b>Usuario: </b>
                        {u.username}
                      </p>
                    )}
                  </div>

                  {/* Teléfono */}
                  <div className="mt-2">
                    {isEditing ? (
                      <>
                        <p className="text-sm font-medium">Teléfono</p>
                        <input
                          value={form.phone}
                          onChange={(e) =>
                            setForm({ ...form, phone: e.target.value })
                          }
                          className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm"
                        />

                        {formErrors.phone && (
                          <p className="text-xs text-red-400">
                            {formErrors.phone}
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="text-xs text-slate-400">
                        <b>Telefono: </b>
                        {u.phone}
                      </p>
                    )}
                  </div>

                  {/* Acciones */}
                  <div className="flex justify-end gap-4 mt-4">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleUpdate}
                          className="bg-emerald-600 px-3 py-1 rounded text-sm"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={() => setEditingUser(null)}
                          className="text-slate-400 text-sm"
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(u)}
                          className="text-sky-400"
                        >
                          <FaEdit />
                        </button>

                        {u.isActive ? (
                          <button
                            onClick={() => handleDeactivate(u.id)}
                            className="text-red-400"
                          >
                            <FaUserSlash />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleReactivate(u.id)}
                            className="text-emerald-400"
                          >
                            <FaRedo />
                          </button>
                        )}

                        <button
                          onClick={() => handleDelete(u.id)}
                          className="text-red-600"
                          title="Eliminar definitivamente"
                        >
                          <FaTrash />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================= DESKTOP ================= */}
          <div className="hidden md:block">
            <table className="w-full bg-slate-800 rounded-lg overflow-hidden">
              <thead className="bg-slate-700">
                <tr>
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">Nombre</th>
                  <th className="p-3 text-left">Apellido</th>
                  <th className="p-3 text-left">Usuario</th>
                  <th className="p-3 text-left">Teléfono</th>
                  <th className="p-3 text-left">Estado</th>
                  <th className="p-3 text-center">Acciones</th>
                </tr>
              </thead>

              {/* NOMBRE */}
              <tbody>
                {filteredUsers.map((u, index) => (
                  <tr key={u.id} className="border-b border-slate-700">
                    <td className="p-3">{index + 1}</td>

                    <td className="p-3">
                      {editingUser === u.id ? (
                        <>
                          <input
                            value={form.name}
                            onChange={(e) =>
                              setForm({ ...form, name: e.target.value })
                            }
                            className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm"
                          />
                          {formErrors.name && (
                            <p className="text-xs text-red-400">
                              {formErrors.name}
                            </p>
                          )}
                        </>
                      ) : (
                        u.name
                      )}
                    </td>

                    <td className="p-3">
                      {editingUser === u.id ? (
                        <>
                          <input
                            value={form.surname}
                            onChange={(e) =>
                              setForm({ ...form, surname: e.target.value })
                            }
                            className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1"
                          />
                          {formErrors.surname && (
                            <p className="text-xs text-red-400">
                              {formErrors.surname}
                            </p>
                          )}
                        </>
                      ) : (
                        u.surname
                      )}
                    </td>

                    {/* USERNAME */}
                    <td className="p-3">
                      {editingUser === u.id ? (
                        <>
                          <input
                            value={form.username}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                username: e.target.value,
                              })
                            }
                            className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1"
                          />
                          {formErrors.username && (
                            <p className="text-xs text-red-400">
                              {formErrors.username}
                            </p>
                          )}
                        </>
                      ) : (
                        u.username
                      )}
                    </td>

                    {/* TELÉFONO */}
                    <td className="p-3">
                      {editingUser === u.id ? (
                        <>
                          <input
                            value={form.phone}
                            onChange={(e) =>
                              setForm({ ...form, phone: e.target.value })
                            }
                            className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1"
                          />
                          {formErrors.phone && (
                            <p className="text-xs text-red-400">
                              {formErrors.phone}
                            </p>
                          )}
                        </>
                      ) : (
                        u.phone || "—"
                      )}
                    </td>

                    {/* ESTADO */}
                    <td className="p-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          u.isActive
                            ? "bg-emerald-600/20 text-emerald-400"
                            : "bg-red-600/20 text-red-400"
                        }`}
                      >
                        {u.isActive ? "Activo" : "Desactivado"}
                      </span>
                    </td>

                    <td className="p-3 flex justify-center gap-4">
                      {editingUser === u.id ? (
                        <>
                          <button
                            onClick={handleUpdate}
                            className="bg-emerald-600 px-3 py-1 rounded"
                          >
                            Guardar
                          </button>

                          <button
                            onClick={() => setEditingUser(null)}
                            className="bg-slate-600 px-3 py-1 rounded"
                          >
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(u)}
                            className="text-sky-400"
                          >
                            <FaEdit />
                          </button>

                          {u.isActive ? (
                            <button
                              onClick={() => handleDeactivate(u.id)}
                              className="text-red-400"
                            >
                              <FaUserSlash />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleReactivate(u.id)}
                              className="text-emerald-400"
                            >
                              <FaRedo />
                            </button>
                          )}

                          <button
                            onClick={() => handleDelete(u.id)}
                            className="text-red-600"
                            title="Eliminar definitivamente"
                          >
                            <FaTrash />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardAdmin;
