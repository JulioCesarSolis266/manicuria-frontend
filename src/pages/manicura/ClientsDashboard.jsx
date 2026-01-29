import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_URL } from "../../config/api";
import { fetchWithAuth } from "../../services/fetchWithAuth";
import NavBarMain from "../../components/NavBarMain";

export default function ClientsDashboard() {
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");
  const statusFilter = "all";
  const [form, setForm] = useState({
    name: "",
    surname: "",
    phone: "",
    notes: "",
  });
  const [loading, setLoading] = useState(true);

  // =========================
  // OBTENER CLIENTES
  // =========================
  const fetchClients = async () => {
    try {
      setLoading(true);
      const res = await fetchWithAuth(API_URL.CLIENTS);
      if (!res) return;

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Error al cargar clientes");
        return;
      }

      setClients(data.clients || []);
    } catch (error) {
      console.error("Error cargando clientes:", error);
      toast.error("Error inesperado al cargar clientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // =========================
  // EDITAR
  // =========================
  const handleEdit = (client) => {
    setEditingId(client.id);
    setForm({
      name: client?.name || "",
      surname: client?.surname || "",
      phone: client?.phone || "",
      notes: client?.notes || "",
    });
    setErrors({});
  };

  // =========================
  // GUARDAR
  // =========================
  const handleSave = async (id) => {
    const newErrors = {};

    // ===== NOMBRE =====
    if (!form.name || form.name.trim() === "") {
      newErrors.name = "El nombre es obligatorio.";
    } else if (form.name.trim().length < 3) {
      newErrors.name = "El nombre debe tener al menos 3 letras.";
    }

    // ===== APELLIDO =====
    if (!form.surname || form.surname.trim() === "") {
      newErrors.surname = "El apellido es obligatorio.";
    } else if (form.surname.trim().length < 3) {
      newErrors.surname = "El apellido debe tener al menos 3 letras.";
    }

    // ===== TELÉFONO =====
    const phone = form.phone?.trim();

    if (!phone) {
      newErrors.phone = "El teléfono es obligatorio.";
    } else if (!/^\d+$/.test(phone)) {
      newErrors.phone = "El teléfono debe contener solo números.";
    } else if (phone.length < 7 || phone.length > 15) {
      newErrors.phone = "El teléfono debe tener entre 7 y 15 dígitos.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await fetchWithAuth(`${API_URL.CLIENTS}/${id}`, {
        method: "PUT",
        body: JSON.stringify(form),
      });

      if (!res) return;

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Error al actualizar cliente");
        return;
      }

      toast.success("Cliente actualizado correctamente");
      setEditingId(null);
      fetchClients();
    } catch (error) {
      console.error("Error actualizando cliente:", error);
      toast.error("Error inesperado al actualizar cliente");
    }
  };

  // ============================
  // FILTRO POR CLIENTE
  // ============================
  const filteredClients = clients.filter((c) => {
    const fullName = `${c.name || ""} ${c.surname || ""}`.toLowerCase();
    const matchesSearch = fullName.includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ? true : c.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // =========================
  // ELIMINAR
  // =========================
  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este cliente?")) return;

    try {
      const res = await fetchWithAuth(`${API_URL.CLIENTS}/${id}`, {
        method: "DELETE",
      });
      if (!res) return;

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Error al eliminar cliente");
        return;
      }

      toast.success("Cliente eliminado correctamente");
      fetchClients();
    } catch (error) {
      console.error("Error eliminando cliente:", error);
      toast.error("Error inesperado al eliminar cliente");
    }
  };

  //formato telefono
  const formatPhone = (phone) => {
    if (!phone) return "";
    return phone.replace(/(\d{2,3})(\d{2,3})(\d{2,3})/, "$1 $2 $3");
  };

  // =========================
  // RETURN
  // =========================
  return (
    <>
      <NavBarMain />

      <div className="px-4 py-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <h1 className="text-xl font-semibold text-center md:text-left">
            Gestión de Clientes
          </h1>

          {/* CENTRO — Buscador ocupa espacio flexible */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar por cliente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border px-4 py-2 rounded-md
        focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            onClick={() => navigate("/create-client")}
            className="bg-green-600 text-white px-4 py-2 rounded w-full md:w-auto
            cursor-pointer hover:bg-green-700 transition-colors"
          >
            Crear Cliente
          </button>
        </div>

        {loading && <p className="text-center">Cargando clientes...</p>}

        {/* ================= MOBILE (CARDS) ================= */}
        {!loading && (
          <div className="md:hidden space-y-3">
            {filteredClients.map((c) => (
              <div
                key={c.id}
                className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm"
              >
                {editingId === c.id ? (
                  <>
                    <div className="space-y-2">
                      {/* Nombre */}
                      <div>
                        <label className="text-xs font-semibold text-gray-600">
                          Nombre
                        </label>
                        <input
                          value={form?.name || ""}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          className={`w-full border border-gray-300 px-3 py-2 rounded ${
                            errors?.name ? "border-red-500" : ""
                          }`}
                        />
                        {errors?.name && (
                          <p className="text-sm text-red-600">{errors.name}</p>
                        )}
                      </div>
                      <label className="text-xs font-semibold text-gray-600">
                        Apellido
                      </label>
                      <input
                        value={form?.surname || ""}
                        onChange={(e) =>
                          setForm({ ...form, surname: e.target.value })
                        }
                        className={`w-full border border-gray-300 px-3 py-2 rounded ${
                          errors?.surname ? "border-red-500" : ""
                        }`}
                      />

                      {/* Teléfono */}
                      <div>
                        <label className="text-xs font-semibold text-gray-600">
                          Teléfono
                        </label>
                        <input
                          value={form?.phone || ""}
                          inputMode="numeric"
                          onChange={(e) =>
                            setForm({
                              ...form,
                              phone: e.target.value.replace(/\D/g, ""),
                            })
                          }
                          className={`w-full border border-gray-300 px-3 py-2 rounded ${
                            errors?.phone ? "border-red-500" : ""
                          }`}
                        />
                        {errors?.phone && (
                          <p className="text-sm text-red-600">{errors.phone}</p>
                        )}
                      </div>

                      {/* Notas */}
                      <div>
                        <label className="text-xs font-semibold text-gray-600">
                          Notas
                        </label>
                        <input
                          value={form?.notes || ""}
                          onChange={(e) =>
                            setForm({ ...form, notes: e.target.value })
                          }
                          className="w-full border border-gray-300 px-3 py-2 rounded"
                        />
                      </div>
                    </div>

                    {/* Botones */}
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleSave(c.id)}
                        className="flex-1 bg-blue-600 text-white py-2 rounded
                        cursor-pointer hover:bg-blue-700 transition-colors"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="flex-1 bg-gray-500 text-white py-2 rounded
                        cursor-pointer hover:bg-gray-600 transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="font-semibold">{c.name + " " + c.surname}</p>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Tel:</span>{" "}
                      {formatPhone(c.phone) || "-"}
                    </p>
                    {c.notes && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Notas:</span> {c.notes}
                      </p>
                    )}

                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleEdit(c)}
                        className="flex-1 bg-blue-600 text-white py-2 rounded
                        cursor-pointer hover:bg-blue-700 transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="flex-1 bg-red-600 text-white py-2 rounded
                        cursor-pointer hover:bg-red-700 transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}

            {filteredClients.length === 0 && (
              <p className="text-center text-gray-600">
                No hay clientes cargados.
              </p>
            )}
          </div>
        )}

        {/* ================= DESKTOP (TABLA) ================= */}
        {!loading && (
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse min-w-[900px]">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-2 border-b border-gray-300">Nombre</th>
                  <th className="p-2 border-b border-gray-300">Apellido</th>
                  <th className="p-2 border-b border-gray-300">Teléfono</th>
                  <th className="p-2 border-b border-gray-300">Notas</th>
                  <th className="p-2 border-b border-gray-300 text-center">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredClients.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    {editingId === c.id ? (
                      <>
                        {/* Nombre */}
                        <td className="p-2 border-b border-gray-300">
                          <input
                            value={form.name}
                            onChange={(e) =>
                              setForm({ ...form, name: e.target.value })
                            }
                            placeholder="Nombre"
                            className={`w-full border px-2 py-1 rounded ${
                              errors.name ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                          {errors.name && (
                            <p className="text-sm text-red-600">
                              {errors.name}
                            </p>
                          )}
                        </td>

                        {/* Apellido */}
                        <td className="p-2 border-b border-gray-300">
                          <input
                            value={form.surname}
                            onChange={(e) =>
                              setForm({ ...form, surname: e.target.value })
                            }
                            placeholder="Apellido"
                            className={`w-full border px-2 py-1 rounded ${
                              errors.surname
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {errors.surname && (
                            <p className="text-sm text-red-600">
                              {errors.surname}
                            </p>
                          )}
                        </td>

                        {/* Teléfono */}
                        <td className="p-2 border-b border-gray-300">
                          <input
                            value={form.phone}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                phone: e.target.value.replace(/\D/g, ""),
                              })
                            }
                            placeholder="Teléfono"
                            className={`w-full border px-2 py-1 rounded ${
                              errors.phone
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {errors.phone && (
                            <p className="text-sm text-red-600">
                              {errors.phone}
                            </p>
                          )}
                        </td>

                        {/* Notas */}
                        <td className="p-2 border-b border-gray-300">
                          <input
                            value={form.notes}
                            onChange={(e) =>
                              setForm({ ...form, notes: e.target.value })
                            }
                            placeholder="Notas"
                            className="w-full border border-gray-300 px-2 py-1 rounded"
                          />
                        </td>

                        {/* Acciones */}
                        <td className="p-2 border-b border-gray-300 text-center whitespace-nowrap">
                          <button
                            onClick={() => handleSave(c.id)}
                            className="bg-blue-600 text-white px-3 py-1 rounded mr-2
                    hover:bg-blue-700 transition-colors"
                          >
                            Guardar
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="bg-gray-500 text-white px-3 py-1 rounded
                    hover:bg-gray-600 transition-colors"
                          >
                            Cancelar
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        {/* Nombre */}
                        <td className="p-2 border-b border-gray-300">
                          {c.name}
                        </td>

                        {/* Apellido */}
                        <td className="p-2 border-b border-gray-300">
                          {c.surname}
                        </td>

                        {/* Teléfono */}
                        <td className="p-2 border-b border-gray-300">
                          {formatPhone(c.phone) || "-"}
                        </td>

                        {/* Notas */}
                        <td className="p-2 border-b border-gray-300">
                          {c.notes || "Sin especificar"}
                        </td>

                        {/* Acciones */}
                        <td className="p-2 border-b border-gray-300 text-center whitespace-nowrap">
                          <button
                            onClick={() => handleEdit(c)}
                            className="bg-blue-600 text-white px-3 py-1 rounded mr-2
                    hover:bg-blue-700 transition-colors"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(c.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded
                    hover:bg-red-700 transition-colors"
                          >
                            Eliminar
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}

                {filteredClients.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-600">
                      No hay clientes cargados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
