## Context

Véase `proposal.md` para la motivación. Actualmente:
1. `src/layouts/Layout.astro` realiza peticiones a `https://fonts.googleapis.com` y `https://fonts.gstatic.com` mediante un truco asíncrono `<link media="print" onload="this.setAttribute('media', 'all')">`. Brave Shields bloquea por defecto dominios de rastreo y fuentes de terceros de Google, lo que provoca que el evento `onload` nunca se ejecute o que la hoja de estilos no se aplique, dejando la página sin estilos o en blanco.
2. `src/components/Navbar.astro` renderiza dentro del botón `.theme-toggle` dos instancias de `<Icon>` (`sun` y `moon`). En `Icon.astro`, la regla `.svg-icon` tiene scope de Astro (`.svg-icon[data-astro-cid-...] { display: inline-block; }`), lo que supera la especificidad de `:global(.icon-light) { display: none; }` en `Navbar.astro`. Como consecuencia, ambos iconos se muestran simultáneamente en tema claro.
3. En resoluciones móviles (< 400px), los enlaces de navegación ("Inicio", "Detalles y Fotos", "Contacto") junto con el selector de tema y el botón CTA de WhatsApp superan el ancho disponible de la pantalla, provocando desbordamiento horizontal y recortes.
4. En `detalle.astro` y `Gallery.astro`, la grilla y la pista de miniaturas requieren mejor soporte de scroll horizontal táctil y adaptación de dimensiones en viewports pequeños.

## Goals / Non-Goals

**Goals:**
- Eliminar la dependencia de CDNs de fuentes externas bloqueables por Brave Shields mediante la inclusión local/empaquetada de la tipografía Inter (o `@fontsource/inter`) con una pila de fuentes del sistema como fallback robusto.
- Corregir de forma definitiva la visibilidad de los iconos en el botón de tema claro/oscuro asegurando especificidad inequívoca para que solo se muestre el icono de la luna en modo claro y el icono del sol en modo oscuro.
- Diseñar la barra de navegación responsiva para pantallas estrechas (hasta 320px) sin overflow ni saltos de línea antiestéticos.
- Optimizar el carrusel de miniaturas y visor de la galería de fotos en `/detalle` para navegación táctil móvil fluida.

**Non-Goals:**
- Reescribir la arquitectura de estilos globales o reemplazar Tailwind/CSS nativo.
- Agregar librerías pesadas de JavaScript para carruseles o menús hamburguesa complejos si CSS nativo resuelve el problema con mayor ligereza y rendimiento.

## Decisions

### Decisión 1: Auto-alojamiento de tipografía Inter y eliminación de hacks asíncronos en `<link>`
- **Elección**: Instalar e importar `@fontsource/inter` (subconjuntos latin en pesos 400, 500, 600, 700) en el CSS global o empaquetado por Vite, o auto-alojar los archivos WOFF2 localmente en `public/fonts/`.
- **Razón**: Al empaquetarse directamente como recurso estático de la aplicación, Brave Shields no lo bloquea como rastreador externo. Se elimina el atributo `onload="this.setAttribute('media', 'all')"` que fallaba en Brave.
- **Alternativas consideradas**:
  - *Mantener Google Fonts con `<link rel="stylesheet">` bloqueante*: Sigue siendo bloqueado por los escudos de Brave.
  - *Usar únicamente fuentes del sistema*: Es rápido pero altera la identidad visual acordada para el sitio.

### Decisión 2: Solución de especificidad para el botón de tema
- **Elección**: Definir reglas explícitas con especificidad directa dentro de `Navbar.astro` y/o `Icon.astro`:
  ```css
  /* En modo claro (por defecto o data-theme="light") */
  :global([data-theme="light"]) .theme-toggle :global(.icon-light),
  :global(:root:not([data-theme="dark"])) .theme-toggle :global(.icon-light) {
    display: none !important;
  }
  :global([data-theme="light"]) .theme-toggle :global(.icon-dark),
  :global(:root:not([data-theme="dark"])) .theme-toggle :global(.icon-dark) {
    display: flex !important;
  }

  /* En modo oscuro (data-theme="dark") */
  :global([data-theme="dark"]) .theme-toggle :global(.icon-dark) {
    display: none !important;
  }
  :global([data-theme="dark"]) .theme-toggle :global(.icon-light) {
    display: flex !important;
  }
  ```
- **Razón**: El uso de `!important` scoped al contenedor `.theme-toggle` y sus clases de iconos garantiza anular cualquier clase scoped interna generada por Astro en `Icon.astro`.
- **Alternativas consideradas**:
  - *Renderizar dinámicamente con JavaScript un solo icono*: Añadiría manipulación DOM por script innecesaria para un problema que CSS resuelve declarativamente y sin parpadeo (SSR).

### Decisión 3: Responsive en `Navbar.astro` para pantallas pequeñas (< 480px)
- **Elección**:
  1. En viewports menores a 480px, utilizar una etiqueta más corta o compacta para "Detalles y Fotos" (ej. "Detalles") y reducir el padding horizontal de los enlaces (`0.35rem` a `0.5rem`).
  2. Ajustar el tamaño del botón de WhatsApp a formato icono o píldora compacta en pantallas estrechas.
  3. Asegurar `max-width: 100vw; overflow-x: hidden;` en el contenedor padre.
- **Razón**: Permite mantener el menú accesible en una sola línea sin desbordar ni forzar saltos de línea rotos en dispositivos de 360px a 390px.

### Decisión 4: Galería de fotos responsiva en `Gallery.astro` y `detalle.astro`
- **Elección**:
  1. En `.thumbnails-track`, configurar `display: flex`, `gap: 0.5rem`, `overflow-x: auto`, `scroll-snap-type: x mandatory`, y `-webkit-overflow-scrolling: touch;`.
  2. Redimensionar `.thumb-btn` a tamaños proporcionales (60px-70px en móvil, 80px-90px en escritorio).
  3. Asegurar que el contenedor `.stage-wrapper` mantenga `aspect-ratio: 4/3` o `16/9` con `object-fit: cover` en móviles para que la foto principal nunca desborde el ancho.

## Risks / Trade-offs

- **[Riesgo]** `@fontsource/inter` podría incrementar el tamaño del bundle si se importan todos los pesos.
  → **Mitigación**: Importar solo los pesos necesarios (400, 600, 700) y subset latin, manteniendo el peso total en menos de 50 KB.
- **[Riesgo]** Sobreescritura de estilos globales en el selector de tema.
  → **Mitigación**: Limitar los selectores estrictamente a `.theme-toggle`.
