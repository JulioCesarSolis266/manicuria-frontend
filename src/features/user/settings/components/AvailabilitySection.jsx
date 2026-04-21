import { useAvailability } from "../hooks/useAvailability";

export default function AvailabilitySection() {
  const { data, loading, updateDay, save } = useAvailability();

  if (loading) {
    return <p className="text-gray-400">Cargando...</p>;
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-white font-medium mb-4">Horarios de atención</h2>

      {data.map((day, index) => (
        <div
          key={day.dayOfWeek}
          className="flex items-center justify-between mb-3"
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={day.isActive}
              onChange={(e) => updateDay(index, { isActive: e.target.checked })}
            />
            <span className="text-gray-200">{day.label}</span>
          </div>

          {day.isActive ? (
            <div className="flex gap-2">
              <input
                type="time"
                value={day.startTime}
                onChange={(e) =>
                  updateDay(index, { startTime: e.target.value })
                }
                className="bg-gray-700 text-white px-2 py-1 rounded"
              />
              <input
                type="time"
                value={day.endTime}
                onChange={(e) => updateDay(index, { endTime: e.target.value })}
                className="bg-gray-700 text-white px-2 py-1 rounded"
              />
            </div>
          ) : (
            <span className="text-gray-500 text-sm">No disponible</span>
          )}
        </div>
      ))}

      <button
        onClick={save}
        className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
      >
        Guardar
      </button>
    </div>
  );
}
