import ClientRow from "./ClientRow";

export default function ClientsTable(props) {
  const { clients } = props;

  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full border-collapse min-w-[900px]">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2 border-b border-gray-300">Nombre</th>
            <th className="p-2 border-b border-gray-300">Apellido</th>
            <th className="p-2 border-b border-gray-300">Teléfono</th>
            <th className="p-2 border-b border-gray-300">Notas</th>
            <th className="p-2 border-b border-gray-300 text-center">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>
          {clients.map((c) => (
            <ClientRow key={c.id} client={c} {...props} />
          ))}

          {clients.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No hay clientes cargados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
