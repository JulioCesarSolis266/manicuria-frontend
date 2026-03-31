import { FaTrash, FaEdit, FaRedo, FaUserSlash } from "react-icons/fa";
import EditableField from "./EditableField";

const UserRow = ({ user, index, actions, editingUser, form, handleChange }) => {
  const isEditing = editingUser === user.id;

  return (
    <tr>
      <td className="p-3 text-center">{index + 1}</td>

      <td className="p-3 text-center">
        <EditableField
          isEditing={isEditing}
          value={isEditing ? form.name : user.name}
          name="name"
          onChange={handleChange}
        />
      </td>

      <td className="p-3 text-center">
        <EditableField
          isEditing={isEditing}
          value={isEditing ? form.surname : user.surname}
          name="surname"
          onChange={handleChange}
        />
      </td>

      <td className="p-3 text-center">
        <EditableField
          isEditing={isEditing}
          value={isEditing ? form.username : user.username}
          name="username"
          onChange={handleChange}
        />
      </td>

      <td className="p-3 text-center">
        <EditableField
          isEditing={isEditing}
          value={isEditing ? form.phone : user.phone}
          name="phone"
          onChange={handleChange}
        />
      </td>

      <td className="p-3 text-center">
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            user.isActive
              ? "bg-emerald-600/20 text-emerald-400"
              : "bg-red-600/20 text-red-400"
          }`}
        >
          {user.isActive ? "Activo" : "Desactivado"}
        </span>
      </td>

      <td className="p-3 flex justify-center gap-4">
        {isEditing ? (
          <>
            <button
              onClick={() => actions.update(user.id)}
              className="bg-emerald-600 px-3 py-1 rounded text-sm"
            >
              Guardar
            </button>

            <button
              onClick={actions.cancelEdit}
              className="bg-red-600 px-3 py-1 rounded text-sm"
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button onClick={() => actions.edit(user)} className="text-sky-400">
              <FaEdit />
            </button>

            {user.isActive ? (
              <button
                onClick={() => actions.deactivate(user.id)}
                className="text-red-400"
              >
                <FaUserSlash />
              </button>
            ) : (
              <button
                onClick={() => actions.reactivate(user.id)}
                className="text-emerald-400"
              >
                <FaRedo />
              </button>
            )}

            <button
              onClick={() => actions.delete(user.id)}
              className="text-red-600"
            >
              <FaTrash />
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default UserRow;
