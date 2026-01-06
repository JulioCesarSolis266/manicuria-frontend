import { useState, useContext } from "react";
import { API_URL } from "../../config/api";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import NavBarMain from "../../components/NavBarMain";

const Register = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL.AUTH}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 👈 CORREGIDO
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        alert("Error al registrar el usuario");
        return;
      }

      setSuccess(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1800);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <NavBarMain/>
    <div className="relative p-6 max-w-md mx-auto mt-10">
      {success && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-2">Usuario creado</h3>
            <p>El usuario fue registrado exitosamente.</p>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">Registrar Usuario</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="username"
          type="text"
          placeholder="Usuario"
          className="border p-2 rounded"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          className="border p-2 rounded"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Registrar
        </button>
      </form>
    </div>
    </>
  );
};

export default Register;
