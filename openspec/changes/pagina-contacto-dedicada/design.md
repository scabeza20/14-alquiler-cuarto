## Context

Véase `proposal.md` para la motivación. Actualmente el sitio cuenta con dos páginas (`/` y `/detalle`). El componente `ContactForm.astro` se encuentra embebido en la barra lateral de `src/pages/detalle.astro`. El proyecto utiliza Astro con salida estática y adaptador `@astrojs/vercel`, estilos en CSS Vanilla basados en tokens de `src/styles/global.css`, y soporte para modo claro/oscuro.

## Goals / Non-Goals

**Goals:**
- Crear la nueva página `src/pages/contacto.astro` utilizando el layout principal y reutilizando el componente `ContactForm.astro`.
- Diseñar una vista de contacto limpia, centrada y optimizada para pantallas móviles y escritorio (escala proporcional ~720px max-width).
- Reemplazar el formulario incrustado en `src/pages/detalle.astro` por una tarjeta de contacto compacta y atractiva con botón CTA directo a `/contacto` y botón de WhatsApp.
- Actualizar los enlaces de navegación en `Navbar.astro` y `Footer.astro` para que apunten a `/contacto` con detección de ruta activa.

**Non-Goals:**
- No modificar el endpoint `src/pages/api/contact.ts` ni la lógica de envío de correo (Resend / Web3Forms).
- No mostrar el número telefónico en texto plano (mantener estricta privacidad según la regla del proyecto).
- No agregar nuevos campos innecesarios al formulario.

## Decisions

### 1. Reutilización directa del componente `ContactForm.astro`
- **Decisión**: Mantener `ContactForm.astro` como componente modular e importarlo en `src/pages/contacto.astro`.
- **Razón**: Evita duplicación de código, preserva la lógica de validación del lado del cliente, alertas en la parte inferior y compatibilidad con tema oscuro.
- **Alternativa considerada**: Incrustar el formulario directamente en `contacto.astro`. Descartada por violar el principio DRY y dificultar el mantenimiento.

### 2. Tarjeta de llamada a la acción (CTA) en `src/pages/detalle.astro`
- **Decisión**: En el sidebar donde antes estaba el formulario completo, colocar una tarjeta elegante de contacto con:
  - Título y mensaje de disponibilidad inmediata.
  - Botón principal hacia `/contacto` ("Enviar consulta por formulario").
  - Botón secundario/WhatsApp ("Contactar por WhatsApp").
- **Razón**: Mantiene la página de detalles limpia, enfocada en la información y fotos del apartamento, sin perder la conversión del visitante.
- **Alternativa considerada**: Dejar solo un enlace de texto pequeño. Descartada porque reduce la visibilidad de contacto.

### 3. Maquetación y experiencia en `src/pages/contacto.astro`
- **Decisión**: La página de contacto tendrá un encabezado con badge de propiedad ("Apartamento en Tocumen - \$250/mes"), título principal, breve resumen y el formulario dentro de una tarjeta con elevación sutil y ancho máximo cómodo (`max-width: 680px`), además de un enlace de retorno a detalles ("&larr; Ver detalles del cuarto").
- **Razón**: Ofrece un contexto claro sobre qué inmueble se está consultando y una navegación fluida hacia atrás.

## Risks / Trade-offs

- **[Riesgo] Clic adicional para contactar desde la página de detalles** → *Mitigación*: El botón de WhatsApp sigue disponible de inmediato en la tarjeta de contacto y en el botón flotante general; quienes prefieran el formulario disponen de un botón claro que los lleva a la vista dedicada sin distracciones.
- **[Riesgo] Enlaces desactualizados apuntando a `/detalle#contacto`** → *Mitigación*: Se auditan y actualizan tanto el `Navbar.astro` como el `Footer.astro`, así como la redirección interna si se accede por ancla.
