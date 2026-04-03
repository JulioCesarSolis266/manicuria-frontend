export default function AppointmentFilters({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  onCreate,
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <button
          onClick={onCreate}
          className="bg-green-600 text-white px-4 py-2 rounded-md
          hover:bg-green-700 transition-colors w-full md:w-auto"
        >
          + Crear Turno
        </button>

        <div className="flex-1">
          <input
            type="text"
            placeholder="Buscar por cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border px-4 py-2 rounded-md
            focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded-md w-full md:w-auto
          focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="pending">Pendientes</option>
          <option value="completed">Completados</option>
          <option value="cancelled">Cancelados</option>
          <option value="all">Todos</option>
        </select>
      </div>
    </div>
  );
}
