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
      console.log(data);

      if (!res.ok) throw new Error(data.message || "Error al iniciar sesión");

      // Si todo sale bien, guardamos token y usuario en el contexto
      login(data.token, data.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-pink-600 mb-6">
          Iniciar Sesión
        </h2>

        <label className="block mb-2 font-semibold text-gray-700">Usuario</label>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          value={formData.username}
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-pink-400 outline-none"
          required
        />

        <label className="block mb-2 font-semibold text-gray-700">
          Contraseña
        </label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          className="w-full p-2 border border-gray-300 rounded-lg mb-6 focus:ring-2 focus:ring-pink-400 outline-none"
          required
        />

        {error && (
          <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded-lg font-semibold hover:bg-pink-600 transition"
        >
          Entrar
        </button>

      </form>
    </div>
  );
}
