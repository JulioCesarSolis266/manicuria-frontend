// Este componente protege las turas y esta importado en App.jsx. Si el usuario no esta logueado o no tiene el rol necesario, lo redirige a login o dashboard respectivamente.
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../features/auth/context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/dashboard" />;

  return children;
};

export default ProtectedRoute;
