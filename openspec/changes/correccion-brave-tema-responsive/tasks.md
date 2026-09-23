## 1. Fuentes y estilos resistentes a Brave Shields y escudos de privacidad

- [x] 1.1 Incorporar la tipografía Inter localmente mediante `@fontsource/inter` o assets estáticos y configurar `src/styles/global.css` con fallback de fuentes del sistema robusto; verificar que los archivos de fuentes se empaqueten localmente.
- [x] 1.2 Limpiar `src/layouts/Layout.astro` eliminando los preconnects y `<link media="print" onload="...">` hacia `fonts.googleapis.com`/`fonts.gstatic.com`, asegurando que la carga de estilos sea 100% autónoma y no bloqueable por Brave Shields; verificar la correcta aplicación de estilos offline o con bloqueo de dominios de terceros.

## 2. Botón de alternancia de tema claro/oscuro

- [x] 2.1 Corregir la especificidad de los selectores CSS de los iconos SVG en `src/components/Navbar.astro` (y `src/components/Icon.astro` si aplica), garantizando que en modo claro solo se muestre `.icon-dark` (icono de luna) y en modo oscuro solo `.icon-light` (icono de sol).
- [x] 2.2 Probar la alternancia de tema en navegador y verificar visualmente que en ningún caso aparezcan los dos iconos simultáneamente ni el botón pierda su alineación centrada.

## 3. Responsividad móvil de la barra de navegación

- [x] 3.1 Añadir reglas de medios (`@media (max-width: 480px)`) en `src/components/Navbar.astro` para compactar paddings, ajustar tamaños de texto y asegurar que los enlaces y botones de acción quepan dentro de 360px-390px sin desbordamiento horizontal.
- [x] 3.2 Verificar en emulación de pantalla móvil (360px a 390px) que la barra de navegación no cause scroll horizontal (`overflow-x`) en la página.

## 4. Optimización responsiva de la galería de fotos

- [x] 4.1 Modificar `src/components/Gallery.astro` y `src/pages/detalle.astro` para configurar `.thumbnails-track` con `overflow-x: auto`, scroll snap horizontal, `-webkit-overflow-scrolling: touch;` y dimensiones adaptadas para móviles pequeños (60px-70px).
- [x] 4.2 Probar la navegación táctil de miniaturas y la visualización de la foto principal en la página de `/detalle` simulando dispositivos móviles, verificando que no existan desbordamientos ni recortes extraños.

## 5. Verificación final y compilación

- [x] 5.1 Ejecutar `pnpm build` y verificar que el proyecto compila limpiamente sin errores de TypeScript ni advertencias de assets.
- [x] 5.2 Realizar comprobación con Lighthouse y DevTools para certificar que el rendimiento se mantiene en niveles óptimos y los tres problemas reportados quedan completamente subsanados.
