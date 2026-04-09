import NavBarMain from "../../../../components/layout/NavBarMain";
import { useNavigate } from "react-router-dom";
import { useClients } from "../hooks/useClients";
import { useClientsManager } from "../hooks/useClientsManager";
import ClientsHeader from "../components/ClientsHeader";
import ClientsTable from "../components/ClientsTable";
import ClientsListMobile from "../components/ClientsListMobile";

export default function ClientsDashboard() {
  const navigate = useNavigate();

  const { clients, setClients, loadingClients } = useClients();

  const manager = useClientsManager(clients, setClients);

  return (
    <>
      <NavBarMain />

      <div className="px-4 py-6 max-w-6xl mx-auto">
        <ClientsHeader
          search={manager.search}
          setSearch={manager.setSearch}
          onCreate={() => navigate("/create-client")}
        />

        {loadingClients && <p className="text-center">Cargando clientes...</p>}

        {!loadingClients && (
          <>
            <ClientsTable clients={manager.filteredClients} {...manager} />
            <ClientsListMobile clients={manager.filteredClients} {...manager} />
          </>
        )}
      </div>
    </>
  );
}
