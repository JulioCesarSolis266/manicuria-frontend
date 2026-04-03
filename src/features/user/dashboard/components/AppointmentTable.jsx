export default function AppointmentTable({
  appointments,
  statusMap,
  onEdit,
  onDelete,
}) {
  return (
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
          {appointments.map((a) => (
            <tr key={a.id} className="hover:bg-gray-50">
              <td className="border-b border-gray-300 p-2">
                {a.service?.name || "Sin servicio"}
              </td>

              <td className="border-b border-gray-300 p-2">
                {a.client?.name + " " + a.client?.surname || "Sin cliente"}
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
                  onClick={() => onEdit(a.id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded
                  cursor-pointer hover:bg-blue-700 transition-colors"
                >
                  Editar
                </button>

                <button
                  onClick={() => onDelete(a.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded
                  cursor-pointer hover:bg-red-700 transition-colors"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}

          {appointments.length === 0 && (
            <tr>
              <td colSpan="6" className="p-4 text-center text-gray-600">
                No se encontraron turnos.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
