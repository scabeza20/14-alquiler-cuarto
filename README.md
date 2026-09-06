# Sitio Web de Alquiler de Apartamento en Tocumen

Sitio web moderno, responsivo y de alto rendimiento desarrollado en **Astro 5** con **CSS Vanilla**, adaptado para la comercialización y captación de interesados en el alquiler de un apartamento independiente en La Siesta de Tocumen, Panamá.

---

## 🌟 Características

- **2 Páginas Principales**:
  - `/` (**Inicio**): Hero de impacto, tarjeta destacada con especificaciones clave, métricas rápidas ($250/mes, 200 m², 1 baño, 50% de depósito) y previsualización de galería.
  - `/detalle` (**Detalles y Fotos**): Galería interactiva con 8 fotografías reales en WebP, cuadrícula de características, desglose de requisitos y mascotas, enlace a Google Maps y formulario de contacto.
- **Botón de WhatsApp**:
  - Enlace directo a la API de WhatsApp (`https://wa.me/50761196368?text=...`) con mensaje predeterminado.
  - El número de teléfono **no se muestra en texto plano visible** en la web para proteger la privacidad y evitar spam.
- **Formulario de Contacto con API Serverless**:
  - Endpoint en `/api/contact` procesado en el servidor bajo demanda con `@astrojs/vercel`.
  - Notificaciones enviadas directamente al correo **`scabeza@outlook.com`** usando [Resend](https://resend.com) (gratuito hasta 3,000 correos/mes) o [Web3Forms](https://web3forms.com).
- **Estilos 100% CSS Vanilla**:
  - Sistema de tokens de diseño nativos con variables CSS (`--color-nordic`, `--color-mosque`, `--color-clear-day`, etc.) extraídos de las plantillas de referencia.
  - Sin dependencias pesadas de Tailwind en tiempo de ejecución.

---

## 🚀 Comandos

| Comando | Acción |
| :--- | :--- |
| `pnpm install` | Instala las dependencias del proyecto |
| `pnpm dev` | Inicia el servidor de desarrollo local |
| `pnpm build` | Compila el sitio estático y la función Serverless para Vercel |
| `pnpm preview` | Previsualiza la compilación localmente |

---

## 📦 Despliegue en Vercel

1. **Subir el repositorio a GitHub**.
2. **Importar el proyecto en [Vercel](https://vercel.com)**:
   - Framework Preset: **Astro**
   - Build Command: `pnpm build`
   - Output Directory: Automatically detected (`.vercel/output` / default)
3. **Configurar las Variables de Entorno en el panel de Vercel** (`Settings > Environment Variables`):
   - `CONTACT_RECIPIENT_EMAIL`: `scabeza@outlook.com`
   - `RESEND_API_KEY`: Tu clave API gratuita de [Resend](https://resend.com) (e.g. `re_123456...`)
   *(Opcional si usas Web3Forms: `WEB3FORMS_ACCESS_KEY` con tu clave de Web3Forms)*.
4. **Desplegar**: Vercel compilará automáticamente las páginas estáticas y desplegará el endpoint `/api/contact` como Serverless Function sin costo.
