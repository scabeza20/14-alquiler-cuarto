## Why

En pruebas recientes del sitio web desplegado en producción (`https://alquiler-tocumen-la-siesta.vercel.app/`), se identificaron tres fallas críticas de interfaz de usuario y compatibilidad entre navegadores:
1. **Fallo de estilos en Brave Browser**: Al navegar con Brave (y escudos de privacidad activos), la página no carga estilos CSS externos ni la tipografía debido a bloqueos de peticiones a Google Fonts y al uso de listeners asíncronos en `<link media="print" onload="...">`, dejando la web sin diseño.
2. **Superposición de iconos en el botón de tema claro/oscuro**: En modo claro, los iconos del Sol y la Luna se renderizan simultáneamente uno al lado del otro dentro del botón circular de 36px por un conflicto de especificidad CSS en Astro (`.svg-icon` con atributo de scope sobreescribe `:global(.icon-light)`).
3. **Deficiencias de diseño responsivo móvil en `/detalle` y barra de navegación**: En pantallas móviles (< 400px), los enlaces de la barra de navegación se desbordan horizontalmente rompiendo el contenedor, y en la vista de detalle la galería de imágenes y miniaturas sufren solapamientos y problemas de desplazamiento táctil.

Esta propuesta corrige estos tres problemas para garantizar una experiencia visual pulida, consistente y robusta en cualquier navegador y dispositivo móvil.

## What Changes

- **Carga de fuentes y estilos offline-first / resistente a escudos**: Reemplazar la carga externa y el listener inline asíncrono de Google Fonts por la fuente Inter auto-alojada vía paquete (`@fontsource/inter` o fuentes locales optimizadas) o declaración CSS con soporte de fallback estándar del sistema, eliminando cualquier bloqueo por Brave Shields o extensiones de privacidad.
- **Corrección de visibilidad y layout del botón de alternancia de tema**: Corregir la especificidad CSS de los iconos SVG del tema en `Navbar.astro` e `Icon.astro` para asegurar que en modo claro solo se muestre el icono de luna (para cambiar a oscuro) y en modo oscuro solo el icono de sol, eliminando la doble presencia de iconos y manteniendo el botón centrado.
- **Adaptación móvil de la barra de navegación (`Navbar.astro`)**: Ajustar espaciados, tamaños de texto o etiquetas compactas en pantallas estrechas (< 480px) para evitar el desbordamiento horizontal y garantizar que los botones de WhatsApp y tema no se compriman ni salgan del viewport.
- **Mejora del responsive y touch en galería de fotos (`Gallery.astro` y `detalle.astro`)**: Optimizar la pista de miniaturas (`.thumbnails-track`) y el visor principal con `overflow-x: auto`, scroll táctil suave (`-webkit-overflow-scrolling: touch`), snaps adecuados y anchos responsivos para que las fotos se exploren cómodamente en móviles pequeños.

## Capabilities

### New Capabilities
- `ux-responsive`: Especificación de resiliencia de carga de estilos/fuentes entre navegadores (Brave/escudos), alternancia visual correcta del botón de tema y comportamiento responsivo móvil para la navegación y galería multimedia.

### Modified Capabilities
<!-- None -->

## Impact

- **Archivos afectados**:
  - `src/layouts/Layout.astro` (eliminación de scripts/handlers asíncronos en links de fuentes, inclusión de fuentes robustas).
  - `src/components/Navbar.astro` (especificidad de iconos de tema, flex-wrap/ajuste de enlaces en pantallas pequeñas).
  - `src/components/Icon.astro` (estilos para permitir visibilidad condicional).
  - `src/components/Gallery.astro` y `src/pages/detalle.astro` (pistas de miniaturas, flex direction / grid responsive, touch scroll).
  - `package.json` (adición de `@fontsource/inter` si aplica para auto-hospedaje).
- **APIs y dependencias**: Sin dependencias externas de red bloqueables por navegadores de privacidad.
- **Rendimiento**: Se mantiene la puntuación Lighthouse 100/100 al servir fuentes locales precargadas sin solicitudes a terceros.
