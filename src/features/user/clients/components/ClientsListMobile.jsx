// export default function ClientsListMobile({
//   clients,
//   editingId,
//   form,
//   errors,
//   setForm,
//   setEditingId,
//   onEdit,
//   onSave,
//   onDelete,
// }) {
//   return (
//     <div className="md:hidden space-y-3">
//       {clients.map((c) => (
//         <div key={c.id} className="border rounded-lg p-4 bg-white shadow">
//           {editingId === c.id ? (
//             <>
//               {["name", "lastname", "phone", "notes"].map((field) => (
//                 <div key={field}>
//                   <input
//                     value={form[field] || ""}
//                     onChange={(e) =>
//                       setForm({ ...form, [field]: e.target.value })
//                     }
//                     className={`w-full border px-3 py-2 rounded ${
//                       errors[field] ? "border-red-500" : "border-gray-300"
//                     }`}
//                     placeholder={field}
//                   />
//                   {errors[field] && (
//                     <p className="text-red-600 text-sm">{errors[field]}</p>
//                   )}
//                 </div>
//               ))}

//               <div className="flex gap-2 mt-3">
//                 <button
//                   onClick={() => onSave(c.id)}
//                   className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//                 >
//                   Guardar
//                 </button>
//                 <button
//                   onClick={() => setEditingId(null)}
//                   className="flex-1 bg-gray-500 text-white py-2 rounded"
//                 >
//                   Cancelar
//                 </button>
//               </div>
//             </>
//           ) : (
//             <>
//               <p>
//                 <b>
//                   {c.name} {c.lastname}
//                 </b>
//               </p>
//               <p>{c.phone}</p>
//               {c.notes && <p className="text-sm text-gray-600">{c.notes}</p>}

//               <div className="flex gap-2 mt-3">
//                 <button
//                   onClick={() => onEdit(c)}
//                   className="flex-1 bg-blue-600 text-white py-2 rounded"
//                 >
//                   Editar
//                 </button>
//                 <button
//                   onClick={() => onDelete(c.id)}
//                   className="flex-1 bg-red-600 text-white py-2 rounded"
//                 >
//                   Eliminar
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

export default function ClientsListMobile({
  clients,
  editingId,
  form,
  errors,
  setForm,
  setEditingId,
  handleEdit,
  handleSave,
  handleDelete,
}) {
  const fieldLabels = {
    name: "Nombre",
    surname: "Apellido",
    phone: "Teléfono",
    notes: "Notas",
  };

  const fields = ["name", "surname", "phone", "notes"];

  return (
    <div className="md:hidden space-y-3">
      {clients.map((c) => (
        <div key={c.id} className="border rounded-lg p-4 bg-white shadow">
          {editingId === c.id ? (
            <>
              {fields.map((field) => (
                <div key={field} className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">
                    {fieldLabels[field]}
                  </label>

                  <input
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
                  onClick={() => handleSave(c.id)}
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
              <p className="text-base font-semibold">
                {c.name} {c.surname}
              </p>

              <div className="mt-2 space-y-1">
                <p className="text-sm font-medium text-gray-700">
                  Teléfono: <span className="font-normal">{c.phone}</span>
                </p>

                {c.notes && (
                  <p className="text-sm font-medium text-gray-700">
                    Notas: <span className="font-normal">{c.notes}</span>
                  </p>
                )}
              </div>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEdit(c)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
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
