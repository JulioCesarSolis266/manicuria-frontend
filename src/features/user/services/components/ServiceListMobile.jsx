export default function ServiceListMobile({
  services,
  editingId,
  form,
  errors,
  setForm,
  setEditingId,
  onEdit,
  onSave,
  onDelete,
  formatPrice,
}) {
  return (
    <div className="md:hidden space-y-3">
      {services.map((s) => (
        <div key={s.id} className="border rounded-lg p-4 bg-white shadow">
          {editingId === s.id ? (
            <>
              {[
                "name",
                "price",
                "durationMinutes",
                "category",
                "description",
              ].map((field) => (
                <div key={field}>
                  <input
                    value={form[field]}
                    onChange={(e) =>
                      setForm({ ...form, [field]: e.target.value })
                    }
                    className={`w-full border px-3 py-2 rounded ${
                      errors[field] ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors[field] && (
                    <p className="text-red-600 text-sm">{errors[field]}</p>
                  )}
                </div>
              ))}

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => onSave(s.id)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Guardar
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="flex-1 bg-gray-500 text-white py-2 rounded"
                >
                  Cancelar
                </button>
              </div>
            </>
          ) : (
            <>
              <p>
                <b>{s.name}</b>
              </p>
              <p>{formatPrice(s.price)}</p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => onEdit(s)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(s.id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded"
                >
                  Eliminar
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
