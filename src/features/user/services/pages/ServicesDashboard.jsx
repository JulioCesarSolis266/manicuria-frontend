import { useNavigate } from "react-router-dom";
import NavBarMain from "../../../../components/layout/NavBarMain";

import { useServicesManager } from "../hooks/useServicesManager";
import ServicesHeader from "../components/ServicesHeader";
import ServiceListMobile from "../components/ServiceListMobile";
import ServiceTable from "../components/ServiceTable";

export default function ServicesDashboard() {
  const navigate = useNavigate();

  const {
    services,
    loading,
    editingId,
    form,
    errors,
    setForm,
    setEditingId,
    handleEdit,
    handleSave,
    handleDelete,
  } = useServicesManager();

  const formatPrice = (price) =>
    Number(price).toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    });

  return (
    <>
      <NavBarMain />

      <div className="px-4 py-6 max-w-6xl mx-auto">
        <ServicesHeader onCreate={() => navigate("/services/create")} />

        {loading && <p>Cargando servicios...</p>}

        {!loading && (
          <>
            <ServiceListMobile
              services={services}
              editingId={editingId}
              form={form}
              errors={errors}
              setForm={setForm}
              setEditingId={setEditingId}
              onEdit={handleEdit}
              onSave={handleSave}
              onDelete={handleDelete}
              formatPrice={formatPrice}
            />

            <ServiceTable
              services={services}
              editingId={editingId}
              form={form}
              setForm={setForm}
              onEdit={handleEdit}
              onSave={handleSave}
              onDelete={handleDelete}
              formatPrice={formatPrice}
            />
          </>
        )}
      </div>
    </>
  );
}
