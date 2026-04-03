export default function ServicesHeader({ onCreate }) {
  return (
    <div className="flex flex-col md:flex-row md:justify-between gap-3 mb-4">
      <h1 className="text-xl font-semibold">Gestión de Servicios</h1>

      <button
        onClick={onCreate}
        className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-700 transition-colors"
      >
        Crear Servicio
      </button>
    </div>
  );
}
