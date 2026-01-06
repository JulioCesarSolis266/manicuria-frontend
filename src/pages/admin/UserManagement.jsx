import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { API_URL } from "../../config/api"; // ejemplo: "http://localhost:5000/api"
import { FaTrash, FaEdit, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NavBarMain from "../../components/NavBarMain";

const UserManagement = () => {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // 🧠 Obtener todos los usuarios
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_URL.USERS}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al cargar usuarios");
      setUsers(data.users);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✏️ Cargar datos para editar
  const handleEdit = (user) => {
    setEditingUser(user.id);
    setForm({ username: user.username, password: "" });
  };

  // 💾 Guardar cambios
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL.USERS}/${editingUser}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setEditingUser(null);
      setForm({ username: "", password: "" });
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  // 🗑️ Eliminar (borrado lógico)
  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que deseas desactivar este usuario?")) return;
    try {
      const res = await fetch(`${API_URL.USERS}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  // 🔎 Filtrado
  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase())
  );  

  return (
    <>
    <NavBarMain/>
    <div className="p-8 bg-pink-50 min-h-screen">
      <h1 className="text-2xl font-bold text-pink-600 mb-6">
        Gestión de Usuarios
      </h1>

      {/* 🔹 Botón para crear usuario */}
      <div className="flex justify-end mb-3">
        <button
          onClick={() => navigate("/register")}
          className="bg-pink-400 text-black px-3 py-2 rounded hover:bg-pink-500"
        >
          Crear usuario
        </button>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Buscar usuario..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 w-64 outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
      )}

      <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-pink-200">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Usuario</th>
            <th className="p-3 text-left">Fecha creación</th>
            <th className="p-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u) => (
            <tr
              key={u.id}
              className="border-b hover:bg-pink-50 transition-colors"
            >
              <td className="p-3">{u.id}</td>
              <td className="p-3">
                {editingUser === u.id ? (
                  <input
                    type="text"
                    value={form.username}
                    onChange={(e) =>
                      setForm({ ...form, username: e.target.value })
                    }
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  u.username
                )}
              </td>
              <td className="p-3">
                {new Date(u.createdAt).toLocaleDateString()}
              </td>
              <td className="p-3 flex justify-center gap-3">
                {editingUser === u.id ? (
                  <button
                    onClick={handleUpdate}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Guardar
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(u)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(u.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default UserManagement;
