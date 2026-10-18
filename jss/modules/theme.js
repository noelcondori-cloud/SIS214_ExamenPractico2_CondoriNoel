/* ==========================================================================
   THEME.JS - Conmutador de tema claro / oscuro
   Persiste la preferencia en localStorage serializando con JSON.stringify()
   y la restaura con JSON.parse() al recargar la página.
   ========================================================================== */

const STORAGE_KEY = 'cvNoelPreferencias';
const rootElement = document.documentElement;

/** Lee las preferencias guardadas (objeto) o devuelve null. */
const loadPreferences = () => {
  try {
    const rawValue = localStorage.getItem(STORAGE_KEY);
    return rawValue ? JSON.parse(rawValue) : null;
  } catch (error) {
    console.warn('No se pudieron leer las preferencias guardadas:', error);
    return null;
  }
};

/** Guarda las preferencias como texto JSON. */
const savePreferences = (preferences) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.warn('No se pudo guardar la preferencia de tema:', error);
  }
};

/** Aplica el tema en <html> y actualiza el botón y sus atributos ARIA. */
const applyTheme = (theme, button) => {
  const isDark = theme === 'dark';
  rootElement.setAttribute('data-theme', theme);

  if (!button) return;
  button.setAttribute('aria-pressed', String(isDark));
  button.setAttribute('aria-label', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
  button.querySelector('.theme-icon').textContent = isDark ? '☀️' : '🌙';
  button.querySelector('.theme-label').textContent = isDark ? 'Modo claro' : 'Modo oscuro';
};

export const initTheme = () => {
  const themeButton = document.getElementById('theme-toggle');
  const savedPreferences = loadPreferences();
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedPreferences?.theme ?? (prefersDark ? 'dark' : 'light');

  applyTheme(initialTheme, themeButton);

  themeButton?.addEventListener('click', () => {
    const nextTheme = rootElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme, themeButton);
    savePreferences({ ...savedPreferences, theme: nextTheme, updatedAt: new Date().toISOString() });
  });
};
