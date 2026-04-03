import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./features/auth/context/AuthContext";
import ProtectedRoute from "./components/routing/ProtectedRoute";

// Páginas
import DashboardUser from "./features/user/dashboard/DashboardUser";
import Login from "./features/auth/Login";
import Register from "./features/admin/page/Register";
import DashboardAdmin from "./features/admin/page/DashboardAdmin";
import AppointmentForm from "./features/user/appointments/create/AppointmentForm";
import AppointmentEdit from "./features/user/appointments/edit/AppointmentEdit";
import ServicesDashboard from "./features/user/services/ServicesDashboard";
import ClientsDashboard from "./features/user/clients/pages/ClientsDashboard";
import ClientForm from "./features/user/clients/pages/ClientForm";
import ServiceForm from "./features/user/services/ServiceForm";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1f2933",
            color: "#e5e7eb",
            border: "1px solid #374151",
          },
        }}
      />
      <Routes>
        {/* Pública / Login */}
        <Route
          path="/"
          element={
            !user ? (
              <Login />
            ) : user.role === "admin" ? (
              <Navigate to="/users" replace />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        {/* ===================== */}
        {/* DASHBOARD User */}
        {/* ===================== */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="user">
              <DashboardUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-appointment"
          element={
            <ProtectedRoute role="user">
              <AppointmentForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-appointment/:id"
          element={
            <ProtectedRoute role="user">
              <AppointmentEdit />
            </ProtectedRoute>
          }
        />

        <Route
          path="/services"
          element={
            <ProtectedRoute role="user">
              <ServicesDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/services/create"
          element={
            <ProtectedRoute role="user">
              <ServiceForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/clients"
          element={
            <ProtectedRoute role="user">
              <ClientsDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-client"
          element={
            <ProtectedRoute role="user">
              <ClientForm />
            </ProtectedRoute>
          }
        />

        {/* ===================== */}
        {/* ADMIN */}
        {/* ===================== */}
        <Route
          path="/register"
          element={
            <ProtectedRoute role="admin">
              <Register />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute role="admin">
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />

        {/* Fallback para redirigir a la página de inicio si la ruta no existe */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
