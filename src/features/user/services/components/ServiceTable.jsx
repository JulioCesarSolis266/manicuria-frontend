export default function ServiceTable({
  services,
  editingId,
  form,
  setForm,
  onEdit,
  onSave,
  onDelete,
  formatPrice,
}) {
  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {["Servicio", "Precio", "Duración", "Categoría", "Descripción"].map(
              (h) => (
                <th key={h} className="border-b border-gray-300 p-2 text-left">
                  {h}
                </th>
              ),
            )}
            <th className="border-b border-gray-300 p-2 text-center">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>
          {services.map((s) => (
            <tr key={s.id} className="hover:bg-gray-50">
              {editingId === s.id ? (
                <>
                  {[
                    "name",
                    "price",
                    "durationMinutes",
                    "category",
                    "description",
                  ].map((field) => (
                    <td key={field} className="border-b border-gray-300 p-2">
                      <input
                        value={form[field]}
                        onChange={(e) =>
                          setForm({ ...form, [field]: e.target.value })
                        }
                        className="w-full border px-2 py-1 rounded"
                      />
                    </td>
                  ))}

                  <td className="border-b border-gray-300 p-2 text-center">
                    <button
                      onClick={() => onSave(s.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded
    cursor-pointer hover:bg-green-700 transition-colors"
                    >
                      Guardar
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="border-b border-gray-300 p-2">{s.name}</td>
                  <td className="border-b border-gray-300 p-2">
                    {formatPrice(s.price)}
                  </td>
                  <td className="border-b border-gray-300 p-2">
                    {s.durationMinutes} min
                  </td>
                  <td className="border-b border-gray-300 p-2">
                    {s.category || "-"}
                  </td>
                  <td className="border-b border-gray-300 p-2">
                    {s.description || "Sin especificar"}
                  </td>

                  <td className="border-b border-gray-300 p-2 text-center">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => onEdit(s)}
                        className="bg-blue-600 text-white px-3 py-1 rounded
      hover:bg-blue-700 transition-colors"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => onDelete(s.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded
      hover:bg-red-700 transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
