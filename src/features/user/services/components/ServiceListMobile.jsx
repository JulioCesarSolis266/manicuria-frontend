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
  const fieldLabels = {
    name: "Nombre",
    price: "Precio",
    durationMinutes: "Duración (minutos)",
    category: "Categoría",
    description: "Descripción",
  };

  const fields = [
    "name",
    "price",
    "durationMinutes",
    "category",
    "description",
  ];

  return (
    <div className="md:hidden space-y-3">
      {services.map((s) => (
        <div key={s.id} className="border rounded-lg p-4 bg-white shadow">
          {editingId === s.id ? (
            <>
              {fields.map((field) => (
                <div key={field} className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">
                    {fieldLabels[field]}
                  </label>

                  <input
                    type={
                      field === "price" || field === "durationMinutes"
                        ? "number"
                        : "text"
                    }
                    value={form[field] || ""}
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
              <p className="text-base font-semibold">{s.name}</p>

              <div className="mt-2 space-y-1">
                <p className="text-sm font-medium text-gray-700">
                  Precio:{" "}
                  <span className="font-normal">{formatPrice(s.price)}</span>
                </p>

                <p className="text-sm font-medium text-gray-700">
                  Duración:{" "}
                  <span className="font-normal">{s.durationMinutes} min</span>
                </p>

                {s.category && (
                  <p className="text-sm font-medium text-gray-700">
                    Categoría: <span className="font-normal">{s.category}</span>
                  </p>
                )}

                {s.description && (
                  <p className="text-sm font-medium text-gray-700">
                    Descripción:{" "}
                    <span className="font-normal">{s.description}</span>
                  </p>
                )}
              </div>

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
