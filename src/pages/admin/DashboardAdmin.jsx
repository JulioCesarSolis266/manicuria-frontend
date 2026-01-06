import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import NavBarMain from "../../components/NavBarMain";

const DashboardAdmin = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <NavBarMain />

      {/* Fondo general en tono crema suave */}
      <div className="p-6 md:p-8 bg-[#EAE7DC] min-h-screen flex justify-center">
        
        {/* Contenedor centrado */}
        <div className="w-full max-w-2xl bg-white/60 shadow-md rounded-xl p-6">

          {/* Título */}
          <h1 className="text-2xl md:text-3xl font-bold text-[#5C3D2E] mb-6 text-center">
            Bienvenida, {user.username}
          </h1>

          {/* Opciones admin */}
          {user.role === "admin" && (
            <div className="flex flex-col gap-4 w-full">

              {/* Botón principal */}
              <Link
                to="/register"
                className="bg-[#5C3D2E] text-white py-3 px-4 rounded-lg 
                           hover:bg-[#8C5E4A] transition text-center w-full"
              >
                Registrar nueva usuaria
              </Link>

              {/* Botón secundario */}
              <Link
                to="/users"
                className="bg-[#C9A66B] text-white py-3 px-4 rounded-lg 
                           hover:bg-[#8C5E4A] transition text-center w-full"
              >
                Gestión de usuarias
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardAdmin;
