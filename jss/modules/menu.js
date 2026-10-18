/* ==========================================================================
   MENU.JS - Menú hamburguesa responsivo (móvil y tablet)
   Alterna la clase .is-open y muta aria-expanded (true / false).
   ========================================================================== */

const DESKTOP_QUERY = window.matchMedia('(min-width: 1025px)');

export const initMenu = () => {
  const menuButton = document.getElementById('menu-toggle');
  const navigation = document.getElementById('main-nav');
  if (!menuButton || !navigation) return;

  const setMenuState = (isOpen) => {
    navigation.classList.toggle('is-open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
  };

  // Abrir / cerrar con clic
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    setMenuState(!isOpen);
  });

  // Delegación de eventos: cerrar al elegir un enlace
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a') && !DESKTOP_QUERY.matches) {
      setMenuState(false);
    }
  });

  // Cerrar con la tecla Escape y devolver el foco al botón
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenuState(false);
      menuButton.focus();
    }
  });

  // Al pasar a escritorio el menú se reinicia (allí siempre es visible)
  DESKTOP_QUERY.addEventListener('change', () => setMenuState(false));
};
