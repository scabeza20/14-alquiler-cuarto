# Capability Spec: alquiler-cuarto

## Purpose
Proveer una solución web en Astro para la presentación y captación de interesados en el alquiler de un apartamento independiente en Tocumen, Panamá, compuesta por 2 páginas (Home y Detalle), estilizada con CSS Vanilla, con botón directo a WhatsApp (sin exponer el número en texto) y conectada a una API de formulario desplegable en Vercel con destino a `scabeza@outlook.com`.

## Requirements

### Requirement: Presentación en Página Principal (Home)
La página de inicio (`/`) SHALL presentar la oferta del apartamento de alquiler de manera directa e intuitiva, adaptando el estilo visual de la plantilla `resources/home_discover_screen`, omitiendo cualquier barra de búsqueda o filtros de múltiples inmuebles.

#### Scenario: Visualización del Home
- GIVEN un usuario visitante que ingresa a la raíz del sitio web (`/`)
- WHEN la página carga
- THEN se muestra una cabecera con navegación al Home, a Detalles y botón directo a WhatsApp
- AND se muestra un Hero con título atractivo enfocado en el alquiler en Tocumen y llamada a la acción principal ("Ver Detalles" y "Chatear por WhatsApp")
- AND se muestra una tarjeta destacada con información resumen (precio $250/mes negociable, 200 m², Tocumen, promoción del 50% en depósito)
- AND NO se muestra barra de búsqueda ni filtros de categorías ("House", "Apartment", etc.).

---

### Requirement: Información Completa y Galería en Página de Detalle
La página de detalle (`/detalle`) SHALL mostrar la totalidad de la información contenida en `info.md`, incluyendo galería con las 8 fotos de `resources/img`, características físicas, reglas y ubicación.

#### Scenario: Visualización de datos de la propiedad
- GIVEN un usuario visitante en la ruta `/detalle`
- WHEN la página carga
- THEN se muestra el precio destacado: `$250 Negociable` con etiqueta de promoción de 50% de depósito
- AND se muestra la ubicación detallada (Panamá, Ciudad de Panamá, Tocumen, Barriada La Siesta, Calle Amador) junto a un botón/enlace interactivo a Google Maps (`https://maps.app.goo.gl/wtWBXzSNpBpzRH1P9`)
- AND se muestra la cuadrícula de características principales: Espacio (200 m²), Baños (1 baño), Capacidad (Máximo 3 personas), Área de lavado y Entrada independiente
- AND se muestra la política de mascotas clara: "No se aceptan mascotas grandes, solo gatos y perros chicos"
- AND se muestra la descripción textual completa del inmueble.

#### Scenario: Navegación de la galería de fotos
- GIVEN el visitante en `/detalle`
- WHEN interactúa con las miniaturas o el carrusel de fotos
- THEN la imagen principal cambia activamente para mostrar la fotografía seleccionada en alta resolución entre las 8 fotos disponibles.

---

### Requirement: Botón de WhatsApp y Privacidad del Número de Contacto
El sitio web SHALL proporcionar un botón de contacto directo hacia la API de WhatsApp (`https://wa.me/50761196368?text=...`) y SHALL NOT mostrar el número telefónico en texto visible en ninguna parte de la interfaz pública.

#### Scenario: Acceso directo a chat de WhatsApp
- GIVEN un usuario interesado en consultar por chat
- WHEN hace clic o pulsa el botón de WhatsApp (en navbar, tarjeta o página de detalle)
- THEN se abre WhatsApp Web o la aplicación móvil de WhatsApp dirigiéndose al chat con el mensaje predeterminado: *"Hola, estoy interesado en el apartamento en alquiler en La Siesta de Tocumen."*

#### Scenario: No exposición del número en texto plano
- GIVEN cualquier página pública del sitio (`/` o `/detalle`)
- WHEN se inspecciona el texto visible o el contenido de los elementos
- THEN el número `+50761196368` no aparece como texto renderizado para lectura, evitando la recolección automática de datos o spam.

---

### Requirement: Formulario de Contacto y Endpoint API con Destino a Correo
La página de detalle SHALL incluir un formulario de contacto que envíe los datos del interesado a un endpoint API de Astro (`/api/contact`), el cual notificará al correo `scabeza@outlook.com` mediante un servicio gratuito en la nube.

#### Scenario: Envío exitoso de consulta al correo del propietario
- GIVEN un visitante completa los campos obligatorios del formulario (Nombre, Teléfono o WhatsApp del interesado, Correo electrónico y Mensaje)
- WHEN presiona el botón "Enviar Mensaje"
- THEN el cliente envía una petición `POST` en formato JSON a `/api/contact`
- AND el endpoint valida que los campos requeridos no estén vacíos y tengan formato válido
- AND el endpoint despacha la notificación con los datos de contacto hacia `scabeza@outlook.com` a través del servicio configurado (Resend o Web3Forms)
- AND el cliente recibe una respuesta HTTP 200 `{ success: true, message: "Mensaje enviado exitosamente" }`
- AND el formulario muestra un mensaje de confirmación amigable y resetea sus campos.

#### Scenario: Error de validación en el formulario
- GIVEN un visitante envía el formulario con datos incompletos o correo inválido
- WHEN presiona el botón "Enviar Mensaje"
- THEN el formulario previene el envío o el endpoint retorna HTTP 400 con los errores específicos
- AND se muestra un mensaje de alerta visible en el formulario para que el usuario corrija los datos.

---

### Requirement: Estilos Exclusivos en CSS Vanilla
Todo el diseño y maquetación SHALL estar construido con CSS Vanilla moderno, sin dependencias de Tailwind CDN ni librerías CSS pesadas.

#### Scenario: Renderizado consistente y responsivo
- GIVEN cualquier dispositivo (móvil, tablet o escritorio)
- WHEN se visualiza cualquier página del sitio
- THEN los estilos responden fluidamente mediante Flexbox, CSS Grid y Media Queries
- AND se aplican los tokens de diseño identificados en las plantillas (colores `--nordic`, `--mosque`, `--clear-day`, tipografía Inter, sombras suaves y bordes redondeados).

---

### Requirement: Soporte para Despliegue en Vercel
El proyecto SHALL incorporar el adaptador `@astrojs/vercel` para que las páginas estáticas se sirvan optimizadas y el endpoint `/api/contact` se ejecute como función Serverless en Vercel.

#### Scenario: Compilación para Vercel
- GIVEN el proyecto con `@astrojs/vercel` configurado en `astro.config.mjs`
- WHEN se ejecuta `astro build`
- THEN la compilación genera la salida compatible con la plataforma Vercel sin errores.
