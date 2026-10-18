/* ==========================================================================
   MAIN.JS - Punto de entrada (módulo ES6)
   Inicializa cada funcionalidad solo si su HTML existe en la página actual.
   ========================================================================== */
import { initTheme } from './modules/theme.js';
import { initMenu } from './modules/menu.js';
import { initProjectFilter } from './modules/filter.js';
import { initContactForm } from './modules/form.js';
import { initGithubRepos } from './modules/github.js';
import { initDialog, initFooterYear } from './modules/ui.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();          // 1. Conmutador de tema con localStorage
  initMenu();           // 2. Menú hamburguesa con aria-expanded
  initProjectFilter();  // 3. Buscador en tiempo real (.filter + .map)
  initContactForm();    // 4. Formulario con preventDefault y validación en vivo
  initGithubRepos();    // 5. Fetch API + async/await a la API REST de GitHub
  initDialog();
  initFooterYear();
});
