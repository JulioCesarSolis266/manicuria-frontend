import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../auth/context/AuthContext";
import NavBarMain from "../../../../components/layout/NavBarMain";

import { useServiceForm } from "../hooks/useServiceForm";
import ServiceFormUI from "../components/ServiceFormUI";

export default function ServiceForm() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const { form, errors, loading, handleChange, handleSubmit } =
    useServiceForm(token);

  return (
    <>
      <NavBarMain />

      <ServiceFormUI
        form={form}
        errors={errors}
        loading={loading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        onCancel={() => navigate("/services")}
      />
    </>
  );
}
