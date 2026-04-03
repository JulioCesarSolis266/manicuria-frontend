import LoginForm from "./components/LoginForm";
import { useLogin } from "./hooks/useLogin";

export default function Login() {
  const { formData, error, loading, handleChange, handleSubmit } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full items-center">
        {/* Lado izquierdo */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
            Gestión de turnos simple y eficiente
          </h1>
          <p className="text-slate-600 text-lg mb-6">
            Centraliza reservas, organiza tu agenda y optimiza la atención a tus
            clientes desde una única plataforma.
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

          <LoginForm
            formData={formData}
            error={error}
            loading={loading}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
