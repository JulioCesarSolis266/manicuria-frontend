import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function AppointmentListMobile({
  appointments,
  statusMap,
  onEdit,
  onDelete,
}) {
  // 🔹 Agrupar por día (local, sin problemas de TZ)
  const grouped = appointments.reduce((acc, appt) => {
    const d = new Date(appt.date);

    const dateKey = d.toLocaleDateString("sv-SE"); // YYYY-MM-DD

    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(appt);

    return acc;
  }, {});

  // 🔹 Ordenar días DESC (más recientes arriba)
  const sortedDays = Object.keys(grouped).sort(
    (a, b) => new Date(b) - new Date(a),
  );

  if (appointments.length === 0) {
    return (
      <p className="text-center text-gray-600">No se encontraron turnos.</p>
    );
  }

  return (
    <div className="space-y-6 md:hidden">
      {sortedDays.map((day) => {
        // 🔹 FIX: construir fecha LOCAL (evita bug UTC)
        const [year, month, dayNum] = day.split("-");
        const localDate = new Date(year, month - 1, dayNum);

        return (
          <div key={day}>
            {/* 🔹 Header del día */}
            <h2 className="text-sm font-semibold mb-2 text-gray-600 capitalize">
              {format(localDate, "EEEE d MMMM", { locale: es })}
            </h2>

            <div className="space-y-3">
              {grouped[day]
                // 🔹 Orden DESC dentro del día
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((a) => (
                  <div
                    key={a.id}
                    className="border rounded-lg p-3 shadow-sm bg-white"
                  >
                    {/* 🔹 Línea principal */}
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-base">
                        {format(new Date(a.date), "HH:mm")}
                      </span>

                      <span className="text-xs px-2 py-1 rounded bg-gray-100">
                        {statusMap[a.status] || a.status}
                      </span>
                    </div>

                    {/* 🔹 Cliente */}
                    <p className="text-sm mt-1">
                      {a.client
                        ? `${a.client.name} ${a.client.surname}`
                        : "Sin cliente"}
                    </p>

                    {/* 🔹 Servicio */}
                    <p className="text-xs text-gray-600">
                      {a.service?.name || "Sin servicio"}
                    </p>

                    {/* 🔹 Descripción */}
                    {a.description && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {a.description}
                      </p>
                    )}

                    {/* 🔹 Acciones */}
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => onEdit(a.id)}
                        className="flex-1 bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700 transition-colors"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => onDelete(a.id)}
                        className="flex-1 bg-red-600 text-white px-3 py-1.5 rounded text-sm hover:bg-red-700 transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
