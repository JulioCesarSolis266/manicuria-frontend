import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Menu, X } from "lucide-react";

export default function NavBarMain() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gray-500 text-gray p-4 flex justify-between items-center relative">
      {/* Logo */}
      <h1 className="text-xl font-bold">Manicura Turnos</h1>

      {/* Botón hamburguesa (solo móvil) */}
      <button
        className="md:hidden"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* MENÚ */} 
      <div
        className={`
          flex flex-col md:flex-row md:items-center gap-4
          absolute md:static left-0 top-16 w-full md:w-auto
          bg-gray-500 md:bg-transparent p-4 md:p-0
          transition-all duration-300
          ${open ? "flex" : "hidden md:flex"}
        `}
      >
        {/* Usuario NO logueado */}
        {!user && (
          <>
            <Link onClick={() => setOpen(false)} to="/" className="hover:underline">
              Inicio
            </Link>
            <Link onClick={() => setOpen(false)} to="/" className="hover:underline">
              Login
            </Link>
          </>
        )}

        {/* Usuario ADMIN */}
        {user?.role === "admin" && (
          <>
            <Link onClick={() => setOpen(false)} to="/dashboard" className="hover:underline">
              Dashboard Admin
            </Link>
            <Link onClick={() => setOpen(false)} to="/users" className="hover:underline">
              Usuarios
            </Link>
            <Link onClick={() => setOpen(false)} to="/register" className="hover:underline">
              Agregar Usuario
            </Link>
          </>
        )}

        {/* Usuario MANICURA */}
        {user?.role === "user" && (
          <>
            <Link onClick={() => setOpen(false)} to="/dashboard" className="hover:underline">
              Mis Turnos
            </Link>
          </>
        )}

        {/* BOTÓN LOGOUT */}
        {user && (
          <button
            onClick={() => {
              logout();
              setOpen(false);
            }}
            className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded"
          >
            Cerrar sesión
          </button>
        )}
      </div>
    </nav>
  );
}
