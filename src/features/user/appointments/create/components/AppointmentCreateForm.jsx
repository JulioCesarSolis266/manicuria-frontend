export default function AppointmentCreateForm({
  form,
  setForm,
  services,
  clients,
  loadingServices,
  errorServices,
  loadingClients,
  errorClients,
  loading,
  onSubmit,
  onCancel,
}) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {/* Servicio */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-red-600">Servicio *</label>

        {loadingServices && (
          <p className="text-sm text-gray-500">Cargando servicios...</p>
        )}

        {errorServices && (
          <p className="text-sm text-red-500">{errorServices}</p>
        )}

        {!loadingServices && !errorServices && (
          <select
            required
            value={form.serviceId}
            onChange={(e) => setForm({ ...form, serviceId: e.target.value })}
            className="w-full border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Selecciona un servicio</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
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
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="w-full border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Cliente */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-red-600">Cliente *</label>

        {loadingClients && (
          <p className="text-sm text-gray-500">Cargando clientes...</p>
        )}

        {errorClients && <p className="text-sm text-red-500">{errorClients}</p>}

        {!loadingClients && !errorClients && (
          <select
            required
            value={form.clientId}
            onChange={(e) => setForm({ ...form, clientId: e.target.value })}
            className="w-full border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Selecciona un cliente</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} {c.surname}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Descripción */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="flex flex-col-reverse md:flex-row md:justify-between gap-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="w-full md:w-auto px-4 py-2 bg-gray-500 text-white rounded cursor-pointer hover:bg-gray-600 transition-colors"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto px-4 py-2 bg-green-600 text-white rounded cursor-pointer hover:bg-green-700 transition-colors disabled:opacity-70"
        >
          {loading ? "Guardando..." : "Crear Turno"}
        </button>
      </div>
    </form>
  );
}
