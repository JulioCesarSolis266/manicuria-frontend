import { FaSearch } from "react-icons/fa";

const UserFilters = ({ search, setSearch, statusFilter, setStatusFilter }) => {
  return (
    <div className="mb-4 flex items-center gap-2">
      <FaSearch className="text-slate-400" />

      <input
        type="text"
        placeholder="Buscar usuario..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 w-full max-w-xs text-sm"
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300"
      >
        <option value="active">Activos</option>
        <option value="inactive">Desactivados</option>
        <option value="all">Todos</option>
      </select>
    </div>
  );
};

export default UserFilters;
