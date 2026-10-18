/* ==========================================================================
   GITHUB.JS - Módulo asíncrono con Fetch API (async / await)
   Consume la API REST pública de GitHub para mostrar un perfil y sus repositorios.
   Estados de interfaz: idle -> loading -> success | error
   ========================================================================== */

// CONFIGURACIÓN: escribe aquí tu usuario de GitHub (sin @) para cargarlo automáticamente.
// Si se deja vacío, la sección espera a que el visitante escriba un usuario.
export const GITHUB_USERNAME = 'noelcondori-cloud';

const API_BASE_URL = 'https://api.github.com';
const REQUEST_TIMEOUT_MS = 10000;
// Regla de GitHub: letras, números y guiones simples, máximo 39 caracteres
const USERNAME_PATTERN = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

/** Error propio que conserva el código de estado HTTP. */
class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}

/** Traduce el código HTTP a un mensaje entendible. */
const describeHttpStatus = (status) => {
  switch (status) {
    case 400: return 'Error 400 (Bad Request): la solicitud enviada no es válida.';
    case 403: return 'Error 403: se alcanzó el límite de consultas de GitHub. Intenta en unos minutos.';
    case 404: return 'Error 404 (Not Found): no existe un usuario de GitHub con ese nombre.';
    case 500:
    case 502:
    case 503: return `Error ${status}: el servidor de GitHub no responde. Intenta más tarde.`;
    default: return `Error ${status}: no se pudo completar la solicitud.`;
  }
};

/** Petición GET que valida response.ok y devuelve JSON (200 OK). */
const fetchJson = async (endpoint) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: { Accept: 'application/vnd.github+json' },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new HttpError(response.status, describeHttpStatus(response.status));
    }
    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
};

/** Cambia el estado visual de la caja de estado (texto seguro con textContent). */
const setStatus = (statusBox, state, message) => {
  const icons = { idle: 'ℹ', success: '✔', error: '✖' };
  statusBox.dataset.state = state;
  statusBox.replaceChildren();

  const iconElement = document.createElement('span');
  iconElement.setAttribute('aria-hidden', 'true');
  if (state === 'loading') {
    iconElement.className = 'spinner';
  } else {
    iconElement.textContent = icons[state];
  }

  const textElement = document.createElement('span');
  textElement.textContent = message;
  statusBox.append(iconElement, textElement);
};

/** Escapa texto que viene de la API antes de insertarlo como HTML. */
const escapeHtml = (text = '') =>
  String(text).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]);

const createRepoCard = (repo) => `
  <article class="card repo-card">
    <h3><a href="${escapeHtml(repo.html_url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(repo.name)}</a></h3>
    <p class="card-text">${escapeHtml(repo.description ?? 'Repositorio sin descripción.')}</p>
    <p class="repo-stats">
      <span>💻 ${escapeHtml(repo.language ?? 'Sin lenguaje')}</span>
      <span>⭐ ${repo.stargazers_count}</span>
      <span>Actualizado: <time datetime="${escapeHtml(repo.updated_at)}">${new Date(repo.updated_at).toLocaleDateString('es-BO')}</time></span>
    </p>
  </article>`;

export const initGithubRepos = () => {
  const section = document.getElementById('github-repos');
  if (!section) return;

  const form = section.querySelector('#github-form');
  const userInput = section.querySelector('#github-user');
  const statusBox = section.querySelector('#github-status');
  const profileBox = section.querySelector('#github-profile');
  const reposList = section.querySelector('#github-list');
  const retryButton = section.querySelector('#github-retry');
  let lastUsername = '';

  const loadData = async (username) => {
    lastUsername = username;
    retryButton.hidden = true;
    reposList.innerHTML = '';
    profileBox.innerHTML = '';

    // Validación previa: evita enviar a la API un usuario con formato inválido (400)
    if (!USERNAME_PATTERN.test(username)) {
      setStatus(statusBox, 'error', 'Usuario no válido: usa solo letras, números y guiones (máx. 39).');
      return;
    }

    section.setAttribute('aria-busy', 'true');
    setStatus(statusBox, 'loading', `Cargando repositorios de @${username}…`);

    try {
      const [user, repos] = await Promise.all([
        fetchJson(`/users/${encodeURIComponent(username)}`),
        fetchJson(`/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=12`),
      ]);

      profileBox.innerHTML = `
        <img src="${escapeHtml(user.avatar_url)}" alt="Avatar de GitHub de ${escapeHtml(user.login)}" width="56" height="56" loading="lazy">
        <span><strong>${escapeHtml(user.name ?? user.login)}</strong><br>
        <a href="${escapeHtml(user.html_url)}" target="_blank" rel="noopener noreferrer">@${escapeHtml(user.login)}</a> · ${user.public_repos} ${user.public_repos === 1 ? 'repositorio público' : 'repositorios públicos'}</span>`;

      // Tubería funcional: sin forks, máximo 6, transformados a tarjetas
      const repoCards = repos
        .filter((repo) => !repo.fork)
        .slice(0, 6)
        .map(createRepoCard);

      reposList.innerHTML = repoCards.length
        ? repoCards.join('')
        : '<p class="empty-state">Este usuario aún no tiene repositorios públicos propios.</p>';

      const plural = repoCards.length === 1 ? 'repositorio' : 'repositorios';
      setStatus(statusBox, 'success', `Datos cargados correctamente (200 OK): ${repoCards.length} ${plural}.`);
    } catch (error) {
      const message = error.name === 'AbortError'
        ? 'La solicitud tardó demasiado. Revisa tu conexión a internet.'
        : error instanceof HttpError
          ? error.message
          : 'Sin conexión: no se pudo contactar con GitHub.';
      setStatus(statusBox, 'error', message);
      retryButton.hidden = false;
    } finally {
      section.setAttribute('aria-busy', 'false');
    }
  };

  // Consulta manual: intercepta el submit para no recargar la página
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    loadData(userInput.value.trim());
  });

  retryButton.addEventListener('click', () => loadData(lastUsername));

  // Carga automática si el usuario ya está configurado
  if (GITHUB_USERNAME) {
    userInput.value = GITHUB_USERNAME;
    loadData(GITHUB_USERNAME);
  } else {
    setStatus(statusBox, 'idle', 'Escribe un usuario de GitHub y pulsa “Consultar” para ver sus repositorios.');
  }
};
