import NavBarMain from "../../../components/layout/NavBarMain";
import RegisterForm from "../components/register/RegisterForm";
import { useRegister } from "../hooks/useRegister";

const Register = () => {
  const {
    form,
    formErrors,
    loading,
    handleChange,
    handleSubmit,
    handleCancel,
  } = useRegister();

  return (
    <>
      <NavBarMain />

      <div className="relative min-h-[calc(100vh-64px)] bg-gray-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-white">
            Registrar Usuario
          </h2>

          <RegisterForm
            form={form}
            formErrors={formErrors}
            loading={loading}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </>
  );
};

export default Register;
