/* ==========================================================================
   PROJECTS-DATA.JS - Colección original de proyectos (INMUTABLE)
   Object.freeze impide modificar los datos; el filtro trabaja sobre copias.
   ========================================================================== */

export const PROJECTS = Object.freeze([
  Object.freeze({
    id: 'hoja-de-vida-web',
    title: 'Hoja de vida web interactiva',
    category: 'web',
    categoryLabel: 'Desarrollo web',
    year: 2026,
    status: 'Publicado',
    role: 'Desarrollador único del proyecto',
    summary:
      'El sitio que estás viendo: mi CV convertido en una página web profesional, pensada para que un reclutador o docente conozca mi perfil en pocos minutos, desde el celular o la computadora.',
    details:
      'Empecé con una maquetación 100 % HTML5 semántico y la transformé en una aplicación interactiva: estilos CSS3 organizados en módulos con variables, diseño mobile-first con Flexbox y CSS Grid, y JavaScript ES6+ dividido en módulos independientes.',
    steps: Object.freeze([
      'Estructuré el contenido con etiquetas semánticas y atributos de accesibilidad (ARIA).',
      'Diseñé la interfaz para móvil primero y la adapté a tablet y escritorio.',
      'Programé el modo claro/oscuro que se recuerda, el menú hamburguesa y este buscador.',
      'Agregué un formulario que valida mientras escribes y la conexión en vivo con la API de GitHub.',
      'Versioné el código con Git y lo publiqué en GitHub Pages.',
    ]),
    challenge:
      'Agregar interactividad sin perder accesibilidad: que todo funcione también con teclado y lectores de pantalla.',
    result: 'Sitio funcional, accesible, responsivo y publicado en GitHub Pages.',
    tags: Object.freeze(['HTML5', 'CSS3', 'JavaScript', 'Accesibilidad', 'GitHub Pages']),
  }),
  Object.freeze({
    id: 'robot-aspiradora',
    title: 'Robot aspiradora autónomo con ESP32',
    category: 'iot',
    categoryLabel: 'Electrónica e IoT',
    year: 2026,
    status: 'En desarrollo',
    role: 'Diseño del circuito y programación',
    summary:
      'Prototipo de un robot de limpieza autónomo inspirado en las aspiradoras tipo Roomba, controlado por un microcontrolador ESP32, que une programación y electrónica en un solo proyecto.',
    details:
      'El ESP32 funciona como el “cerebro” del robot: recibe información del entorno y decide cómo moverse sin que nadie lo maneje. Antes de armar el circuito físico, lo simulé para comprobar las conexiones y la lógica sin riesgo de dañar componentes.',
    steps: Object.freeze([
      'Definí el comportamiento del robot: avanzar, detectar obstáculos y cambiar de dirección.',
      'Diseñé y probé el circuito en Wokwi, un simulador de electrónica en línea.',
      'Elaboré el diagrama del circuito en Fritzing para documentarlo y facilitar su armado.',
      'Programé la lógica de movimiento autónomo en el ESP32.',
    ]),
    challenge:
      'Pasar del código a un objeto físico: coordinar el programa con los componentes electrónicos reales.',
    result: 'Circuito simulado y documentado; prototipo en construcción.',
    tags: Object.freeze(['ESP32', 'C++', 'Wokwi', 'Fritzing', 'Electrónica']),
  }),
  Object.freeze({
    id: 'sistema-cafeterias',
    title: 'Sistema de venta y compra automática para cafeterías',
    category: 'redes',
    categoryLabel: 'Redes y web',
    year: 2025,
    status: 'Finalizado',
    role: 'Diseño del frontend',
    summary:
      'Proyecto en equipo de Redes de Computadoras: un sistema que automatiza la compra y venta en cafeterías para reducir filas y errores al registrar los pedidos.',
    details:
      'Mi responsabilidad fue la parte visible del sistema, el frontend: las pantallas que usan los clientes para elegir productos y confirmar su compra, y las que usa el personal para ver los pedidos. Trabajé coordinado con mis compañeros para que la interfaz se comunicara con la red y la base de datos.',
    steps: Object.freeze([
      'Identificamos en equipo los problemas de atención en una cafetería.',
      'Diseñé las pantallas de selección de productos, carrito y confirmación.',
      'Integré la interfaz con la parte de red y base de datos del equipo.',
      'Presentamos el sistema y fue seleccionado para el Workshop.',
    ]),
    challenge:
      'Lograr una interfaz clara y rápida de usar, integrada con el trabajo del resto del equipo.',
    result: 'El proyecto clasificó al Workshop de la universidad.',
    tags: Object.freeze(['HTML5', 'CSS3', 'JavaScript', 'SQL', 'Redes']),
  }),
  Object.freeze({
    id: 'base-de-datos',
    title: 'Base de datos relacional en PostgreSQL',
    category: 'bd',
    categoryLabel: 'Bases de datos',
    year: 2025,
    status: 'Finalizado',
    role: 'Diseño, modelado y consultas',
    summary:
      'Una base de datos es como un archivo digital muy ordenado: guarda información en tablas conectadas entre sí para encontrarla rápido y sin errores. En Base de Datos II diseñé una desde cero para un caso académico.',
    details:
      'Imagina varias hojas de cálculo (clientes, productos, ventas) unidas por un dato en común, como un código. Así no se repite información y, si algo cambia, se actualiza en un solo lugar. Ese fue el objetivo: organizar los datos del caso para que siempre estén completos, consistentes y fáciles de consultar.',
    steps: Object.freeze([
      'Analicé el caso para saber qué información había que guardar.',
      'Dibujé el modelo entidad-relación: las “cosas” del sistema y cómo se conectan.',
      'Normalicé las tablas para eliminar datos repetidos y evitar contradicciones.',
      'Creé la base de datos en PostgreSQL usando pgAdmin.',
      'Escribí consultas SQL para obtener reportes útiles, por ejemplo totales y listados filtrados.',
    ]),
    challenge:
      'Definir bien las relaciones y las claves para que los datos sigan siendo correctos aunque crezcan.',
    result: 'Base de datos funcional que responde con precisión a las consultas del caso.',
    tags: Object.freeze(['PostgreSQL', 'pgAdmin', 'SQL', 'Modelado E-R', 'Normalización']),
  }),
]);
