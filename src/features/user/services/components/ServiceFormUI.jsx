export default function ServiceFormUI({
  form,
  errors,
  loading,
  handleChange,
  handleSubmit,
  onCancel,
}) {
  return (
    <div className="px-4 py-6 md:py-10 max-w-xl mx-auto">
      <h1 className="text-xl md:text-2xl font-semibold mb-6">Crear Servicio</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-4 md:p-6 border space-y-4"
      >
        {errors.general && (
          <p className="text-sm text-red-600 text-center">{errors.general}</p>
        )}

        {/* Nombre */}
        <div>
          <label className="block font-medium mb-1">Nombre</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
        </div>

        {/* Precio */}
        <div>
          <label className="block font-medium mb-1">Precio</label>
          <input
            name="price"
            inputMode="numeric"
            value={form.price}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${
              errors.price ? "border-red-500" : ""
            }`}
          />
          {errors.price && (
            <p className="text-sm text-red-600">{errors.price}</p>
          )}
        </div>

        {/* Duración */}
        <div>
          <label className="block font-medium mb-1">Duración (minutos)</label>
          <input
            name="durationMinutes"
            inputMode="numeric"
            value={form.durationMinutes}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${
              errors.durationMinutes ? "border-red-500" : ""
            }`}
          />
          {errors.durationMinutes && (
            <p className="text-sm text-red-600">{errors.durationMinutes}</p>
          )}
        </div>

        {/* Categoría */}
        <div>
          <label className="block font-medium mb-1">Categoría</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block font-medium mb-1">Descripción</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded px-3 py-2 resize-none"
          />
        </div>

        {/* Botones */}
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
            {loading ? "Guardando..." : "Crear Servicio"}
          </button>
        </div>
      </form>
    </div>
  );
}
