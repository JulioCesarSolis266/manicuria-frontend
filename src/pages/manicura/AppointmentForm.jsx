import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBarMain from "../../components/NavBarMain";

import { useClients } from "../../hooks/useClients";
import { useServices } from "../../hooks/useServices";

import { fetchWithAuth } from "../../services/fetchWithAuth";
import { API_URL } from "../../config/api";
import toast from "react-hot-toast";

export default function AppointmentForm() {
  const navigate = useNavigate();

  const { clients, loadingClients, errorClients } = useClients();
  const { services, loadingServices, errorServices } = useServices();

  const [serviceId, setServiceId] = useState("");
  const [date, setDate] = useState("");
  const [clientId, setClientId] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetchWithAuth(API_URL.APPOINTMENTS, {
      method: "POST",
      body: JSON.stringify({
        serviceId,
        date,
        clientId,
        description,
      }),
    });

    if (!res) return;

    let data = null;

    try {
      data = await res.json();//Esto sirve para capturar errores que no son de red
    } catch {
      throw new Error("Respuesta inválida del servidor");
    }

    if (!res.ok) {
      throw new Error(data.error || data.message || "Error al crear turno");
    }

    toast.success("Turno creado correctamente");
    navigate("/dashboard-manicura");

  } catch (error) {
    console.error("Error creating appointment:", error);
    toast.error(error.message || "Error de red al crear el turno");
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <NavBarMain />
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Crear Turno
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Servicio */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-red-600">
                Servicio *
              </label>

              {loadingServices && (
                <p className="text-sm text-gray-500">Cargando servicios...</p>
              )}

              {errorServices && (
                <p className="text-sm text-red-500">{errorServices}</p>
              )}

              {!loadingServices && !errorServices && (
                <select
                  required
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Selecciona un servicio</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Fecha */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-red-600">
                Fecha y Hora *
              </label>
              <input
                type="datetime-local"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Cliente */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-red-600">
                Cliente *
              </label>

              {loadingClients && (
                <p className="text-sm text-gray-500">Cargando clientes...</p>
              )}

              {errorClients && (
                <p className="text-sm text-red-500">{errorClients}</p>
              )}

              {!loadingClients && !errorClients && (
                <select
                  required
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Selecciona un cliente</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name + " " + client.surname}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Descripción */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Descripción
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`mt-2 w-full py-2 rounded-md font-medium text-white transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Guardando..." : "Crear Turno"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
