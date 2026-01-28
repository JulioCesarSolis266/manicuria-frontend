import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

// Páginas
import DashboardManicura from "./pages/manicura/DashboardManicura";
import Login from "./pages/Login";
import Register from "./pages/admin/Register";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import AppointmentForm from "./pages/manicura/AppointmentForm";
import AppointmentEdit from "./pages/manicura/AppointmentEdit";
import ServicesDashboard from "./pages/manicura/ServicesDashboard";
import ClientsDashboard from "./pages/manicura/ClientsDashboard";
import ClientForm from "./pages/manicura/ClientForm";
import ServiceForm from "./pages/manicura/ServiceForm";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { user } = useContext(AuthContext);

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
        {/* DASHBOARD MANICURA */}
        {/* ===================== */}
        <Route
          path="/dashboard"
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
              <AppointmentEdit />
            </ManicuraRoute>
          }
        />

        <Route
          path="/services"
          element={
            <ManicuraRoute>
              <ServicesDashboard />
            </ManicuraRoute>
          }
        />
        <Route
          path="/services/create"
          element={
            <ManicuraRoute>
              <ServiceForm />
            </ManicuraRoute>
          }
        />

        <Route
          path="/clients"
          element={
            <ManicuraRoute>
              <ClientsDashboard />
            </ManicuraRoute>
          }
        />

        <Route
          path="/create-client"
          element={
            <ManicuraRoute>
              <ClientForm />
            </ManicuraRoute>
          }
        />

        {/* ===================== */}
        {/* ADMIN */}
        {/* ===================== */}
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
              <DashboardAdmin />
            </AdminRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
