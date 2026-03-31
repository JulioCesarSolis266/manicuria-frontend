import UserRow from "./UserRow";
const UsersTable = ({ users, actions, editingUser, form, handleChange }) => {
  return (
    <div className="hidden md:block">
      <table className="w-full bg-slate-800 rounded-lg overflow-hidden">
        <thead className="bg-slate-700">
          <tr>
            <th className="p-3">#</th>
            <th className="p-3">Nombre</th>
            <th className="p-3">Apellido</th>
            <th className="p-3">Usuario</th>
            <th className="p-3">Teléfono</th>
            <th className="p-3">Estado</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u, index) => (
            <UserRow
              key={u.id}
              user={u}
              index={index}
              actions={actions}
              editingUser={editingUser}
              form={form}
              handleChange={handleChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
