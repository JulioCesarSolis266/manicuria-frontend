import { useScheduleSettings } from "../hooks/useScheduleSettings";

export default function ScheduleSettingsSection() {
  const { settings, updateField, save } = useScheduleSettings();

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-white font-medium mb-4">Preferencias de agenda</h2>

      <div className="flex justify-between items-center">
        <span className="text-gray-300">Turnos simultáneos</span>

        <input
          type="number"
          min={1}
          value={settings.maxConcurrentAppointments}
          onChange={(e) =>
            updateField("maxConcurrentAppointments", parseInt(e.target.value))
          }
          className="w-20 bg-gray-700 text-white px-2 py-1 rounded"
        />
      </div>

      <button
        onClick={save}
        className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
      >
        Guardar
      </button>
    </div>
  );
}
