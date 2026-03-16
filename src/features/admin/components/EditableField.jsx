const EditableField = ({
  isEditing,
  value,
  name,
  error,
  onChange,
  type = "text",
}) => {
  if (!isEditing) {
    return <span>{value || "—"}</span>;
  }

  return (
    <div className="flex flex-col items-start text-white">
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-40 bg-slate-900 border border-slate-600 rounded px-2 py-1 m-2 text-left focus:outline-none focus:border-emerald-500"
      />

      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
};

export default EditableField;
