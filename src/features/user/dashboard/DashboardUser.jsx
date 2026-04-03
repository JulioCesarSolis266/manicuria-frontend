import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext";
import NavBarMain from "../../../components/layout/NavBarMain";

import { useAppointments } from "./hooks/useAppointments";
import { useAppointmentsManager } from "./hooks/useAppointmentsManager";

import AppointmentFilters from "./components/AppointmentFilters";
import AppointmentListMobile from "./components/AppointmentListMobile";
import AppointmentTable from "./components/AppointmentTable";

export default function DashboardUser() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

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

        {loadingAppointments && (
          <p className="text-center">Cargando turnos...</p>
        )}

        {!loadingAppointments && (
          <>
            <AppointmentListMobile
              appointments={filteredAppointments}
              statusMap={statusMap}
              onEdit={(id) => navigate(`/edit-appointment/${id}`)}
              onDelete={handleDelete}
            />

            <AppointmentTable
              appointments={filteredAppointments}
              statusMap={statusMap}
              onEdit={(id) => navigate(`/edit-appointment/${id}`)}
              onDelete={handleDelete}
            />
          </>
        )}
      </div>
    </>
  );
}
