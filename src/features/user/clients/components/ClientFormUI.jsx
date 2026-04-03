const ClientFormUI = ({
  form,
  errors,
  loading,
  onChange,
  onPhoneChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white shadow-md rounded-lg p-4 md:p-6 border space-y-4"
    >
      {/* Nombre */}
      <div>
        <label className="block font-medium mb-1">Nombre</label>
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          autoFocus
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
            errors.name
              ? "border-red-500 focus:ring-red-500"
              : "focus:ring-green-500"
          }`}
        />
        {errors.name && (
          <p className="text-sm text-red-600 mt-1">{errors.name}</p>
        )}
      </div>

      {/* Apellido */}
      <div>
        <label className="block font-medium mb-1">Apellido</label>
        <input
          name="surname"
          value={form.surname}
          onChange={onChange}
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
            errors.surname
              ? "border-red-500 focus:ring-red-500"
              : "focus:ring-green-500"
          }`}
        />
        {errors.surname && (
          <p className="text-sm text-red-600 mt-1">{errors.surname}</p>
        )}
      </div>

      {/* Teléfono */}
      <div>
        <label className="block font-medium mb-1">Teléfono</label>
        <input
          name="phone"
          value={form.phone}
          onChange={onPhoneChange}
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
            errors.phone
              ? "border-red-500 focus:ring-red-500"
              : "focus:ring-green-500"
          }`}
        />
        {errors.phone && (
          <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Notas */}
      <div>
        <label className="block font-medium mb-1">Notas</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={onChange}
          rows={3}
          className="w-full border rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Botones */}
      <div className="flex flex-col-reverse md:flex-row md:justify-between gap-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="w-full md:w-auto px-4 py-2 bg-gray-500 text-white rounded"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto px-4 py-2 bg-green-600 text-white rounded disabled:opacity-70"
        >
          {loading ? "Guardando..." : "Crear Cliente"}
        </button>
      </div>
    </form>
  );
};

export default ClientFormUI;
