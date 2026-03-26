import { useState } from "react";
import { API_URL } from "../../config/api";
import { useNavigate } from "react-router-dom";
import NavBarMain from "../../components/layout/NavBarMain";
import { fetchWithAuth } from "../../api/fetchWithAuth";
import toast from "react-hot-toast";
import { validateForm } from "./utils/validateForm";

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
  const [loading, setLoading] = useState(false);

  // ===============================
  // 🧠 Handle change
  // ===============================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  // ===============================
  // 💾 Submit
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      toast.error("Revisá los campos del formulario");
      setLoading(false);
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
  );
};

export default Register;
