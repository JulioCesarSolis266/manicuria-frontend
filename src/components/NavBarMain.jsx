import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Menu, X } from "lucide-react";

export default function NavBarMain() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-lg md:text-xl font-semibold text-white tracking-tight">
          Manicura Turnos
        </h1>

        {/* Botón hamburguesa (solo móvil) */}
        <button
          className="md:hidden text-gray-200"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* MENÚ */}
        <div
          className={`
            flex flex-col md:flex-row md:items-center gap-4
            absolute md:static left-0 top-full w-full md:w-auto
            bg-gray-900 md:bg-transparent px-4 py-4 md:p-0
            border-t border-gray-800 md:border-0
            transition-all duration-200
            ${open ? "flex" : "hidden md:flex"}
          `}
        >
          {/* Usuario NO logueado */}
          {!user && (
            <>
              <Link
                onClick={() => setOpen(false)}
                to="/"
                className="text-gray-300 hover:text-white transition"
              >
                Inicio
              </Link>
              <Link
                onClick={() => setOpen(false)}
                to="/"
                className="text-gray-300 hover:text-white transition"
              >
                Login
              </Link>
            </>
          )}

          {/* Usuario ADMIN: solo botón de cerrar sesión */}
          {user?.role === "admin" && (
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="
                mt-2 md:mt-0
                bg-red-600 text-white
                hover:bg-red-700
                px-4 py-2 rounded-md
                text-sm font-semibold
                transition
                border border-red-500
              "
            >
              Cerrar sesión
            </button>
          )}

          {/* Usuario MANICURA */}
          {user?.role === "user" && (
            <>
              <Link
                onClick={() => setOpen(false)}
                to="/mis-turnos"
                className="text-gray-300 hover:text-white transition"
              >
                Mis Turnos
              </Link>

              <Link
                onClick={() => setOpen(false)}
                to="/services"
                className="text-gray-300 hover:text-white transition"
              >
                Servicios
              </Link>

              <Link
                onClick={() => setOpen(false)}
                to="/clients"
                className="text-gray-300 hover:text-white transition"
              >
                Clientes
              </Link>

              {/* Logout para manicura (estilo neutro) */}
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="
                  mt-2 md:mt-0
                  bg-gray-700 text-white
                  hover:bg-gray-600
                  px-4 py-2 rounded-md
                  text-sm font-medium
                  transition
                "
              >
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
