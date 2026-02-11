import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { API_URL } from "../config/api";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`${API_URL.AUTH}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Error al iniciar sesión");

      // Si todo sale bien, guardamos token y usuario en el contexto
      login(data.token, data.user);
    } catch (err) {
      setError(err.message);
    }
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-slate-100 px-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full items-center">

      {/* Lado izquierdo */}
      <div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
          Gestión de turnos simple y eficiente
        </h1>
        <p className="text-slate-600 text-lg mb-6">
          Centraliza reservas, organiza tu agenda y optimiza la atención a tus clientes
          desde una única plataforma.
        </p>

        <ul className="space-y-3 text-slate-600">
          <li>✔ Administración de reservas</li>
          <li>✔ Control de disponibilidad</li>
          <li>✔ Gestión de clientes</li>
        </ul>
      </div>

      {/* Lado derecho */}
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-semibold text-slate-700">
            Usuario
          </label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={formData.username}
            className="w-full p-2 border border-slate-100 rounded-lg mb-4 focus:ring-2 focus:ring-blue-200 outline-none"
            required
          />

          <label className="block mb-2 font-semibold text-slate-700">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            className="w-full p-2 border border-slate-100 rounded-lg mb-6 focus:ring-2 focus:ring-blue-200 outline-none"
            required
          />

          {error && (
            <p className="text-red-500 text-center mb-4 font-medium">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>
      </div>

    </div>
  </div>
);


}
