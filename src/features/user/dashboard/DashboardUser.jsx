import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext";
import NavBarMain from "../../../components/layout/NavBarMain";

import { useAppointments } from "./hooks/useAppointments";
import { useAppointmentsManager } from "./hooks/useAppointmentsManager";

import AppointmentFilters from "./components/AppointmentFilters";
import AppointmentListMobile from "./components/AppointmentListMobile";
import AppointmentTable from "./components/AppointmentTable";
import AppointmentCalendar from "./components/AppointmentCalendar";

export default function DashboardUser() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [view, setView] = useState("calendar");

  const { appointments, setAppointments, loadingAppointments } =
    useAppointments();

  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    statusMap,
    filteredAppointments,
    handleDelete,
  } = useAppointmentsManager(appointments, setAppointments);

  // ✅ FIX: evitar calendario en mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && view === "calendar") {
        setView("list");
      }
    };

    handleResize(); // al montar
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [view]);

  return (
    <>
      <NavBarMain />

      <div className="p-4 md:p-6">
        <h1 className="text-lg md:text-xl font-semibold mb-4 text-center md:text-left">
          Hola {user?.username || "Manicurista"}
        </h1>

        <AppointmentFilters
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onCreate={() => navigate("/create-appointment")}
        />

        {/* 🔹 Botones vista (solo desktop) */}
        <div className="hidden md:flex gap-2 mb-4">
          <button
            onClick={() => setView("calendar")}
            className={`px-4 py-2 rounded transition-colors ${
              view === "calendar"
                ? "bg-green-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Calendario
          </button>

          <button
            onClick={() => setView("list")}
            className={`px-4 py-2 rounded transition-colors ${
              view === "list"
                ? "bg-green-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Lista
          </button>
        </div>

        {loadingAppointments && (
          <p className="text-center">Cargando turnos...</p>
        )}

        {!loadingAppointments && (
          <>
            {/* 🔹 Calendario (solo desktop) */}
            {view === "calendar" && (
              <div className="hidden md:block">
                <AppointmentCalendar appointments={filteredAppointments} />
              </div>
            )}

            {/* 🔹 Lista */}
            {view === "list" && (
              <>
                {/* Mobile */}
                <div className="md:hidden">
                  <AppointmentListMobile
                    appointments={filteredAppointments}
                    statusMap={statusMap}
                    onEdit={(id) => navigate(`/edit-appointment/${id}`)}
                    onDelete={handleDelete}
                  />
                </div>

                {/* Desktop */}
                <div className="hidden md:block">
                  <AppointmentTable
                    appointments={filteredAppointments}
                    statusMap={statusMap}
                    onEdit={(id) => navigate(`/edit-appointment/${id}`)}
                    onDelete={handleDelete}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
