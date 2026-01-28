import { useState } from "react";
import { API_URL } from "../../config/api";
import { useNavigate } from "react-router-dom";
import NavBarMain from "../../components/NavBarMain";
import { fetchWithAuth } from "../../services/fetchWithAuth";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    surname: "",
    username: "",
    phone: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});

  // ===============================
  // 🧠 Handle change
  // ===============================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  // ===============================
  // ✅ Validaciones
  // ===============================
  const validateForm = () => {
    const errors = {};

    // Name
    if (!form.name.trim()) {
      errors.name = "El nombre es obligatorio.";
    } else if (form.name.trim().length < 3) {
      errors.name = "Debe tener al menos 3 caracteres.";
    }

    // Surname
    if (!form.surname.trim()) {
      errors.surname = "El apellido es obligatorio.";
    }

    // Username
    if (!form.username.trim()) {
      errors.username = "El nombre de usuario es obligatorio.";
    } else if (form.username.trim().length < 3) {
      errors.username = "Debe tener al menos 3 caracteres.";
    }

    // Phone
    if (!form.phone.trim()) {
      errors.phone = "El teléfono es obligatorio.";
    } else if (!/^\d+$/.test(form.phone)) {
      errors.phone = "El teléfono debe contener solo números.";
    } else if (form.phone.length < 8) {
      errors.phone = "Debe tener al menos 8 dígitos.";
    } else if (form.phone.length > 15) {
      errors.phone = "No puede superar los 15 dígitos.";
    }

    // Password
    if (!form.password) {
      errors.password = "La contraseña es obligatoria.";
    } else if (form.password.length < 6) {
      errors.password = "Debe tener al menos 6 caracteres.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ===============================
  // 💾 Submit
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Revisá los campos del formulario");
      return;
    }

    const res = await fetchWithAuth(`${API_URL.AUTH}/register`, {
      method: "POST",
      body: JSON.stringify({
        name: form.name.trim(),
        surname: form.surname.trim(),
        username: form.username.trim(),
        phone: form.phone.trim(),
        password: form.password,
      }),
    });

    if (!res) return;

    const data = await res.json();

    if (!res.ok) {
      toast.error(data?.message || "Error al registrar el usuario");
      return;
    }

    toast.success("Usuario creado correctamente");

    setTimeout(() => {
      navigate("/users", { replace: true });
    }, 1200);
  };

  return (
  <>
    <NavBarMain />

    <div className="relative min-h-[calc(100vh-64px)] bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-white">
          Registrar Usuario
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <div>
            <input
              name="name"
              type="text"
              placeholder="Nombre"
              value={form.name}
              onChange={handleChange}
              className={`bg-gray-800 text-white border p-2 rounded w-full focus:outline-none ${
                formErrors.name
                  ? "border-red-600"
                  : "border-gray-700 focus:border-gray-500"
              }`}
            />
            {formErrors.name && (
              <p className="text-xs text-red-400 mt-1">
                {formErrors.name}
              </p>
            )}
          </div>

          {/* Surname */}
          <div>
            <input
              name="surname"
              type="text"
              placeholder="Apellido"
              value={form.surname}
              onChange={handleChange}
              className={`bg-gray-800 text-white border p-2 rounded w-full focus:outline-none ${
                formErrors.surname
                  ? "border-red-600"
                  : "border-gray-700 focus:border-gray-500"
              }`}
            />
            {formErrors.surname && (
              <p className="text-xs text-red-400 mt-1">
                {formErrors.surname}
              </p>
            )}
          </div>

          {/* Username */}
          <div>
            <input
              name="username"
              type="text"
              placeholder="Usuario"
              value={form.username}
              onChange={handleChange}
              className={`bg-gray-800 text-white border p-2 rounded w-full focus:outline-none ${
                formErrors.username
                  ? "border-red-600"
                  : "border-gray-700 focus:border-gray-500"
              }`}
            />
            {formErrors.username && (
              <p className="text-xs text-red-400 mt-1">
                {formErrors.username}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              name="phone"
              type="text"
              placeholder="Teléfono"
              value={form.phone}
              onChange={handleChange}
              className={`bg-gray-800 text-white border p-2 rounded w-full focus:outline-none ${
                formErrors.phone
                  ? "border-red-600"
                  : "border-gray-700 focus:border-gray-500"
              }`}
            />
            {formErrors.phone && (
              <p className="text-xs text-red-400 mt-1">
                {formErrors.phone}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              name="password"
              type="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              className={`bg-gray-800 text-white border p-2 rounded w-full focus:outline-none ${
                formErrors.password
                  ? "border-red-600"
                  : "border-gray-700 focus:border-gray-500"
              }`}
            />
            {formErrors.password && (
              <p className="text-xs text-red-400 mt-1">
                {formErrors.password}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button
              type="submit"
              className="flex-1 bg-emerald-600 text-white h-10 rounded-md hover:bg-emerald-700 transition font-medium"
            >
              Crear usuario
            </button>

            <button
              type="button"
              onClick={() => navigate("/users")}
              className="flex-1 bg-gray-700 text-white h-10 rounded-md hover:bg-gray-600 transition font-medium"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
)

};

export default Register;
