# rendimiento-web Specification

## Purpose
Define los requisitos de rendimiento web y Core Web Vitals para garantizar tiempos de carga ultrarrápidos (LCP < 1.5s, FCP < 1.0s, CLS < 0.05) y una puntuación de Google PageSpeed Insights superior a 90 puntos.

## Requirements

### Requirement: Eliminación de fuentes bloqueantes y optimización de iconos
El sistema SHALL eliminar la descarga de fuentes externas pesadas y bloqueantes del Critical Rendering Path. Específicamente, la fuente de 4 MB de Material Symbols MUST ser sustituida por iconos SVG vectoriales locales, y la fuente tipográfica Inter MUST cargarse de forma no bloqueante o autoalojada con directiva font-display: swap.

#### Scenario: Carga no bloqueante de tipografía e iconos
- **WHEN** un navegador solicita la página principal o cualquier subpágina
- **THEN** el documento HTML inicial no contendrá hojas de estilo externas síncronas que bloqueen el FCP, y los iconos se renderizarán instantáneamente como vectores SVG sin provocar FOIT (Flash of Invisible Text)

### Requirement: Priorización y precarga del elemento LCP
El sistema SHALL priorizar el elemento LCP (imagen principal del inmueble en el hero) mediante la etiqueta <link rel="preload" as="image" fetchpriority="high"> en el elemento <head> y el atributo fetchpriority="high" en la etiqueta <img> correspondiente.

#### Scenario: Descubrimiento y carga anticipada del LCP
- **WHEN** el analizador HTML procesa la cabecera y el cuerpo del documento
- **THEN** el motor de navegación asigna máxima prioridad de red a la descarga de la imagen del hero antes de comenzar a evaluar recursos no críticos

### Requirement: Dimensionamiento y optimización de imágenes
El sistema SHALL declarar atributos explícitos width y height o relaciones de aspecto CSS (aspect-ratio) en todas las etiquetas <img>, y MUST utilizar loading="lazy" con decoding="async" en todas las imágenes situadas bajo el pliegue visual inicial.

#### Scenario: Prevención de Cumulative Layout Shift (CLS)
- **WHEN** las imágenes de la galería y secciones inferiores se cargan asíncronamente
- **THEN** el navegador reserva el espacio exacto en el layout evitando saltos de contenido con un índice CLS inferior a 0.05

#### Scenario: Carga diferida de imágenes fuera del viewport
- **WHEN** el usuario carga la página inicial
- **THEN** las imágenes secundarias y miniaturas no se descargan de inmediato hasta que el usuario se aproxime con el scroll a su área de visualización

### Requirement: Contención CSS y reducción del trabajo en el hilo principal
El sistema SHALL implementar contención de renderizado mediante la propiedad CSS content-visibility: auto junto con contain-intrinsic-size en las secciones de contenido bajo el pliegue inicial (galería completa, características, mapa y pie de página).

#### Scenario: Omitir cálculos de estilo y layout offscreen
- **WHEN** el navegador ejecuta el pipeline de renderizado inicial
- **THEN** se omiten los cálculos pesados de layout y pintura para subárboles DOM no visibles en el viewport inicial, manteniendo el Total Blocking Time (TBT) en 0 ms
