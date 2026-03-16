// ===============================
// ✅ Validaciones
// ===============================
export const validateForm = (form) => {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "El nombre es obligatorio";
  } else if (form.name.trim().length < 3) {
    errors.name = "El nombre debe tener al menos 3 caracteres";
  }
  if (!form.surname.trim()) {
    errors.surname = "El apellido es obligatorio";
  } else if (form.surname.trim().length < 3) {
    errors.surname = "El apellido debe tener al menos 3 caracteres";
  }

  if (!form.username.trim()) {
    errors.username = "El nombre de usuario es obligatorio";
  } else if (form.username.trim().length < 3) {
    errors.username = "Debe tener al menos 3 caracteres";
  }

  if (!form.phone) {
    errors.phone = "El teléfono es obligatorio";
  } else if (!/^\d+$/.test(form.phone)) {
    errors.phone = "Solo números";
  } else if (form.phone.length < 8) {
    errors.phone = "Mínimo 8 dígitos";
  } else if (form.phone.length > 15) {
    errors.phone = "Máximo 15 dígitos";
  }

  return Object.keys(errors).length === 0;
};
