import NavBarMain from "../../../../components/layout/NavBarMain";
import ClientFormUI from "../components/ClientFormUI";
import { useClientForm } from "../hooks/useClientForm";

export default function ClientForm() {
  const {
    form,
    errors,
    loading,
    handleChange,
    handlePhoneChange,
    handleSubmit,
    handleCancel,
  } = useClientForm();

  return (
    <>
      <NavBarMain />

      <div className="px-4 py-6 md:py-10 max-w-xl mx-auto">
        <h1 className="text-xl md:text-2xl font-semibold mb-6 text-center md:text-left">
          Crear Cliente
        </h1>

        <ClientFormUI
          form={form}
          errors={errors}
          loading={loading}
          onChange={handleChange}
          onPhoneChange={handlePhoneChange}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </>
  );
}
