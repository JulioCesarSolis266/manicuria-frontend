import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import NavBarMain from "../../components/NavBarMain";
import toast from "react-hot-toast"; // ✅ Importamos toast
import { API_URL } from "../../config/api";
import { fetchWithAuth } from "../../services/fetchWithAuth";

export default function ServiceForm() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    durationMinutes: "",
    category: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "El nombre es obligatorio";
    if (!form.price || Number(form.price) <= 0) newErrors.price = "El precio debe ser mayor a 0";
    if (!form.durationMinutes || Number(form.durationMinutes) < 5) newErrors.durationMinutes = "Mínimo 5 minutos";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const cleanValue = name === "price" || name === "durationMinutes" ? value.replace(/\D/g, "") : value;
    setForm({ ...form, [name]: cleanValue });
    setErrors({ ...errors, [name]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetchWithAuth(API_URL.SERVICES, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: form.name,
          price: Number(form.price),
          durationMinutes: Number(form.durationMinutes),
          category: form.category.trim() || "",
          description: form.description.trim() || "",
        }),
      });

      if (!res) return;

      const data = await res.json();

      if (!res.ok) {
        // ✅ Mostramos error del backend con toast
        toast.error(data.message || "Error al crear servicio");
        return;
      }

      toast.success("Servicio creado correctamente"); // ✅ Toast de éxito
      navigate("/services");
    } catch (error) {
      console.error("Error creando servicio:", error);
      toast.error("Error inesperado al crear servicio"); // ✅ Toast de error inesperado
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBarMain />

      <div className="px-4 py-6 md:py-10 max-w-xl mx-auto">
        <h1 className="text-xl md:text-2xl font-semibold mb-6">Crear Servicio</h1>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4 md:p-6 border space-y-4">
          {/* Mensaje general de error opcional inline */}
          {errors.general && <p className="text-sm text-red-600 text-center">{errors.general}</p>}

          {/* Campos */}
          <div>
            <label className="block font-medium mb-1">Nombre</label>
            <input name="name" value={form.name} onChange={handleChange} className={`w-full border rounded px-3 py-2 ${errors.name ? "border-red-500" : ""}`} />
            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Precio</label>
            <input name="price" inputMode="numeric" value={form.price} onChange={handleChange} className={`w-full border rounded px-3 py-2 ${errors.price ? "border-red-500" : ""}`} />
            {errors.price && <p className="text-sm text-red-600">{errors.price}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Duración (minutos)</label>
            <input name="durationMinutes" inputMode="numeric" value={form.durationMinutes} onChange={handleChange} className={`w-full border rounded px-3 py-2 ${errors.durationMinutes ? "border-red-500" : ""}`} />
            {errors.durationMinutes && <p className="text-sm text-red-600">{errors.durationMinutes}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Categoría</label>
            <input name="category" value={form.category} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block font-medium mb-1">Descripción</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="w-full border rounded px-3 py-2 resize-none" />
          </div>

          {/* Botones */}
          <div className="flex flex-col-reverse md:flex-row md:justify-between gap-3 mt-6">
            <button type="button" onClick={() => navigate("/services")} className="w-full md:w-auto px-4 py-2 bg-gray-500 text-white rounded cursor-pointer hover:bg-gray-600 transition-colors">Cancelar</button>
            <button type="submit" disabled={loading} className="w-full md:w-auto px-4 py-2 bg-green-600 text-white rounded cursor-pointer hover:bg-green-700 transition-colors disabled:opacity-70">
              {loading ? "Guardando..." : "Crear Servicio"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
