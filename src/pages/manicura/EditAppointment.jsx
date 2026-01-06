import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function EditAppointment() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  // Campos del formulario
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [clientName, setClientName] = useState("");

  // Función que corrige el error de horario
  const formatForInput = (isoString) => {
    const d = new Date(isoString);
    const offset = d.getTimezoneOffset() * 60000;
    const local = new Date(d.getTime() - offset).toISOString().slice(0, 16);
    return local; // ejemplo: "2025-12-12T10:30"
  };

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/appointments/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.log("Error obteniendo turno");
          return;
        }

        const data = await res.json();
        console.log("Turno recibido:", data);

        setAppointment(data);

        // Cargar datos del turno
        setService(data.service || "");
        setDate(data.date ? formatForInput(data.date) : ""); // <-- ahora sí funciona
        setClientName(data.client?.name || "");

      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id, token]);

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/appointments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          service,
          date,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error al actualizar turno");
        return;
      }

      alert("Turno actualizado correctamente");
      navigate("/mis-turnos");

    } catch (error) {
      console.error("Error actualizando turno:", error);
      alert("Error inesperado");
    }
  };

  if (loading) return <p className="p-6">Cargando turno...</p>;
  if (!appointment) return <p className="p-6">No se encontró el turno.</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Editar Turno</h1>

      <div className="bg-white shadow-md rounded-lg p-6 border">

        {/* Servicio */}
        <label className="block font-medium mb-1">Servicio</label>
        <input
          type="text"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
        />

        {/* Fecha */}
        <label className="block font-medium mb-1">Fecha y Hora</label>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
        />

        {/* Cliente */}
        <label className="block font-medium mb-1">Cliente</label>
        <input
          type="text"
          value={clientName}
          disabled
          className="w-full border rounded px-3 py-2 bg-gray-100 mb-4"
        />

        {/* Botones */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate("/mis-turnos")}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancelar
          </button>

          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
