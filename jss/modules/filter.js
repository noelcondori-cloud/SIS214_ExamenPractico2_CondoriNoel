/* ==========================================================================
   FILTER.JS - Buscador de proyectos en tiempo real
   Tubería funcional: .filter() -> .map() sobre los datos originales,
   sin mutarlos (los datos están congelados con Object.freeze).
   ========================================================================== */
import { PROJECTS } from './projects-data.js';

/** Normaliza texto: minúsculas y sin tildes, para comparar con facilidad. */
const normalizeText = (text) =>
  text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

/** Devuelve true si el proyecto coincide con el texto y la categoría. */
const matchesFilters = (project, searchTerm, category) => {
  const searchableText = normalizeText(
    [project.title, project.summary, project.details, project.role, project.categoryLabel, ...project.tags].join(' ')
  );
  const matchesText = searchableText.includes(normalizeText(searchTerm));
  const matchesCategory = category === 'todos' || project.category === category;
  return matchesText && matchesCategory;
};

/** Convierte un proyecto en el HTML de su tarjeta <article>. */
const createProjectCard = (project) => `
  <article class="card project-card" aria-labelledby="titulo-${project.id}">
    <header>
      <p class="project-badges">
        <span class="badge">${project.categoryLabel} · <time datetime="${project.year}">${project.year}</time></span>
        <span class="badge badge-status">${project.status}</span>
      </p>
      <h3 id="titulo-${project.id}">${project.title}</h3>
      <p class="project-role">${project.role}</p>
    </header>
    <p class="card-text">${project.summary}</p>
    <details>
      <summary>Leer más sobre este proyecto</summary>
      <p class="card-text">${project.details}</p>
      <p class="card-text"><strong>¿Cómo lo hice?</strong></p>
      <ol class="steps-list">
        ${project.steps.map((step) => `<li>${step}</li>`).join('')}
      </ol>
      <p class="card-text"><strong>Reto principal:</strong> ${project.challenge}</p>
    </details>
    <p class="callout"><strong>Resultado obtenido</strong>${project.result}</p>
    <footer>
      <ul class="tech-tags" aria-label="Tecnologías utilizadas">
        ${project.tags.map((tag) => `<li>${tag}</li>`).join('')}
      </ul>
    </footer>
  </article>`;

export const initProjectFilter = () => {
  const searchInput = document.getElementById('project-search');
  const categorySelect = document.getElementById('project-category');
  const resultsContainer = document.getElementById('projects-list');
  const resultsCount = document.getElementById('projects-count');
  if (!searchInput || !resultsContainer) return;

  const renderProjects = () => {
    const searchTerm = searchInput.value.trim();
    const category = categorySelect?.value ?? 'todos';

    // Tubería funcional: filtrar y luego transformar a HTML (PROJECTS no cambia)
    const cardsHtml = PROJECTS
      .filter((project) => matchesFilters(project, searchTerm, category))
      .map(createProjectCard);

    resultsCount.textContent = `${cardsHtml.length} de ${PROJECTS.length} proyectos encontrados`;

    if (cardsHtml.length === 0) {
      resultsContainer.innerHTML = '<p class="empty-state">No hay proyectos que coincidan con tu búsqueda.</p>';
      return;
    }
    resultsContainer.innerHTML = cardsHtml.join('');
  };

  // Evita que Enter en el buscador recargue la página
  searchInput.form?.addEventListener('submit', (event) => event.preventDefault());

  searchInput.addEventListener('input', renderProjects);
  categorySelect?.addEventListener('change', renderProjects);
  renderProjects();
};
