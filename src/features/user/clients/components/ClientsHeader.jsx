export default function ClientsHeader({ search, setSearch, onCreate }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
      <h1 className="text-xl font-semibold text-center md:text-left">
        Gestión de Clientes
      </h1>

      <div className="flex-1">
        <input
          type="text"
          placeholder="Buscar por cliente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <button
        onClick={onCreate}
        className="bg-green-600 text-white px-4 py-2 rounded w-full md:w-auto hover:bg-green-700 transition-colors"
      >
        Crear Cliente
      </button>
    </div>
  );
}
