import { useParams, useNavigate } from "react-router-dom";
import NavBarMain from "../../../../components/layout/NavBarMain";
import Footer from "../../../../components/layout/Footer";
import { useServices } from "../../services/hooks/useServices";
import { useAppointmentEdit } from "./hooks/useAppointmentEdit";
import AppointmentEditForm from "./components/AppointmentEditForm";

export default function AppointmentEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { services, loadingServices, errorServices } = useServices();

  const { form, setForm, loading, appointment, handleUpdate } =
    useAppointmentEdit(id, navigate);

  if (loading) return <p className="p-6">Cargando turno...</p>;
  if (!appointment) return <p className="p-6">No se encontró el turno.</p>;

  return (
    <>
      <NavBarMain />

      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Editar Turno</h1>

        <AppointmentEditForm
          form={form}
          setForm={setForm}
          services={services}
          loadingServices={loadingServices}
          errorServices={errorServices}
          onSubmit={handleUpdate}
          onCancel={() => navigate("/mis-turnos")}
        />
      </div>

      <Footer />
    </>
  );
}
