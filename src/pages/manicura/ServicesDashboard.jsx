import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import NavBarMain from "../../components/NavBarMain";
import { API_URL } from "../../config/api";
import { fetchWithAuth } from "../../services/fetchWithAuth";

export default function ServicesDashboard() {
  const navigate = useNavigate();

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

  const handleSave = async (id) => {
    const newErrors = {};

    // Validaciones simples
    if (!form.name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (!form.price || isNaN(form.price))
      newErrors.price = "El precio debe ser un número.";
    if (!form.durationMinutes || isNaN(form.durationMinutes))
      newErrors.durationMinutes = "La duración debe ser un número.";
    if (!form.durationMinutes || Number(form.durationMinutes) < 15)
      newErrors.durationMinutes = "Mínimo 15 minutos";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Actualizar servicio
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
      setEditingId(null);
      fetchServices();
    } catch (error) {
      console.error(error);
      toast.error("Error inesperado al actualizar servicio");
    }
  };

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
      fetchServices();
    } catch (error) {
      console.error(error);
      toast.error("Error inesperado al eliminar servicio");
    }
  };

  //formatear precio
  const formatPrice = (price) => {
    return Number(price).toLocaleString("es-AR",
      { style: "currency",
        currency: "ARS",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
  }

  return (
    <>
      <NavBarMain />

      <div className="px-4 py-6 max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between gap-3 mb-4">
          <h1 className="text-xl font-semibold">Gestión de Servicios</h1>

          <button
            onClick={() => navigate("/services/create")}
            className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-700 transition-colors"
          >
            Crear Servicio
          </button>
        </div>

        {loading && <p>Cargando servicios...</p>}

        {/* ================= MOBILE ================= */}
        {!loading && (
          <div className="md:hidden space-y-3">
            {services.map((s) => (
              <div key={s.id} className="border rounded-lg p-4 bg-white shadow">
                {editingId === s.id ? (
                  <>
                    {[
                      ["Servicio", "name"],
                      ["Precio", "price"],
                      ["Duración (min)", "durationMinutes"],
                      ["Categoría", "category"],
                      ["Descripción", "description"],
                    ].map(([label, field]) => (
                      <div key={field}>
                        <label className="text-sm font-medium">{label}</label>
                        <input
                          value={form[field]}
                          onChange={(e) =>
                            setForm({ ...form, [field]: e.target.value })
                          }
                          className={`w-full border px-3 py-2 rounded ${
                            errors[field] ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors[field] && (
                          <p className="text-red-600 text-sm">
                            {errors[field]}
                          </p>
                        )}
                      </div>
                    ))}

                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleSave(s.id)}
                        className="flex-1 bg-blue-600 text-white py-2 rounded cursor-pointer hover:bg-blue-700 transition-colors"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="flex-1 bg-gray-500 text-white py-2 rounded cursor-pointer hover:bg-gray-600 transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p>
                      <b>Servicio:</b> {s.name}
                    </p>
                    <p>
                      <b>Precio:</b> {formatPrice(s.price)}
                    </p>
                    <p>
                      <b>Duración (min):</b> {s.durationMinutes} min
                    </p>
                    <p>
                      <b>Categoría:</b> {s.category || "Sin especificar"}
                    </p>
                    <p>
                      <b>Descripción:</b> {s.description || "Sin especificar"}
                    </p>

                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleEdit(s)}
                        className="flex-1 bg-blue-600 text-white py-2 rounded cursor-pointer hover:bg-blue-700 transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="flex-1 bg-red-600 text-white py-2 rounded cursor-pointer hover:bg-red-700 transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ================= DESKTOP ================= */}
        {!loading && (
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border border-gray-300 border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    "Servicio",
                    "Precio",
                    "Duración (min)",
                    "Categoría",
                    "Descripción",
                  ].map((title) => (
                    <th
                      key={title}
                      className="border-b border-gray-300 p-2 text-left"
                    >
                      {title}
                    </th>
                  ))}
                  <th className="border-b border-gray-300 p-2 text-center">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    {editingId === s.id ? (
                      <>
                        {[
                          "name",
                          "price",
                          "durationMinutes",
                          "category",
                          "description",
                        ].map((field) => (
                          <td
                            key={field}
                            className="border-b border-gray-300 p-2"
                          >
                            <input
                              value={form[field]}
                              onChange={(e) =>
                                setForm({ ...form, [field]: e.target.value })
                              }
                              className={`w-full border px-2 py-1 rounded ${
                                errors[field]
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            />
                            {errors[field] && (
                              <p className="text-red-600 text-sm">
                                {errors[field]}
                              </p>
                            )}
                          </td>
                        ))}
                        <td className="border-b border-gray-300 p-2 text-center">
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => handleSave(s.id)}
                              className="bg-green-600 text-white px-3 py-1 rounded cursor-pointer hover:bg-green-700 transition-colors"
                            >
                              Guardar
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="bg-gray-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-gray-600 transition-colors"
                            >
                              Cancelar
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="border-b border-gray-300 p-2">
                          {s.name}
                        </td>
                        <td className="border-b border-gray-300 p-2">
                          {formatPrice(s.price)}
                        </td>
                        <td className="border-b border-gray-300 p-2">
                          {s.durationMinutes} min
                        </td>
                        <td className="border-b border-gray-300 p-2">
                          {s.category || "Sin especificar"}
                        </td>
                        <td className="border-b border-gray-300 p-2">
                          {s.description || "Sin especificar"}
                        </td>
                        <td className="border-b border-gray-300 p-2 text-center">
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => handleEdit(s)}
                              className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer hover:bg-blue-700 transition-colors"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDelete(s.id)}
                              className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer hover:bg-red-700 transition-colors"
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
