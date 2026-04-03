import { FaTrash, FaRedo, FaUserSlash, FaEdit } from "react-icons/fa";
import EditableField from "./EditableField";

const UsersMobileList = ({
  users,
  actions,
  editingUser,
  form,
  handleChange,
}) => {
  return (
    <div className="md:hidden space-y-4">
      {users.map((u, index) => {
        const isEditing = editingUser === u.id;

        return (
          <div key={u.id} className="bg-slate-800 rounded-lg p-4">
            <div className="flex justify-between mb-2">
              <span className="text-xs text-slate-400">{index + 1}</span>

              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  u.isActive
                    ? "bg-emerald-600/20 text-emerald-400"
                    : "bg-red-600/20 text-red-400"
                }`}
              >
                {u.isActive ? "Activo" : "Desactivado"}
              </span>
            </div>

            <div className="text-xs py-1 text-slate-400">
              <b>Nombre:</b>{" "}
              <EditableField
                isEditing={isEditing}
                value={isEditing ? form.name : u.name}
                name="name"
                onChange={handleChange}
              />
            </div>

            <div className="text-xs py-1 text-slate-400">
              <b>Apellido:</b>{" "}
              <EditableField
                isEditing={isEditing}
                value={isEditing ? form.surname : u.surname}
                name="surname"
                onChange={handleChange}
              />
            </div>

            <div className="text-xs py-1 text-slate-400">
              <b>Usuario:</b>{" "}
              <EditableField
                isEditing={isEditing}
                value={isEditing ? form.username : u.username}
                name="username"
                onChange={handleChange}
              />
            </div>

            <div className="text-xs py-1 text-slate-400">
              <b>Teléfono:</b>{" "}
              <EditableField
                isEditing={isEditing}
                value={isEditing ? form.phone : u.phone}
                name="phone"
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-end gap-4 mt-4">
              {isEditing ? (
                <>
                  <button
                    onClick={() => actions.update(u.id)}
                    className="text-emerald-400"
                  >
                    Guardar
                  </button>

                  <button onClick={actions.cancelEdit} className="text-red-400">
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => actions.edit(u)}
                    className="text-sky-400"
                  >
                    <FaEdit />
                  </button>

                  {u.isActive ? (
                    <button
                      onClick={() => actions.deactivate(u.id)}
                      className="text-red-400"
                    >
                      <FaUserSlash />
                    </button>
                  ) : (
                    <button
                      onClick={() => actions.reactivate(u.id)}
                      className="text-emerald-400"
                    >
                      <FaRedo />
                    </button>
                  )}

                  <button
                    onClick={() => actions.delete(u.id)}
                    className="text-red-600"
                  >
                    <FaTrash />
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UsersMobileList;
