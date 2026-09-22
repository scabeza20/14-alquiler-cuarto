## Why

El análisis de Google PageSpeed Insights y Lighthouse sobre el sitio en producción (https://alquiler-tocumen-la-siesta.vercel.app/) arrojó una puntuación de rendimiento deficiente de **58/100 (categoría naranja)** en escritorio, con un First Contentful Paint (FCP) de 4.4s y un Largest Contentful Paint (LCP) de 5.3s.

El diagnóstico exhaustivo identificó tres cuellos de botella críticos:
1. **Descarga masiva y bloqueante de fuentes**: El enlace a la fuente variable Material Symbols Outlined descarga un archivo de 4,002 KB (~4 MB) que bloquea el render inicial y consume el 63% del peso de toda la página, además de la hoja de estilos de Google Fonts para Inter que retrasa el FCP en 431 ms.
2. **Entrega ineficiente de imágenes**: La imagen principal del hero (foto-1.webp) y las miniaturas de la galería (foto-2.webp, foto-3.webp, foto-4.webp) se sirven a resolución de cámara nativa (3000x4000 y 3000x2069 px, sumando más de 5.6 MB), sin dimensiones explícitas width/height y sin directivas de precarga ni fetchpriority="high" en el candidato LCP.
3. **Falta de contención de renderizado CSS**: Elementos bajo el pliegue (secciones secundarias, mapas, ventajas) no aprovechan contención de renderizado (content-visibility: auto), forzando cálculos de layout y estilo innecesarios en el hilo principal durante la carga inicial.

Optimizar estos aspectos es imperativo para garantizar una experiencia instantánea a los usuarios que buscan alquiler, reducir el consumo de datos móviles y alcanzar una puntuación verde (>90) en PageSpeed Insights.

## What Changes

- **Sustitución de la fuente de 4 MB de Material Symbols por iconos vectoriales ligeros (SVG)**: Reemplazar la hoja de estilos externa y el archivo .woff2 de 4 MB por un componente nativo o inline SVGs para los ~15 iconos utilizados en el sitio, reduciendo la carga de iconos a menos de 10 KB (ahorro de más de 3.99 MB).
- **Optimización de carga tipográfica para Inter**: Desacoplar la hoja de estilos de Google Fonts del Critical Rendering Path mediante preconnect optimizado, carga asíncrona no bloqueante o autoalojamiento con font-display: swap.
- **Optimización integral del elemento LCP (Hero)**:
  - Añadir <link rel="preload" as="image" href="..." fetchpriority="high"> en <head>.
  - Configurar fetchpriority="high", loading="eager", y atributos explícitos width y height en la imagen destacada del hero en index.astro.
- **Optimización de imágenes y thumbnails**:
  - Generar versiones optimizadas para web/móvil con dimensiones ajustadas al contenedor real (evitando servir 3000px para thumbnails de 261px).
  - Incluir atributos nativos width, height, loading="lazy" y decoding="async" en todas las imágenes bajo el pliegue (index.astro, detalle.astro).
- **CSS Rendering & Layout Stability**:
  - Aplicar content-visibility: auto y contain-intrinsic-size a secciones bajo el pliegue para acelerar el árbol de renderizado.
  - Asegurar aspect-ratio en contenedores de imágenes para prevenir Cumulative Layout Shift (CLS).

## Capabilities

### New Capabilities
- : Requisitos y criterios de aceptación para Core Web Vitals (LCP < 1.2s, FCP < 1.0s, CLS < 0.05, peso de payload < 1.5 MB), carga de iconos SVG locales, optimización de fuentes y carga prioritaria de imágenes críticas.

### Modified Capabilities

## Impact

- **Código modificado**:
  - src/layouts/Layout.astro: Remoción de fuentes bloqueantes, incorporación de preloads LCP, preconnects y meta tags de rendimiento.
  - src/pages/index.astro: Marcado del hero con fetchpriority="high", dimensiones exactas, lazy loading optimizado para la cuadrícula de previsualización.
  - src/pages/detalle.astro: Optimización de imágenes en carrusel/galería y atributos de dimensiones.
  - src/components/Navbar.astro, src/components/Footer.astro, src/components/ContactForm.astro: Sustitución de spans con clases material-symbols-outlined por componente SVG ligero o iconos SVG inline.
- **Rendimiento esperado**: Reducción del peso total de la página de 6.35 MB a < 1.2 MB (~80% de reducción), mejora de FCP de 4.4s a < 1.0s en escritorio, y elevación de la puntuación de PageSpeed de 58 a 90+.
