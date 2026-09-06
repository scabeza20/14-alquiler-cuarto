## 1. Creación de la Página Dedicada de Contacto

- [x] 1.1 Crear `src/pages/contacto.astro` utilizando `Layout.astro`, incorporando el componente `ContactForm.astro`, encabezado de contacto, enlace de retorno a detalles y botón de WhatsApp, verificando que la página cargue correctamente en `/contacto`.
- [x] 1.2 Aplicar estilos responsive y soporte para tema claro/oscuro en `src/pages/contacto.astro`, verificando la correcta visualización en resoluciones móvil y escritorio.

## 2. Actualización de la Página de Detalles

- [x] 2.1 Modificar `src/pages/detalle.astro` para remover el formulario incrustado en la barra lateral y en su lugar implementar una tarjeta de contacto (CTA) con botón principal que enlace a `/contacto` y botón de WhatsApp, verificando que la página de detalles no contenga campos de formulario y que el enlace funcione.
- [x] 2.2 Ajustar la distribución y espaciado de la barra lateral en `src/pages/detalle.astro` para que la nueva tarjeta de contacto mantenga un diseño proporcionado.

## 3. Actualización de Navegación Global

- [x] 3.1 Actualizar `src/components/Navbar.astro` para que el enlace "Contacto" apunte a `/contacto` y active la clase `.active` cuando `currentPath === '/contacto'`, verificando el estado visual del enlace en la barra de navegación.
- [x] 3.2 Actualizar `src/components/Footer.astro` para que el enlace a "Contacto" dirija a `/contacto`, verificando la navegación desde el pie de página.

## 4. Verificación y Pruebas

- [x] 4.1 Realizar una prueba de envío de formulario en `/contacto` para verificar que la comunicación con `/api/contact` funcione de extremo a extremo con sus validaciones y mensajes.
- [x] 4.2 Ejecutar `astro check` y `astro build` para verificar que no existan errores de TypeScript ni fallas de compilación en las nuevas rutas.

## 5. Favicon de Casa y Optimización SEO

- [x] 5.1 Diseñar e implementar un favicon SVG (`public/favicon.svg`) con estética de casa moderna / apartamento alineado con la paleta Mosque (#006655) y Nordic (#19322F), verificando que se cargue correctamente como favicon del sitio.
- [x] 5.2 Auditar y optimizar etiquetas SEO en `Layout.astro` (canonical, Open Graph completo, Twitter Cards, robots, Schema.org estructurado JSON-LD) y en las páginas `/`, `/detalle` y `/contacto`.
- [x] 5.3 Verificar compilación con `astro build` y comprobar los metadatos generados en el HTML renderizado.
