import { FaEdit, FaTrash, FaSave, FaRedo } from "react-icons/fa";

export default function ClientRow({
  client,
  editingId,
  form,
  errors,
  setForm,
  setEditingId,
  handleEdit,
  handleSave,
  handleDelete,
}) {
  const isEditing = editingId === client.id;

  if (isEditing) {
    return (
      <tr className="hover:bg-gray-50">
        <td className="p-2 border-b border-gray-300">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border px-2 py-1 rounded"
          />
          {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
        </td>

        <td className="p-2 border-b border-gray-300">
          <input
            value={form.surname}
            onChange={(e) => setForm({ ...form, surname: e.target.value })}
            className="w-full border px-2 py-1 rounded"
          />
        </td>

        <td className="p-2 border-b border-gray-300">
          <input
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value.replace(/\D/g, ""),
              })
            }
            className="w-full border px-2 py-1 rounded"
          />
        </td>

        <td className="p-2 border-b border-gray-300">
          <input
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="w-full border px-2 py-1 rounded"
          />
        </td>

        <td className="p-2 border-b border-gray-300">
          <div className="flex justify-center items-center gap-2 flex-nowrap">
            <button
              onClick={() => handleSave(client.id)}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center justify-center"
            >
              <FaSave />
            </button>

            <button
              onClick={() => setEditingId(null)}
              className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 flex items-center justify-center"
            >
              <FaRedo />
            </button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr className="hover:bg-gray-50">
      <td className="p-2 border-b border-gray-300">{client.name}</td>
      <td className="p-2 border-b border-gray-300">{client.surname}</td>
      <td className="p-2 border-b border-gray-300">{client.phone}</td>
      <td className="p-2 border-b border-gray-300">
        {client.notes || "Sin especificar"}
      </td>

      <td className="p-2 border-b border-gray-300">
        <div className="flex justify-center items-center gap-2 flex-wrap">
          <button
            onClick={() => handleEdit(client)}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            <FaEdit />
          </button>

          <button
            onClick={() => handleDelete(client.id)}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  );
}
