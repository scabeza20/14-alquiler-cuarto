## Purpose

Garantizar la resiliencia en la carga de estilos y tipografías ante navegadores con escudos de privacidad estrictos (Brave Shields), el correcto estado visual del selector de tema claro/oscuro y una experiencia responsiva óptima en dispositivos móviles para la navegación y la galería de fotos.

## ADDED Requirements

### Requirement: Carga de estilos y tipografías resistente a bloqueadores de privacidad
El sistema SHALL cargar todas las hojas de estilo y tipografías principales sin depender de llamadas de red a terceros susceptibles de bloqueo por escudos de privacidad (como Brave Shields), garantizando que el diseño y maquetación visual se apliquen íntegramente desde el primer renderizado.

#### Scenario: Carga en navegador con bloqueo de rastreadores y CDNs externas
- **WHEN** un usuario accede a cualquier página del sitio web en un navegador con escudos activos (como Brave con Brave Shields activado) o sin conexión a dominios externos de fuentes
- **THEN** el sitio web se visualiza con los estilos CSS completos, colores de tema y tipografía legible local o del sistema sin quedar en texto plano sin maquetación

### Requirement: Alternancia unívoca del icono en el selector de tema claro y oscuro
El botón de alternancia de tema SHALL renderizar exclusivamente un único icono representativo del cambio de estado disponible (icono de luna en modo claro para pasar a oscuro; icono de sol en modo oscuro para pasar a claro), impidiendo la superposición o visualización conjunta de ambos iconos.

#### Scenario: Visualización del botón en modo claro
- **WHEN** el sitio web se encuentra en modo claro (tema por defecto o seleccionado por el usuario)
- **THEN** el botón de cambio de tema muestra únicamente el icono de Luna centrado y oculta completamente el icono de Sol

#### Scenario: Visualización del botón en modo oscuro
- **WHEN** el sitio web se encuentra en modo oscuro (activado mediante el botón o preferencia del sistema)
- **THEN** el botón de cambio de tema muestra únicamente el icono de Sol centrado y oculta completamente el icono de Luna

### Requirement: Adaptación responsiva de la barra de navegación en pantallas móviles
La barra de navegación SHALL ajustar fluidamente sus elementos en viewports estrechos (anchos menores a 480px), asegurando que los enlaces de navegación, el selector de tema y el botón de contacto no generen desbordamiento horizontal (`horizontal overflow`) ni rotura visual de la cabecera.

#### Scenario: Navegación en viewport móvil estrecho
- **WHEN** un usuario visualiza la cabecera en un dispositivo con pantalla de ancho inferior o igual a 390px
- **THEN** todos los elementos de la barra de navegación permanecen dentro del ancho de la pantalla sin provocar scroll horizontal ni superposición de textos

### Requirement: Galería multimedia responsiva y optimizada para pantallas táctiles
La sección de galería de fotos en la página de detalle SHALL ofrecer un visor principal adaptable y un carrusel de miniaturas con navegación táctil fluida (`overflow-x: auto` con snap o desplazamiento suave) que impida el desbordamiento o deformación de las imágenes en pantallas móviles.

#### Scenario: Interacción con miniaturas en pantalla móvil
- **WHEN** el usuario navega en la sección de detalles (`/detalle`) desde un teléfono móvil
- **THEN** las miniaturas de la galería se organizan de forma accesible, permitiendo desplazamiento táctil horizontal fluido y visualización sin cortes de la imagen principal activa
