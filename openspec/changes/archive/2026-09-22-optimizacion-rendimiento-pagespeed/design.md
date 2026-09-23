## Context

Véase `proposal.md` para la motivación del cambio y el diagnóstico de la auditoría de Lighthouse/PageSpeed (puntuación de 58/100, 4.4s FCP, 5.3s LCP, 6.35 MB de payload total).

El proyecto está construido con Astro v7 y desplegado en Vercel con salida estática (`output: 'static'`). Toda la carga crítica de fuentes e imágenes se realiza actualmente sin optimizaciones de prioridad ni dimensionamiento, y la fuente variable de Google Material Symbols carga más de 4 MB en el camino crítico de renderizado.

## Goals / Non-Goals

**Goals:**
- Reducir el payload total de red en la carga inicial de 6.35 MB a menos de 1.2 MB (>80% de reducción).
- Reducir el First Contentful Paint (FCP) en escritorio de 4.4s a < 1.0s.
- Reducir el Largest Contentful Paint (LCP) de 5.3s a < 1.5s.
- Eliminar por completo el bloqueo del renderizado por fuentes externas y Flash of Invisible Text (FOIT) en iconos.
- Obtener una puntuación de rendimiento en PageSpeed Insights / Lighthouse Desktop superior a 90 puntos (zona verde).

**Non-Goals:**
- Modificar el diseño gráfico, paleta de colores, arquitectura de información o textos del sitio.
- Alterar la lógica del backend API de contacto (`/api/contact.ts`).
- Cambiar librerías de componentes o arquitectura base de Astro.

## Decisions

### 1. Reemplazo de la fuente Material Symbols (4 MB) por componente `Icon.astro` vectorial local
- **Decisión**: Crear un componente nativo `Icon.astro` con definiciones vectoriales SVG precisas para los ~15 iconos utilizados en el sitio (`apartment`, `verified`, `visibility`, `location_on`, `square_foot`, `shower`, `group`, `door_front`, `info`, `photo_library`, `zoom_in`, `key`, `mail`, `person`, `call`, `send`, `check_circle`, `pets`, `map`, `celebration`, `schedule`, `arrow_forward`, `dark_mode`, `light_mode`, `chat`, `payments`, `pin_drop`).
- **Razón**: Elimina la solicitud de red de 4,002 KB de `fonts.gstatic.com`, erradica el bloqueo del renderizado en `<head>` y asegura renderizado instantáneo de iconos sin parpadeo (0ms FOIT).
- **Alternativas consideradas**:
  - *Subsetting de Google Fonts (`&text=`)*: Aún requiere petición de red externa, latencia TLS y riesgo de fuentes rotas si se agregan nuevos glifos.
  - *Librería npm de iconos*: Añade dependencias de compilación innecesarias cuando un componente Astro simple y autosuficiente requiere menos de 6 KB de código fuente.

### 2. Desacoplamiento y carga no bloqueante de la tipografía `Inter`
- **Decisión**: Configurar la etiqueta `<link rel="stylesheet">` de Inter con el patrón de carga asíncrona de alto rendimiento:
  `media="print" onload="this.media='all'"` precedido de `<link rel="preconnect" href="https://fonts.googleapis.com">` y `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`, junto con una pila de fuentes del sistema robusta (`font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;`) en CSS global.
- **Razón**: Desbloquea de inmediato el analizador del DOM, eliminando los 431 ms de bloqueo reportados por Lighthouse, y garantiza FCP en < 1 segundo.

### 3. Priorización y precarga explícita del elemento LCP (Hero)
- **Decisión**:
  1. Insertar en `<head>` de `src/layouts/Layout.astro` la etiqueta:
     `<link rel="preload" as="image" href="/img/foto-1.webp" fetchpriority="high" type="image/webp">`
  2. Aplicar en la etiqueta `<img>` principal de `src/pages/index.astro`:
     `loading="eager" fetchpriority="high" width="1200" height="800"`
- **Razón**: Sigue la guía de `modern-web-guidance` y `debug-optimize-lcp`. El navegador descarga el recurso LCP con máxima prioridad desde el primer paquete HTML recibido.

### 4. Generación de imágenes web responsivas y dimensionamiento estricto
- **Decisión**: Optimizar las imágenes WebP en `/public/img/` a resoluciones óptimas para web (ej. 1200px máx. para foto hero / carrusel, y 600px para thumbnails), con compresión WebP de alta fidelidad, reduciendo el peso de las 8 imágenes de 5.6 MB a ~800 KB. Todas las etiquetas `<img>` tendrán atributos `width`, `height`, `loading="lazy"` y `decoding="async"`.
- **Razón**: La auditoría de Lighthouse identificó que servir 3000px para contenedores de 261px desperdicia 835 KB por imagen. Atributos explícitos aseguran un CLS de 0.00.

### 5. Contención de renderizado CSS (`content-visibility`)
- **Decisión**: Añadir `content-visibility: auto` y `contain-intrinsic-size: auto 600px` a las clases de secciones inferiores (`.gallery-preview-section`, `.advantages-section`, `.faq-section`, `.map-section`, `.site-footer`).
- **Razón**: Evita que el motor del navegador calcule estilos y pintura para elementos que no están en el viewport inicial, manteniendo el hilo principal libre (TBT = 0).

## Risks / Trade-offs

- **[Riesgo: Diferencia visual en dimensiones de iconos SVG respecto a la fuente previa]**
  → *Mitigación*: El componente `Icon.astro` estandarizará tamaños de `1.25rem` a `1.5rem` y heredará `currentColor` para preservar exactamente el aspecto visual actual.
- **[Riesgo: Posible parpadeo tipográfico leve (FOUT) con Inter diferido]**
  → *Mitigación*: La pila de fuentes del sistema (`system-ui, -apple-system, BlinkMacSystemFont`) tiene proporciones x-height y métricas muy similares a Inter, evitando desalineaciones perceptibles.
- **[Riesgo: Pérdida de resolución en pantallas de alta densidad]**
  → *Mitigación*: Las imágenes optimizadas mantendrán un ancho mínimo de 1200px para el hero (equivalente a 2x en el contenedor de 600px), garantizando nitidez perfecta en pantallas Retina.
