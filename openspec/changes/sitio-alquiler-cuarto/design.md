# Design: Sitio Web para Alquiler de Cuarto en Tocumen

## Overview

Este documento detalla el diseño técnico y arquitectónico para la construcción del sitio web de alquiler del apartamento/cuarto en Tocumen, Panamá. El proyecto se basa en **Astro**, estilizado al 100% con **CSS Vanilla**, alojado en **Vercel** mediante el adaptador oficial, y con un endpoint API para el procesamiento del formulario de contacto conectado a un servicio gratuito con destino al correo `scabeza@outlook.com`. Además, se integra un botón directo a la API de WhatsApp, garantizando que el número telefónico no sea expuesto en texto plano en la interfaz pública.

---

## 1. Arquitectura y Decisiones Técnicas

### 1.1 Modo de Renderizado en Astro
- **Adaptador**: `@astrojs/vercel` configurado en `astro.config.mjs`.
- **Estrategia de Renderizado**:
  - Las 2 páginas (`/` y `/detalle`) se renderizan de forma estática o pre-renderizada para máxima velocidad de carga (LCP óptimo y SEO).
  - El endpoint `/api/contact.ts` opera con `export const prerender = false;` para ejecutarse como función Serverless bajo demanda en Vercel.

### 1.2 Estructura de Archivos y Componentes

```
14-alquiler-cuarto/
├── public/
│   ├── favicon.svg
│   └── img/
│       ├── foto-1.jpg  # Copias de las 8 imágenes de resources/img
│       ├── foto-2.jpg
│       └── ...
├── src/
│   ├── layouts/
│   │   └── Layout.astro        # Layout común con fuentes, head, navbar, footer y botón flotante WhatsApp
│   ├── styles/
│   │   └── global.css          # Variables CSS, reset, tipografía y utilidades
│   ├── components/
│   │   ├── Navbar.astro        # Barra de navegación limpia (Home, Detalle, Botón WhatsApp)
│   │   ├── Footer.astro        # Pie de página con información y enlaces (sin número en texto)
│   │   ├── Gallery.astro       # Galería interactiva para las 8 fotos
│   │   ├── WhatsAppButton.astro # Componente reutilizable de botón WhatsApp (API wa.me)
│   │   └── ContactForm.astro   # Formulario de contacto con validación y fetch
│   ├── pages/
│   │   ├── index.astro         # Página de inicio (Home)
│   │   ├── detalle.astro       # Página de detalle con info completa, WhatsApp y formulario
│   │   └── api/
│   │       └── contact.ts      # Endpoint Serverless que envía notificaciones a scabeza@outlook.com
│   └── data/
│       └── property.ts         # Objeto tipado con datos de info.md (correo destino y enlace a WhatsApp)
├── astro.config.mjs
└── package.json
```

---

## 2. Sistema de Diseño (CSS Vanilla)

A partir de las plantillas en `resources/home_discover_screen` y `resources/property_details_screen`, se extraen los valores exactos para crear un sistema de diseño nativo en CSS sin dependencias externas:

### 2.1 Variables CSS (`src/styles/global.css`)
```css
:root {
  /* Paleta de Colores */
  --color-nordic: #19322F;           /* Texto principal y acentos oscuros */
  --color-nordic-muted: #5C706D;     /* Texto secundario y etiquetas */
  --color-mosque: #006655;           /* Color primario corporativo */
  --color-mosque-hover: #005544;     /* Hover en botones principales */
  --color-mosque-light: #e6f0ee;     /* Fondos suaves y badges */
  --color-clear-day: #EEF6F6;        /* Fondo general de la aplicación */
  --color-white: #FFFFFF;            /* Fondo de tarjetas y superficies */
  --color-whatsapp: #25D366;         /* Color oficial de WhatsApp */
  --color-whatsapp-hover: #20BA5A;
  --color-error: #D32F2F;
  --color-success: #2E7D32;

  /* Tipografía */
  --font-display: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  /* Bordes y Sombras */
  --radius-sm: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --radius-full: 9999px;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.05);
  --shadow-card: 0 4px 12px -2px rgba(25, 50, 47, 0.06);
  --shadow-hover: 0 10px 25px -5px rgba(25, 50, 47, 0.12);

  /* Espaciado y Layout */
  --container-max: 1200px;
}
```

### 2.2 Estrategia de Estilos
- **Reset y Tipografía Global**: Se definen en `global.css`.
- **Componentes BEM / Clases Semánticas**: Cada componente Astro (`Navbar`, `Gallery`, `ContactForm`, `WhatsAppButton`) tendrá estilos encapsulados (`<style>`) o clases descriptivas (`.btn-primary`, `.btn-whatsapp`, `.property-card`, etc.) garantizando cero colisiones.
- **Responsividad**: Media queries fluidas `@media (max-width: 768px)` y `@media (max-width: 1024px)`.

---

## 3. Adaptación de las Páginas y Privacidad de Contacto

### 3.1 Política de Privacidad de Datos y WhatsApp
- **Número de Contacto**: `+50761196368` **NO se mostrará en texto visible** en la web (ni en el footer ni en la tarjeta ni en textos descriptivos).
- **Integración API WhatsApp**: Se implementa a través de la URL oficial:
  `https://wa.me/50761196368?text=Hola,%20estoy%20interesado%20en%20el%20apartamento%20en%20alquiler%20en%20La%20Siesta%20de%20Tocumen.`
  Esto abre directamente el cliente nativo o WhatsApp Web con el mensaje prearmado sin necesidad de que el usuario tenga que copiar o ver el número en la interfaz.

### 3.2 Página Home (`/`)
- **Modificaciones respecto al template original**:
  - **Se eliminan**: Barra de búsqueda ("Search by city..."), píldoras de filtrado ("House", "Apartment", "Villa"), botón de "Filters", y la sección de "New in market" con múltiples casas de prueba.
  - **Se enfoca en el inmueble único**:
    - **Hero**: Titular de impacto: *"Tu nuevo espacio en Tocumen: Tranquilidad, comodidad y ubicación accesible"*.
    - **Tarjeta Destacada Principal**: Imagen representativa del apartamento, precio visible `$250/mes (Negociable)`, badge de *"50% de descuento en depósito"*, especificaciones rápidas (200 m², 1 baño, máx 3 personas, entrada independiente), botón *"Ver fotos y detalles"* y botón *"Chatear por WhatsApp"*.
    - **Sección de Ventajas Clave**: 3 tarjetas de beneficios (Entrada independiente y privacidad, Ubicación en La Siesta de Tocumen, Flexibilidad y facilidad de ingreso).

### 3.3 Página de Detalle (`/detalle`)
- **Adaptada con la información real de `info.md`**:
  - **Galería Fotográfica**: Vista principal amplia con las 8 fotos reales tomadas del apartamento (`resources/img/`) y selector de miniaturas interactivo con borde activo `--color-mosque`.
  - **Bloque de Precios y Reglas**:
    - Precio: `$250 / mes (Negociable)`.
    - Promoción: `Mitad del depósito para ingresar`.
    - Mascotas: `Permitidas (gatos y perros chicos; no se aceptan mascotas grandes)`.
    - Ocupación: `Máximo 3 personas (preferiblemente para parejas)`.
  - **Cuadrícula de Características**:
    - 200 m² de espacio total.
    - 1 Baño completo.
    - Área de lavado.
    - Entrada independiente.
  - **Ubicación y Mapa**:
    - Dirección textual: *Calle Amador, Barriada La Siesta, Corregimiento de Tocumen, Ciudad de Panamá, Panamá*.
    - Botón de apertura directa hacia Google Maps (`https://maps.app.goo.gl/wtWBXzSNpBpzRH1P9`).
  - **Acciones de Contacto en la Barra Lateral/Inferior**:
    - **Botón destacado de WhatsApp**: Abre chat directo en WhatsApp con 1 clic.
    - **Formulario de Contacto**:
      - Nombre y Apellido.
      - Teléfono o WhatsApp de contacto del interesado.
      - Correo electrónico del interesado.
      - Mensaje o consulta.
      - Botón con feedback de carga y éxito.

---

## 4. API del Formulario (`scabeza@outlook.com`)

### 4.1 Destinatario y Servicio de Correo Gratuito
- **Destinatario de los mensajes**: `scabeza@outlook.com`.
- **Servicio Recomendado**:
  - **Resend**: Envía a `scabeza@outlook.com` desde `onboarding@resend.dev` o dominio propio. Se requiere variable `RESEND_API_KEY`.
  - **Web3Forms (Alternativa Directa sin registro de dominio)**: Solo necesita el Access Key gratuito vinculado a `scabeza@outlook.com`.
  - **Modo Desarrollo / Fallback**: Si no hay API key configurada localmente, imprime el contenido en la consola del servidor y retorna respuesta exitosa para pruebas de UI fluidas.

### 4.2 Especificación del Endpoint `/api/contact.ts`
- **Método**: `POST`
- **Content-Type**: `application/json`
- **Payload recibido**:
  ```json
  {
    "name": "Carlos Pérez",
    "phone": "+507 6123-4567",
    "email": "carlos@ejemplo.com",
    "message": "Buenas tardes, quisiera consultar si está disponible para mudarme el próximo mes."
  }
  ```
- **Contenido del Correo enviado a `scabeza@outlook.com`**:
  - Asunto: `Nuevo interesado en Alquiler de Cuarto en Tocumen - [Nombre]`
  - Cuerpo:
    - **Nombre**: Carlos Pérez
    - **Teléfono / WhatsApp**: +507 6123-4567
    - **Email**: carlos@ejemplo.com
    - **Mensaje**: ...
- **Validaciones**:
  - `name`: string no vacío, mínimo 2 caracteres.
  - `phone`: string no vacío, mínimo 7 dígitos.
  - `email`: formato de correo válido.
  - `message`: string no vacío.
- **Respuestas**:
  - `200 OK`: `{ "success": true, "message": "Mensaje recibido correctamente. Nos pondremos en contacto pronto." }`
  - `400 Bad Request`: `{ "success": false, "error": "Campos obligatorios incompletos o inválidos." }`
  - `500 Internal Error`: `{ "success": false, "error": "Hubo un problema al enviar el mensaje. Por favor intenta por el botón de WhatsApp." }`

---

## 5. Configuración de Despliegue en Vercel

1. **Instalación del adaptador**:
   ```bash
   pnpm add @astrojs/vercel
   ```
2. **Configuración en `astro.config.mjs`**:
   ```js
   import { defineConfig } from 'astro/config';
   import vercel from '@astrojs/vercel';

   export default defineConfig({
     output: 'static',
     adapter: vercel()
   });
   ```
3. **Variables de Entorno en Vercel**:
   - `CONTACT_RECIPIENT_EMAIL`: `scabeza@outlook.com`
   - `RESEND_API_KEY`: Clave de Resend (o `WEB3FORMS_ACCESS_KEY` según el servicio elegido).
