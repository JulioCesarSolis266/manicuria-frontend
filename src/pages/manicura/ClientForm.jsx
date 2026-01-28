import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import NavBarMain from "../../components/NavBarMain";
import { fetchWithAuth } from "../../services/fetchWithAuth";
import { API_URL } from "../../config/api";

export default function ClientForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    surname: "",
    phone: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "El nombre es obligatorio.";
    }
    if (!form.surname.trim()) {
      newErrors.surname = "El apellido es obligatorio.";
    }

    if (!form.phone) {
      newErrors.phone = "El teléfono es obligatorio.";
    } else if (!/^\d+$/.test(form.phone)) {
      newErrors.phone = "El teléfono debe contener solo números.";
    } else if (form.phone.length < 8) {
      newErrors.phone = "El teléfono debe tener al menos 8 dígitos.";
    } else if (form.phone.length > 15) {
      newErrors.phone = "El teléfono no puede superar los 15 dígitos.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetchWithAuth(API_URL.CLIENTS, {
        method: "POST",
        body: JSON.stringify(form),
      });

      if (!res) return;

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Error al crear cliente");
        return;
      }

      toast.success("Cliente creado correctamente");
      navigate("/clients");
    } catch (error) {
      console.error("Error creando cliente:", error);
      toast.error("Error inesperado al crear cliente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBarMain />

      <div className="px-4 py-6 md:py-10 max-w-xl mx-auto">
        <h1 className="text-xl md:text-2xl font-semibold mb-6 text-center md:text-left">
          Crear Cliente
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-4 md:p-6 border space-y-4"
        >
          {/* Nombre */}
          <div>
            <label htmlFor="name" className="block font-medium mb-1">
              Nombre
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              autoFocus
              placeholder="Ej: María López"
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-green-500"
              }`}
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Apellido */}
          <div>
            <label htmlFor="surname" className="block font-medium mb-1">
              Apellido
            </label>
            <input
              id="surname"
              name="surname"
              value={form.surname}
              onChange={handleChange}
              placeholder="Ej: López"
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.surname
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-green-500"
              }`}
            />
            {errors.surname && (
              <p className="text-sm text-red-600 mt-1">{errors.surname}</p>
            )}
          </div>

          {/* Teléfono */}
          <div>
            <label htmlFor="phone" className="block font-medium mb-1">
              Teléfono
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              onWheel={(e) => e.target.blur()}
              value={form.phone}
              onChange={(e) => {
                const onlyNumbers = e.target.value.replace(/\D/g, "");
                setForm({ ...form, phone: onlyNumbers });
                setErrors({ ...errors, phone: null });
              }}
              placeholder="Ej: 3412345678"
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.phone
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-green-500"
              }`}
            />
            {errors.phone && (
              <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Notas */}
          <div>
            <label htmlFor="notes" className="block font-medium mb-1">
              Notas
            </label>
            <textarea
              id="notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Observaciones sobre el cliente..."
              className="w-full border rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Botones */}
          <div className="flex flex-col-reverse md:flex-row md:justify-between gap-3 mt-6">
            <button
              type="button"
              onClick={() => navigate("/clients")}
              className="w-full md:w-auto px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-4 py-2 bg-green-600 text-white rounded disabled:opacity-70"
            >
              {loading ? "Guardando..." : "Crear Cliente"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
