export default function AppointmentEditForm({
  form,
  setForm,
  services,
  loadingServices,
  errorServices,
  onSubmit,
  onCancel,
}) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 border space-y-4">
      {/* Cliente */}
      <label className="block font-medium mb-1">Cliente</label>
      <input
        type="text"
        value={form.clientName + " " + form.clientSurname}
        disabled
        className="w-full border rounded px-3 py-2 bg-gray-100 mb-4"
      />

      {/* Servicio */}
      <label className="block font-medium mb-1">Servicio</label>

      {loadingServices && <p>Cargando servicios...</p>}
      {errorServices && <p className="text-red-500">{errorServices}</p>}

      {!loadingServices && !errorServices && (
        <select
          value={form.serviceId}
          onChange={(e) => setForm({ ...form, serviceId: e.target.value })}
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

      {/* Descripción */}
      <label className="block font-medium mb-1">Descripción</label>
      <textarea
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full border rounded px-3 py-2 mb-4"
        rows={3}
      />

      {/* Fecha */}
      <label className="block font-medium mb-1">Fecha y Hora</label>
      <input
        type="datetime-local"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        className="w-full border rounded px-3 py-2 mb-4"
      />

      {/* Estado */}
      <label className="block font-medium mb-1">Estado</label>
      <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
        className="w-full border rounded px-3 py-2 mb-4"
      >
        <option value="pending">Pendiente</option>
        <option value="completed">Completado</option>
        <option value="cancelled">Cancelado</option>
      </select>

      {/* Botones */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Cancelar
        </button>

        <button
          onClick={onSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Guardar cambios
        </button>
      </div>
    </div>
  );
}
