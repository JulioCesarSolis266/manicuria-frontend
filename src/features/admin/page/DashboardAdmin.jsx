import NavBarMain from "../../../components/layout/NavBarMain";
import { useUsers } from "../hooks/useUsers";
import UsersTable from "../components/dashboard/UsersTable";
import UsersMobileList from "../components/dashboard/UsersMobileList";
import UserFilters from "../components/dashboard/UserFilters";
import { useNavigate } from "react-router-dom";

const DashboardAdmin = () => {
  const navigate = useNavigate();

  const {
    users,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    editingUser,
    form,
    handleChange,
    handleEdit,
    handleUpdate,
    cancelEdit,
    handleDeactivate,
    handleReactivate,
    handleDelete,
  } = useUsers();

  const actions = {
    edit: handleEdit,
    update: handleUpdate,
    cancelEdit,
    deactivate: handleDeactivate,
    reactivate: handleReactivate,
    delete: handleDelete,
  };

  return (
    <>
      <NavBarMain />

      <div className="min-h-screen bg-slate-900 text-slate-100 px-4 py-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-2xl font-semibold">Gestión de Usuarios</h1>

            <button
              onClick={() => navigate("/register")}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-md"
            >
              Crear usuario
            </button>
          </div>

          {/* FILTROS */}
          <UserFilters
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />

          <p className="text-sm text-slate-400 mb-4">
            Total de usuarios: {users.length}
          </p>

          {/* MOBILE */}
          <UsersMobileList
            users={users}
            actions={actions}
            editingUser={editingUser}
            form={form}
            handleChange={handleChange}
          />

          {/* DESKTOP */}
          <UsersTable
            users={users}
            editingUser={editingUser}
            actions={actions}
            form={form}
            handleChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};

export default DashboardAdmin;
