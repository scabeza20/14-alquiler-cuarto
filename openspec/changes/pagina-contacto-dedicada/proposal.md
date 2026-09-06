## Why

Actualmente, el formulario de contacto se encuentra incrustado en la página de detalles (`/detalle`), lo que sobrecarga visualmente la vista de especificaciones y fotos del apartamento. El usuario solicitó separar el formulario en su propia página dedicada (`/contacto`), agregando en `/detalle` un enlace claro y directo hacia ella. Esto mejora la experiencia de usuario, simplifica la página de detalles y brinda una interfaz más limpia, enfocada y accesible tanto en móvil como en escritorio.

## What Changes

- **Página de Contacto Dedicada**: Creación de `src/pages/contacto.astro` que presenta el formulario de contacto con un diseño centrado, limpio, con soporte para modo oscuro y botón directo a WhatsApp.
- **Simplificación de la Página de Detalles**: En `src/pages/detalle.astro`, retirar el formulario incrustado y reemplazarlo por un bloque o tarjeta de contacto clara con enlace/botón destacado hacia `/contacto` y el botón de WhatsApp existente.
- **Actualización de Navegación Global**:
  - En `src/components/Navbar.astro`, actualizar el enlace de "Contacto" para que apunte directamente a `/contacto` en lugar de `/detalle#contacto`, manteniendo el estado activo cuando se esté en dicha ruta.
  - En `src/components/Footer.astro`, actualizar el enlace rápido de "Contacto" a `/contacto`.

## Capabilities

### New Capabilities
- `pagina-contacto`: Implementación de una página dedicada de contacto (`/contacto`), actualización de la llamada a la acción en `/detalle` para redirir a `/contacto`, y sincronización de enlaces de navegación en Navbar y Footer.

### Modified Capabilities
<!-- None -->

## Impact

- **Nuevos archivos**: `src/pages/contacto.astro`
- **Archivos modificados**: `src/pages/detalle.astro`, `src/components/Navbar.astro`, `src/components/Footer.astro`
- **Endpoints y backend**: `src/pages/api/contact.ts` no se altera ni rompe; el formulario seguirá enviando sus solicitudes a este endpoint vía `POST`.
- **Rutas**: Se añade la ruta estática `/contacto` al bundle de Astro/Vercel.
