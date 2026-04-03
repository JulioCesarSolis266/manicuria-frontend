import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = ({ formData, error, loading, onChange, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={onSubmit}>
      <label className="block mb-2 font-semibold text-slate-700">Usuario</label>
      <input
        type="text"
        name="username"
        onChange={onChange}
        value={formData.username}
        className="w-full p-2 border border-slate-100 rounded-lg mb-4 focus:ring-2 focus:ring-blue-200 outline-none"
        required
      />

      <label className="block mb-2 font-semibold text-slate-700">
        Contraseña
      </label>

      <div className="relative mb-6">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          onChange={onChange}
          value={formData.password}
          className="w-full p-2 pr-10 border border-slate-100 rounded-lg focus:ring-2 focus:ring-blue-200 outline-none"
          required
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
};

export default LoginForm;
