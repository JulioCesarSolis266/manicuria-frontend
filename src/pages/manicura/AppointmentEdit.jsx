import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useServices } from "../../hooks/useServices";
import { API_URL } from "../../config/api";
import NavBarMain from "../../components/NavBarMain";
import Footer from "../../components/Footer";
import toast from "react-hot-toast";

export default function AppointmentEdit() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { services, loadingServices, errorServices } = useServices();

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  const [serviceId, setServiceId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientSurname, setClientSurname] = useState("");
  const [description, setDescription] = useState("");

  const formatForInput = (isoString) => {
    const d = new Date(isoString);
    const offset = d.getTimezoneOffset() * 60000;
    return new Date(d.getTime() - offset).toISOString().slice(0, 16);
  };

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await fetch(
          `${API_URL.APPOINTMENTS}/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) {
          toast.error("Error obteniendo turno");
          return;
        }

        const data = await res.json();
        setAppointment(data);

        setServiceId(data.serviceId || "");
        setDate(data.date ? formatForInput(data.date) : "");
        setStatus(data.status || "pending");
        setClientName(data.client?.name || "");
        setClientSurname(data.client?.surname || "");
        setDescription(data.description || "");
      } catch (error) {
        console.error(error);
        toast.error("Error de red al cargar el turno");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id, token]);

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${API_URL.APPOINTMENTS}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          serviceId,
          date,
          status,
          description,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Error al actualizar turno");
        return;
      }

      toast.success("Turno actualizado correctamente");
      navigate("/mis-turnos");
    } catch (error) {
      console.error(error);
      toast.error("Error inesperado");
    }
  };

  if (loading) return <p className="p-6">Cargando turno...</p>;
  if (!appointment) return <p className="p-6">No se encontró el turno.</p>;

  return (
    <>
      <NavBarMain />
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Editar Turno</h1>

        <div className="bg-white shadow-md rounded-lg p-6 border space-y-4">
          <label className="block font-medium mb-1">Cliente</label>
          <input
            type="text"
            value={clientName + " " + clientSurname}
            disabled
            className="w-full border rounded px-3 py-2 bg-gray-100 mb-4"
          />
          <label className="block font-medium mb-1">Servicio</label>

          {loadingServices && <p>Cargando servicios...</p>}
          {errorServices && <p className="text-red-500">{errorServices}</p>}

          {!loadingServices && !errorServices && (
            <select
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4"
            >
              <option value="">Seleccionar servicio</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          )}

          <label className="block font-medium mb-1">Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-4"
            rows={3}
          />

          <label className="block font-medium mb-1">Fecha y Hora</label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-4"
          />

          <label className="block font-medium mb-1">Estado</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-4"
          >
            <option value="pending">Pendiente</option>
            <option value="completed">Completado</option>
            <option value="cancelled">Cancelado</option>
          </select>

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
      <Footer />
    </>
  );
}
