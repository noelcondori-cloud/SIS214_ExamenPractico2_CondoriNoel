# SIS214 · Examen Práctico 2 — Hoja de vida web de Noel Fernando Condori Quispe

Landing page interactiva tipo **CV / Portafolio profesional** desarrollada para la asignatura
**Tecnologías Web I (SIS-214)** de la Universidad Católica Boliviana “San Pablo”.

- **Repositorio:** https://github.com/noelcondori-cloud/SIS214_ExamenPractico2_CondoriNoel
- **Producción (GitHub Pages):** https://noelcondori-cloud.github.io/SIS214_ExamenPractico2_CondoriNoel/


---

## 🧰 Tecnologías utilizadas

| Capa | Tecnología |
|------|------------|
| Estructura | HTML5 semántico (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`) + WAI-ARIA |
| Presentación | CSS3 modular con tokens en `:root`, Flexbox, CSS Grid y estrategia *mobile-first* |
| Lógica | JavaScript ES6+ con módulos nativos (`import` / `export`) |
| Datos externos | API REST pública de GitHub mediante Fetch API + `async/await` |
| Persistencia | `localStorage` con `JSON.stringify()` / `JSON.parse()` |
| Versionado y despliegue | Git, GitHub y GitHub Pages |

## 🏗️ Arquitectura de la solución

```
SIS214_ExamenPractico2_CondoriNoel/
├── index.html                    # Inicio (landing)
├── acerca_de_mi.html             # Datos personales
├── perfil_profesional.html       # Perfil, fortalezas y objetivo
├── formacion_academica.html      # Universidad y colegio
├── experiencia_profesional.html  # Experiencia y proyectos académicos
├── habilidades.html              # Habilidades (acordeones <details>)
├── cursos.html                   # Cursos y seminarios
├── idiomas.html                  # Tabla de idiomas con <progress>
├── proyectos.html                # 4 proyectos con buscador + repositorios de GitHub
├── portafolio.html               # Foto, audio y video
├── formulario.html               # Formulario de contacto y <dialog>
├── css/
│   ├── styles.css                # Punto de entrada: importa los demás módulos
│   ├── variables.css             # Tokens de diseño (claro / oscuro)
│   ├── base.css                  # Reset universal y elementos nativos
│   ├── layout.css                # Estructura mobile-first y media queries
│   └── components.css            # Botones, tarjetas, menú, formulario, etc.
├── jss/
│   ├── main.js                   # Punto de entrada: inicializa los módulos
│   └── modules/
│       ├── theme.js              # 1. Tema claro/oscuro persistente
│       ├── menu.js               # 2. Menú hamburguesa con aria-expanded
│       ├── projects-data.js      #    Datos inmutables (Object.freeze)
│       ├── filter.js             # 3. Buscador con .filter().map()
│       ├── form.js               # 4. Formulario con preventDefault y validación en vivo
│       ├── github.js             # 5. Fetch async/await a la API de GitHub
│       └── ui.js                 #    Diálogo y año del pie de página
└── assets/
    ├── images/                   # foto1.jpg, imagenproyecto.jpg, poster-video.jpg
    ├── audios/                   # audioproyecto.mp3, audioproyecto.aac
    └── videos/                   # videoproyecto.mp4
```

### Diseño responsivo (mobile-first)

| Rango | Comportamiento |
|-------|----------------|
| Móvil `< 768px` (estilos base) | Una columna, menú hamburguesa, foto arriba a la derecha |
| Tablet `768px – 1024px` | Perfil en dos columnas, tarjetas en grilla de 2, menú desplegable de 2 columnas |
| Escritorio `> 1024px` | Menú siempre visible, contenido + barra lateral `<aside>` con CSS Grid |

### Funcionalidades JavaScript

1. **Tema claro/oscuro**: alterna `data-theme` en `<html>` y guarda `{ theme }` en `localStorage` con `JSON.stringify()`; al recargar se restaura con `JSON.parse()`.
2. **Menú hamburguesa**: el evento `click` alterna la clase `.is-open` y cambia `aria-expanded` entre `true` y `false`. Se cierra con <kbd>Esc</kbd> o al elegir un enlace.
3. **Buscador en tiempo real**: el evento `input` filtra los proyectos con `PROJECTS.filter(...).map(...)` sin modificar los datos originales (congelados con `Object.freeze`).
4. **Formulario de contacto**: `event.preventDefault()` evita la recarga; cada campo se valida mientras se escribe (evento `input`) con mensajes de error o éxito.
5. **API de GitHub**: `async/await` dentro de `try...catch`, verificación de `response.ok`, manejo de los códigos 200, 400, 403, 404 y 500, y estados visibles de carga, éxito y error.

## ▶️ Ejecución local

Los módulos ES6 necesitan un servidor (no funcionan abriendo el archivo con doble clic).

1. Clona el repositorio:
   ```bash
   git clone https://github.com/noelcondori-cloud/SIS214_ExamenPractico2_CondoriNoel.git
   ```
2. Ábrelo en Visual Studio Code.
3. Clic derecho en `index.html` → **Open with Live Server**.

## 👤 Autor

**Noel Fernando Condori Quispe** — Estudiante de Ingeniería de Sistemas, 6to semestre
Universidad Católica Boliviana “San Pablo”, La Paz - Bolivia · noel.condori@ucb.edu.bo
