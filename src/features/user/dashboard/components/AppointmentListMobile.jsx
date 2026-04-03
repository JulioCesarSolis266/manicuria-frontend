export default function AppointmentListMobile({
  appointments,
  statusMap,
  onEdit,
  onDelete,
}) {
  return (
    <div className="space-y-4 md:hidden">
      {appointments.map((a) => (
        <div key={a.id} className="border rounded-lg p-4 shadow-sm bg-white">
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
              onClick={() => onEdit(a.id)}
              className="flex-1 bg-blue-600 text-white px-3 py-2 rounded
              cursor-pointer hover:bg-blue-700 transition-colors"
            >
              Editar
            </button>

            <button
              onClick={() => onDelete(a.id)}
              className="flex-1 bg-red-600 text-white px-3 py-2 rounded
              cursor-pointer hover:bg-red-700 transition-colors"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}

      {appointments.length === 0 && (
        <p className="text-center text-gray-600">No se encontraron turnos.</p>
      )}
    </div>
  );
}
