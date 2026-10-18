/* ==========================================================================
   FORM.JS - Formulario de contacto interactivo
   - Intercepta submit con event.preventDefault() (sin recargar la página)
   - Valida cada campo en tiempo real con el evento input
   - Usa la validación nativa de HTML5 (validity) con mensajes propios
   ========================================================================== */

/** Mensaje de error según el estado de validez nativo del campo. */
const getErrorMessage = (field) => {
  const { validity } = field;
  const label = field.dataset.label ?? 'Este campo';

  if (validity.valueMissing) {
    return field.type === 'checkbox' ? 'Debes aceptar para poder enviar.' : `${label} es obligatorio.`;
  }
  if (validity.typeMismatch) return 'Escribe un correo válido (ej. nombre@correo.com).';
  if (validity.tooShort) return `${label} debe tener al menos ${field.minLength} caracteres.`;
  if (validity.tooLong) return `${label} no puede superar ${field.maxLength} caracteres.`;
  if (validity.patternMismatch) return 'Usa un celular boliviano de 8 dígitos (ej. +591 70000000).';
  return '';
};

/** Muestra el resultado de la validación junto al campo. */
const showFieldState = (field) => {
  const message = document.getElementById(`${field.id}-message`);
  const isValid = field.checkValidity();
  const isOptionalEmpty = !field.required && field.value.trim() === '';

  field.setAttribute('aria-invalid', String(!isValid));
  field.classList.toggle('is-invalid', !isValid);
  field.classList.toggle('is-valid', isValid && !isOptionalEmpty && field.type !== 'checkbox');

  if (!message) return isValid;
  message.textContent = isValid ? (isOptionalEmpty || field.type === 'checkbox' ? '' : 'Correcto ✓') : getErrorMessage(field);
  message.className = `field-message ${isValid ? 'success' : 'error'}`;
  return isValid;
};

export const initContactForm = () => {
  const form = document.getElementById('formulario-contacto');
  const formStatus = document.getElementById('form-status');
  if (!form) return;

  const fields = [...form.querySelectorAll('.form-control, input[type="checkbox"]')];

  // Validación en tiempo real mientras el usuario escribe
  form.addEventListener('input', (event) => {
    if (fields.includes(event.target)) showFieldState(event.target);
  });
  form.addEventListener('change', (event) => {
    if (fields.includes(event.target)) showFieldState(event.target);
  });

  // Intercepción del envío
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const results = fields.map(showFieldState);
    const firstInvalid = fields.find((field) => !field.checkValidity());

    if (results.includes(false)) {
      formStatus.textContent = 'Revisa los campos marcados en rojo antes de enviar.';
      formStatus.className = 'form-status error';
      firstInvalid?.focus();
      return;
    }

    const formData = Object.fromEntries(new FormData(form));
    formStatus.textContent = `¡Gracias, ${formData.nombre.trim()}! Tu mensaje fue registrado. Te responderé en 24 a 48 horas.`;
    formStatus.className = 'form-status success';
    form.reset();
    clearStates(fields);
  });

  // Al limpiar el formulario se borran también los mensajes
  form.addEventListener('reset', () => {
    window.setTimeout(() => clearStates(fields), 0);
  });

  const clearStates = (fieldList) => {
    fieldList.forEach((field) => {
      field.classList.remove('is-invalid', 'is-valid');
      field.removeAttribute('aria-invalid');
      const message = document.getElementById(`${field.id}-message`);
      if (message) message.textContent = '';
    });
  };
};
