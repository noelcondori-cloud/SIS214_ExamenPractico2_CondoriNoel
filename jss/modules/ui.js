/* ==========================================================================
   UI.JS - Utilidades de interfaz: diálogo de contacto y año del pie
   ========================================================================== */

export const initDialog = () => {
  const dialog = document.getElementById('info-dialog');
  const openButton = document.getElementById('open-dialog');
  if (!dialog || !openButton) return;

  openButton.addEventListener('click', () => dialog.showModal());

  // Cerrar al hacer clic fuera del contenido del diálogo
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
};

export const initFooterYear = () => {
  const yearElement = document.getElementById('current-year');
  if (yearElement) yearElement.textContent = new Date().getFullYear();
};
