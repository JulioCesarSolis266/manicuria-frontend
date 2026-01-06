import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import NavBarMain from "../../components/NavBarMain";
import { useNavigate } from "react-router-dom";

const DashboardManicura = () => {
  const { token, user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Obtener turnos
  const fetchAppointments = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/appointments", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (res.ok) {
        setAppointments(data.appointments);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error("Error al obtener turnos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Filtrado por cliente
  const filteredAppointments = appointments.filter((a) =>
    a.client.name.toLowerCase().includes(search.toLowerCase())
  );

  // Eliminar turno
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Eliminar este turno?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/appointments/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Turno eliminado");
      fetchAppointments();
    } catch (error) {
      console.error("Error eliminando", error);
    }
  };

  return (
    <>
      <NavBarMain />

      <div className="p-6">
        <h1 className="text-xl font-semibold mb-4">
          Gestión de Turnos — {user?.username}
        </h1>

        {/* Botón Crear */}
        <button
          onClick={() => navigate("/create-appointment")}
          className="bg-green-600 text-white px-4 py-2 rounded mb-4"
        >
          Crear Turno
        </button>

        {/* Barra de búsqueda */}
        <input
          type="text"
          placeholder="Buscar por cliente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 mb-4 w-full max-w-md"
        />

        {loading && <p>Cargando turnos...</p>}

        {/* Tabla */}
        {!loading && (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Servicio</th>
                <th className="p-2 border">Cliente</th>
                <th className="p-2 border">Fecha</th>
                <th className="p-2 border">Estado</th>
                <th className="p-2 border">Atiende</th>
                <th className="p-2 border text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {filteredAppointments.map((a) => (
                <tr key={a.id}>
                  <td className="p-2 border">{a.id}</td>
                  <td className="p-2 border">{a.service}</td>
                  <td className="p-2 border">{a.client.name}</td>
                  <td className="p-2 border">
                    {new Date(a.date).toLocaleString("es-AR")}
                  </td>
                  <td className="p-2 border">{a.status}</td>
                  <td className="p-2 border">
                    {a.attendedBy?.username || "Sin asignar"}
                  </td>

                  {/* ACCIONES */}
                  <td className="p-2 border text-center space-x-2">
                    {/* Editar */}
                    <button
                      onClick={() =>
                        navigate(`/edit-appointment/${a.id}`)
                      }
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Editar
                    </button>

                    {/* Eliminar */}
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}

              {filteredAppointments.length === 0 && !loading && (
                <tr>
                  <td
                    colSpan="7"
                    className="p-4 text-center text-gray-600"
                  >
                    No se encontraron turnos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default DashboardManicura;
