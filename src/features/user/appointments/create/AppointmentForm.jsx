// import NavBarMain from "../../../../components/layout/NavBarMain";
// import { useClients } from "../../clients/hooks/useClients";
// import { useServices } from "../../services/hooks/useServices";
// import { useAppointmentCreate } from "./hooks/useAppointmentCreate";
// import AppointmentCreateForm from "./components/AppointmentCreateForm";

// export default function AppointmentForm() {
//   const { clients, loadingClients, errorClients } = useClients();
//   const { services, loadingServices, errorServices } = useServices();

//   const { form, setForm, loading, handleSubmit } = useAppointmentCreate();

//   return (
//     <>
//       <NavBarMain />

//       <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-100 px-4">
//         <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
//           <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
//             Crear Turno
//           </h1>

//           <AppointmentCreateForm
//             form={form}
//             setForm={setForm}
//             services={services}
//             clients={clients}
//             loadingServices={loadingServices}
//             errorServices={errorServices}
//             loadingClients={loadingClients}
//             errorClients={errorClients}
//             loading={loading}
//             onSubmit={handleSubmit}
//           />
//         </div>
//       </div>
//     </>
//   );
// }

import { useNavigate } from "react-router-dom";
import NavBarMain from "../../../../components/layout/NavBarMain";
import { useClients } from "../../clients/hooks/useClients";
import { useServices } from "../../services/hooks/useServices";
import { useAppointmentCreate } from "./hooks/useAppointmentCreate";
import AppointmentCreateForm from "./components/AppointmentCreateForm";

export default function AppointmentForm() {
  const navigate = useNavigate();
  const { clients, loadingClients, errorClients } = useClients();
  const { services, loadingServices, errorServices } = useServices();
  const { form, setForm, loading, handleSubmit } = useAppointmentCreate();

  return (
    <>
      <NavBarMain />

      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Crear Turno
          </h1>

          <AppointmentCreateForm
            form={form}
            setForm={setForm}
            services={services}
            clients={clients}
            loadingServices={loadingServices}
            errorServices={errorServices}
            loadingClients={loadingClients}
            errorClients={errorClients}
            loading={loading}
            onSubmit={handleSubmit}
            onCancel={() => navigate("/dashboard")} // 👈 pasamos la función
          />
        </div>
      </div>
    </>
  );
}
