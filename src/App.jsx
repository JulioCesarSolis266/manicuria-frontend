import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

// Páginas
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import DashboardManicura from "./pages/manicura/DashboardManicura";
import Login from "./pages/Login";
import Register from "./pages/admin/Register";
import UserManagement from "./pages/admin/UserManagement";
import AppointmentForm from "./pages/manicura/AppointmentForm";
import EditAppointment from "./pages/manicura/EditAppointment";


const App = () => {
  const { user } = useContext(AuthContext);

  // 🔒 Rutas protegidas: hay que estar logueado
  const ProtectedRoute = ({ children }) => {
    if (!user) return <Navigate to="/" replace />;
    return children;
  };

  // 🔒 Solo admin
  const AdminRoute = ({ children }) => {
    if (!user) return <Navigate to="/" replace />;
    if (user.role !== "admin") return <Navigate to="/dashboard" replace />;
    return children;
  };

  // 🔒 Solo manicura (rol "user")
  const ManicuraRoute = ({ children }) => {
    if (!user) return <Navigate to="/" replace />;
    if (user.role !== "user") return <Navigate to="/dashboard" replace />;
    return children;
  };

  return (
    <BrowserRouter>
  <Routes>

    {/* Publica */}
    <Route
      path="/"
      element={!user ? <Login /> : <Navigate to="/dashboard" replace />}
    />

    {/* Panel general */}
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          {user && user.role === "admin" ? (
            <DashboardAdmin />
          ) : (
            <DashboardManicura />
          )}
        </ProtectedRoute>
      }
    />

    {/* Admin */}
    <Route
      path="/register"
      element={
        <AdminRoute>
          <Register />
        </AdminRoute>
      }
    />

    <Route
      path="/users"
      element={
        <AdminRoute>
          <UserManagement />
        </AdminRoute>
      }
    />

    {/* Manicura */}
    <Route
      path="/mis-turnos"
      element={
        <ManicuraRoute>
          <DashboardManicura />
        </ManicuraRoute>
      }
    />

    <Route
      path="/create-appointment"
      element={
        <ManicuraRoute>
          <AppointmentForm />
        </ManicuraRoute>
      }
    />

    <Route
      path="/edit-appointment/:id"
      element={
        <ManicuraRoute>
          <EditAppointment />
        </ManicuraRoute>
      }
    />

    {/* Default */}
    <Route path="*" element={<Navigate to="/" replace />} />

  </Routes>
</BrowserRouter>

  );
};

export default App;
