const RegisterForm = ({
  form,
  formErrors,
  loading,
  onChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {/* Name */}
      <div>
        <input
          name="name"
          type="text"
          placeholder="Nombre"
          value={form.name}
          onChange={onChange}
          className={`bg-gray-800 text-white border p-2 rounded w-full focus:outline-none ${
            formErrors.name
              ? "border-red-600"
              : "border-gray-700 focus:border-gray-500"
          }`}
        />
        {formErrors.name && (
          <p className="text-xs text-red-400 mt-1">{formErrors.name}</p>
        )}
      </div>

      {/* Surname */}
      <div>
        <input
          name="surname"
          type="text"
          placeholder="Apellido"
          value={form.surname}
          onChange={onChange}
          className={`bg-gray-800 text-white border p-2 rounded w-full focus:outline-none ${
            formErrors.surname
              ? "border-red-600"
              : "border-gray-700 focus:border-gray-500"
          }`}
        />
        {formErrors.surname && (
          <p className="text-xs text-red-400 mt-1">{formErrors.surname}</p>
        )}
      </div>

      {/* Username */}
      <div>
        <input
          name="username"
          type="text"
          placeholder="Usuario"
          value={form.username}
          onChange={onChange}
          className={`bg-gray-800 text-white border p-2 rounded w-full focus:outline-none ${
            formErrors.username
              ? "border-red-600"
              : "border-gray-700 focus:border-gray-500"
          }`}
        />
        {formErrors.username && (
          <p className="text-xs text-red-400 mt-1">{formErrors.username}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <input
          name="phone"
          type="text"
          placeholder="Teléfono"
          value={form.phone}
          onChange={onChange}
          className={`bg-gray-800 text-white border p-2 rounded w-full focus:outline-none ${
            formErrors.phone
              ? "border-red-600"
              : "border-gray-700 focus:border-gray-500"
          }`}
        />
        {formErrors.phone && (
          <p className="text-xs text-red-400 mt-1">{formErrors.phone}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={onChange}
          className={`bg-gray-800 text-white border p-2 rounded w-full focus:outline-none ${
            formErrors.password
              ? "border-red-600"
              : "border-gray-700 focus:border-gray-500"
          }`}
        />
        {formErrors.password && (
          <p className="text-xs text-red-400 mt-1">{formErrors.password}</p>
        )}
        <p className="text-xs text-gray-400 mt-1">Mínimo 8 caracteres</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-emerald-600 text-white h-10 rounded-md hover:bg-emerald-700 transition font-medium disabled:opacity-50"
        >
          {loading ? "Creando..." : "Crear usuario"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-700 text-white h-10 rounded-md hover:bg-gray-600 transition font-medium"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
