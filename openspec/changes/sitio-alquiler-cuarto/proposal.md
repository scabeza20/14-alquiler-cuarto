# Proposal: Sitio Web para Alquiler de Cuarto en Tocumen

## Why

El propietario dispone de un apartamento/cuarto independiente para alquiler ubicado en La Siesta de Tocumen, Panamá, a un precio de $250/mes (negociable) y con una promoción especial de 50% de descuento en el depósito para ingresar. 

Para comercializar la propiedad eficazmente, se necesita un sitio web propio, moderno, ligero y profesional que:
1. Muestre de forma atractiva las fotos reales del inmueble y todas las condiciones clave (espacio de 200 m², baño privado, área de lavado, normas sobre mascotas, máximo 3 personas, ubicación en Google Maps).
2. Evite la sobrecarga de portales inmobiliarios que incluyen filtros y motores de búsqueda innecesarios para una sola propiedad.
3. Permita a los interesados ponerse en contacto directo a través de un formulario con notificación inmediata al correo del arrendador (`scabeza@outlook.com`).
4. Facilite el contacto rápido por WhatsApp mediante un botón directo a la API de chat web/móvil (`https://wa.me/...`), protegiendo el número telefónico de no ser expuesto en texto plano en la interfaz para prevenir spam.
5. Tenga un costo de infraestructura $0 (gratuito) mediante Astro, alojamiento en Vercel y un servicio de correos sin costo.

## What Changes

- **Arquitectura y Framework**: Astro (SSR / Serverless con `@astrojs/vercel`) alojado en Vercel.
- **2 Páginas Principales**:
  - `/` (**Home**): Basada en la plantilla `resources/home_discover_screen`, adaptada para una sola propiedad (sin buscador ni filtros). Incluye hero de bienvenida, tarjeta destacada con especificaciones principales, fotos destacadas y botones directos de llamada a la acción ("Ver detalles" y botón de WhatsApp).
  - `/detalle` (**Detalle de la Propiedad**): Basada en la plantilla `resources/property_details_screen`, con la información completa de `info.md`, galería de imágenes con las 8 fotos de `resources/img`, cuadrícula de características, desglose de requisitos, enlace directo a Google Maps, botón de WhatsApp y formulario de contacto.
- **Estilos en CSS Vanilla**:
  - Sistema de diseño extraído de las guías de diseño en `resources/` usando variables CSS (`--nordic`, `--mosque`, `--clear-day`), flexbox, CSS grid y diseño responsivo sin dependencias de frameworks CSS ni scripts externos pesados.
- **Formulario de Contacto & Endpoint API**:
  - Formulario interactivo en `/detalle` con validación y estados de envío (cargando, éxito, error).
  - Endpoint en Astro `/api/contact` que procesa la petición de forma segura en servidor y envía los datos directamente al correo `scabeza@outlook.com` mediante un servicio gratuito (Resend o Web3Forms).
- **Integración de WhatsApp (API Web / Móvil)**:
  - Botón de WhatsApp integrado (`https://wa.me/50761196368?text=...`) con mensaje predeterminado.
  - El número de teléfono `+50761196368` **no se muestra en texto visible** en la web; solo se invoca mediante el botón hacia la app de WhatsApp.
- **Adaptador Vercel**:
  - Configuración de `@astrojs/vercel` en `astro.config.mjs` para permitir la ejecución de endpoints de servidor (Serverless Functions) en Vercel en la capa gratuita.

## Recomendación de Servicio Gratuito para el Formulario

Para el envío de correos desde la API de Astro hacia `scabeza@outlook.com` sin costo alguno, se evalúan y recomiendan las siguientes opciones:

1. **Resend (Opción Recomendada)**
   - **Plan Gratuito**: 3,000 correos al mes (hasta 100/día), 100% gratis para siempre.
   - **Ventajas**: API ultra moderna, SDK oficial de TypeScript (`resend`), tiempos de respuesta inferiores a 200ms, integración perfecta con funciones Serverless en Vercel.
   - **Uso**: Permite enviar notificaciones directamente a `scabeza@outlook.com` mediante una variable de entorno `RESEND_API_KEY`.
2. **Web3Forms (Alternativa sin configuración de dominio)**
   - **Plan Gratuito**: 250 envíos al mes sin costo.
   - **Ventajas**: No requiere configurar registros DNS de dominio; basta con obtener un Access Key gratuito en web3forms.com vinculado a `scabeza@outlook.com` y enviar vía `fetch` desde el backend de Astro.
3. **Telegram Bot API (Alternativa para alertas inmediatas al celular)**
   - **Plan Gratuito**: 100% gratuito e ilimitado.
   - **Ventajas**: El arrendador recibe un mensaje instantáneo en su celular vía Telegram con los datos del interesado (nombre, teléfono, mensaje), ideal si no revisa el correo con frecuencia.

## Capabilities

### New Capabilities
- `alquiler-cuarto`: Presentación del inmueble, navegación de dos páginas (Home y Detalle), visualizador de fotos reales, presentación de datos de ubicación/precios/reglas, botón de contacto a WhatsApp sin exponer el número en texto, y procesamiento de contactos vía API en Astro con adaptador Vercel y CSS Vanilla enviando a `scabeza@outlook.com`.

## Scope & Non-Goals

### In Scope
- Creación de páginas `src/pages/index.astro` y `src/pages/detalle.astro`.
- Integración de las 8 fotos de `resources/img/` en `public/img/`.
- Integración de los datos completos de `info.md`.
- Envío de notificaciones del formulario al correo `scabeza@outlook.com`.
- Botón de WhatsApp conectado a la API (`https://wa.me/50761196368`), ocultando el número en texto plano.
- Estilos 100% CSS Vanilla emulando la estética de `resources/home_discover_screen` y `resources/property_details_screen`.
- Configuración de `@astrojs/vercel` en `astro.config.mjs`.
- Endpoint `src/pages/api/contact.ts` para gestionar el formulario.
- Enlace directo a Google Maps (`https://maps.app.goo.gl/wtWBXzSNpBpzRH1P9`).

### Non-Goals
- Mostrar el número telefónico como texto visible en las páginas.
- Buscador o filtros de propiedades (solo existe 1 propiedad).
- Catálogo de múltiples inmuebles.
- Pasarela de pago o reservas en línea.
- Base de datos relacional externa (no requerida para una sola propiedad).
- Frameworks CSS (Tailwind, Bootstrap, etc.) o librerías de UI complejas.
