# Tasks: Sitio Web para Alquiler de Cuarto en Tocumen

## Phase 1: Configuración de Entorno, Dependencias y Recursos
- [x] 1.1 Instalar el adaptador oficial de Vercel `@astrojs/vercel` y librerías auxiliares requeridas (e.g. `resend`).
- [x] 1.2 Configurar `astro.config.mjs` con el adaptador de Vercel para soportar rutas estáticas y endpoints de API en Vercel.
- [x] 1.3 Copiar y organizar las 8 imágenes de `resources/img/` a `public/img/` con nombres normalizados (`foto-1.webp`, `foto-2.webp`, etc.).
- [x] 1.4 Configurar archivo de variables de entorno de ejemplo `.env.example` con `CONTACT_RECIPIENT_EMAIL=scabeza@outlook.com` y la clave para el servicio de correo gratuito (`RESEND_API_KEY`).

## Phase 2: Sistema de Diseño (CSS Vanilla) y Componentes Base
- [x] 2.1 Crear hoja de estilos global `src/styles/global.css` con variables CSS de la paleta Nordic/Mosque (`--color-nordic`, `--color-mosque`, `--color-clear-day`, `--color-whatsapp`, etc.), reset, tipografía `Inter` y clases de utilidad.
- [x] 2.2 Crear el layout principal `src/layouts/Layout.astro` importando fuentes de Google (`Inter`, Material Symbols), favicon y la hoja de estilos global.
- [x] 2.3 Crear componente reutilizable `src/components/WhatsAppButton.astro` configurado con enlace a la API `https://wa.me/50761196368?text=...` (sin texto plano del número visible).
- [x] 2.4 Crear componente de navegación `src/components/Navbar.astro` con enlaces a Home (`/`), Detalles (`/detalle`) y botón de WhatsApp.
- [x] 2.5 Crear componente de pie de página `src/components/Footer.astro` con información de ubicación, enlaces y derechos reservados (asegurando no mostrar el número de teléfono en texto).

## Phase 3: Capa de Datos Centralizada
- [x] 3.1 Crear `src/data/property.ts` con la información estructurada de `info.md`: precios, promoción, metros cuadrados, capacidad, políticas de mascotas, comodidades, dirección, enlace a Google Maps, correo destino `scabeza@outlook.com` y enlace API a WhatsApp.

## Phase 4: Implementación de la Página de Inicio (Home)
- [x] 4.1 Crear `src/pages/index.astro` adaptando el diseño de `resources/home_discover_screen/code.html` a CSS Vanilla.
- [x] 4.2 Diseñar el Hero de bienvenida enfocado en el alquiler en Tocumen (sin barra de búsqueda ni filtros).
- [x] 4.3 Construir la tarjeta destacada del apartamento con foto principal, precio ($250/mes negociable), badge del 50% de depósito, especificaciones rápidas, llamada a la acción hacia `/detalle` y botón directo a WhatsApp.
- [x] 4.4 Añadir sección de ventajas y comodidades destacadas (entrada independiente, privacidad, área de lavado).

## Phase 5: Implementación de la Página de Detalle y Galería
- [x] 5.1 Crear componente `src/components/Gallery.astro` con visualizador principal interactivo y cuadrícula/tira de miniaturas de las 8 fotografías.
- [x] 5.2 Crear `src/pages/detalle.astro` adaptando la maqueta de `resources/property_details_screen/code.html` a CSS Vanilla.
- [x] 5.3 Mostrar especificaciones completas: 200 m², 1 baño, máx 3 personas, área de lavado, política de mascotas y descripción detallada.
- [x] 5.4 Agregar tarjeta de ubicación con dirección completa y botón interactivo para abrir Google Maps.
- [x] 5.5 Integrar botón destacado de WhatsApp en el bloque de contacto de la página de detalle.

## Phase 6: Formulario de Contacto y Endpoint API
- [x] 6.1 Crear endpoint `src/pages/api/contact.ts` con `export const prerender = false` para procesar peticiones `POST`, validar datos y enviar correo a `scabeza@outlook.com` mediante Resend o Web3Forms con fallback a consola en desarrollo.
- [x] 6.2 Crear componente `src/components/ContactForm.astro` con campos de Nombre, Teléfono/WhatsApp del interesado, Email, Mensaje, validación HTML5 y envío asíncrono con feedback visual (cargando, éxito, error).

## Phase 7: Verificación, Pruebas y Despliegue
- [x] 7.1 Verificar responsividad en resoluciones móvil (375px, 414px), tablet (768px) y escritorio (1200px+).
- [x] 7.2 Verificar que el número telefónico (`+50761196368`) no aparezca como texto plano visible en el HTML renderizado de ninguna página, garantizando su privacidad.
- [x] 7.3 Probar el flujo completo de envío del formulario hacia `scabeza@outlook.com` y manejo de errores.
- [x] 7.4 Probar la redirección de los botones de WhatsApp hacia `https://wa.me/50761196368` con el mensaje predeterminado.
- [x] 7.5 Ejecutar `astro build` para certificar que el proyecto compila sin errores para Vercel.
- [x] 7.6 Documentar en `README.md` los pasos para configurar las variables de entorno en Vercel y desplegar el sitio.

## Phase 8: Ajustes de Modo Oscuro en Barra de Menú y Componentes
- [x] 8.1 Corregir el selector y tokens de modo oscuro en `Navbar.astro` y `global.css` para que la barra de navegación cambie su fondo, bordes y contraste correctamente.
- [x] 8.2 Auditar y asegurar que las reglas de selector de modo oscuro en componentes Astro utilicen `:global([data-theme="dark"])` o variables CSS.
- [x] 8.3 Verificar compilación con `astro build` y comprobar la correcta alternancia de temas.
