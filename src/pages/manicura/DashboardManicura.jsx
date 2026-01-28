import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import NavBarMain from "../../components/NavBarMain";
import Footer from "../../components/Footer";
import { API_URL } from "../../config/api";
import { fetchWithAuth } from "../../services/fetchWithAuth";
import toast from "react-hot-toast";

const DashboardManicura = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("pending");

  const statusMap = {
    pending: "Pendiente",
    completed: "Completado",
    cancelled: "Cancelado",
  };

  // ============================
  // OBTENER TURNOS
  // ============================
  const fetchAppointments = async () => {
    try {
      setLoading(true);

      const res = await fetchWithAuth(API_URL.APPOINTMENTS);
      if (!res) return;

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Error al cargar turnos");
        return;
      }

      setAppointments(data.appointments || []);
    } catch (error) {
      console.error("Error al obtener turnos:", error);
      toast.error("Error al obtener turnos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // ============================
  // FILTRO POR CLIENTE
  // ============================
  const filteredAppointments = appointments.filter((a) => {
    // 🔎 Filtro por texto (cliente)
    const fullName = `${a.client?.name || ""} ${
      a.client?.surname || ""
    }`.toLowerCase();
    const matchesSearch = fullName.includes(search.toLowerCase());

    // 📌 Filtro por estado
    const matchesStatus =
      statusFilter === "all" ? true : a.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // ============================
  // ELIMINAR TURNO
  // ============================
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
      fetchAppointments();
    } catch (error) {
      console.error("Error eliminando turno:", error);
      toast.error("Error eliminando turno");
    }
  };

  return (
    <>
      <NavBarMain />

      <div className="p-4 md:p-6">
        <h1 className="text-lg md:text-xl font-semibold mb-4 text-center md:text-left">
          Hola {user?.username || "Manicurista"}
        </h1>

        {/* ACCIONES SUPERIORES */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            {/* IZQUIERDA — Crear turno */}
            <button
              onClick={() => navigate("/create-appointment")}
              className="bg-green-600 text-white px-4 py-2 rounded-md
      hover:bg-green-700 transition-colors w-full md:w-auto"
            >
              + Crear Turno
            </button>

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

            {/* DERECHA — Grupo de filtros */}
            <div className="flex gap-2 w-full md:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border px-3 py-2 rounded-md w-full md:w-auto
        focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="pending">Pendientes</option>
                <option value="completed">Completados</option>
                <option value="cancelled">Cancelados</option>
                <option value="all">Todos</option>
              </select>
            </div>
          </div>
        </div>

        {loading && <p className="text-center">Cargando turnos...</p>}

        {/* ===================== */}
        {/* VISTA MOBILE (CARDS) */}
        {/* ===================== */}
        {!loading && (
          <div className="space-y-4 md:hidden">
            {filteredAppointments.map((a) => (
              <div
                key={a.id}
                className="border rounded-lg p-4 shadow-sm bg-white"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">
                    {a.service?.name || "Sin servicio"}
                  </h3>
                  <span className="text-sm text-gray-600">
                    {statusMap[a.status] || a.status}
                  </span>
                </div>

                <p className="text-sm">
                  <span className="font-medium">Cliente:</span>{" "}
                  {a.client?.name + " " + a.client?.surname || "Sin cliente"}
                </p>

                <p className="text-sm">
                  <span className="font-medium">Fecha:</span>{" "}
                  {new Date(a.date).toLocaleString("es-AR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    weekday: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </p>

                {/* Estado */}
                <p className="text-sm">
                  <span className="font-medium">Estado:</span>{" "}
                  {statusMap[a.status] || a.status}
                </p>

                <p className="text-sm">
                  <span className="font-medium">Descripción:</span>{" "}
                  {a.description || "Sin especificar"}
                </p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => navigate(`/edit-appointment/${a.id}`)}
                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded
                      cursor-pointer hover:bg-blue-700 transition-colors"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(a.id)}
                    className="flex-1 bg-red-600 text-white px-3 py-2 rounded
                      cursor-pointer hover:bg-red-700 transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}

            {filteredAppointments.length === 0 && (
              <p className="text-center text-gray-600">
                No se encontraron turnos.
              </p>
            )}
          </div>
        )}

        {/* ===================== */}
        {/* VISTA DESKTOP (TABLA) */}
        {/* ===================== */}
        {!loading && (
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse min-w-[800px]">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="border-b border-gray-300 p-2">Servicio</th>
                  <th className="border-b border-gray-300 p-2">Cliente</th>
                  <th className="border-b border-gray-300 p-2">Fecha</th>
                  <th className="border-b border-gray-300 p-2">Estado</th>
                  <th className="border-b border-gray-300 p-2 text-center">
                    Descripción
                  </th>
                  <th className="border-b border-gray-300 p-2 text-center">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredAppointments.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50">
                    <td className="border-b border-gray-300 p-2">
                      {a.service?.name || "Sin servicio"}
                    </td>
                    <td className="border-b border-gray-300 p-2">
                      {a.client?.name + " " + a.client?.surname ||
                        "Sin cliente"}
                    </td>
                    <td className="border-b border-gray-300 p-2">
                      {new Date(a.date).toLocaleString("es-AR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        weekday: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </td>
                    <td className="border-b border-gray-300 p-2">
                      {statusMap[a.status] || a.status}
                    </td>
                    <td className="border-b border-gray-300 p-2 text-center">
                      {a.description || "Sin especificar"}
                    </td>
                    <td className="border-b border-gray-300 p-2 text-center flex gap-2 justify-center">
                      <button
                        onClick={() => navigate(`/edit-appointment/${a.id}`)}
                        className="bg-blue-600 text-white px-3 py-1 rounded
                          cursor-pointer hover:bg-blue-700 transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(a.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded
                          cursor-pointer hover:bg-red-700 transition-colors"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredAppointments.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-600">
                      No se encontraron turnos.
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
};

export default DashboardManicura;
