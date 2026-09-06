import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

interface ContactPayload {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get('content-type') || '';
    let data: ContactPayload = {};

    if (contentType.includes('application/json')) {
      data = await request.json();
    } else if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      data = {
        name: formData.get('name')?.toString(),
        phone: formData.get('phone')?.toString(),
        email: formData.get('email')?.toString(),
        message: formData.get('message')?.toString(),
      };
    } else {
      return new Response(
        JSON.stringify({ success: false, error: 'Formato de solicitud no soportado' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { name, phone, email, message } = data;

    // Validación de campos
    if (!name || name.trim().length < 2) {
      return new Response(
        JSON.stringify({ success: false, error: 'Por favor ingresa tu nombre completo.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!phone || phone.trim().length < 7) {
      return new Response(
        JSON.stringify({ success: false, error: 'Por favor ingresa un número de teléfono o WhatsApp válido.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return new Response(
        JSON.stringify({ success: false, error: 'Por favor ingresa un correo electrónico válido.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!message || message.trim().length < 4) {
      return new Response(
        JSON.stringify({ success: false, error: 'Por favor escribe un mensaje o consulta.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Correo de destino y credenciales (compatible con Astro y Node/Vercel)
    const recipientEmail = 
      import.meta.env.CONTACT_RECIPIENT_EMAIL || 
      process.env.CONTACT_RECIPIENT_EMAIL || 
      'scabeza@outlook.com';
    const resendApiKey = 
      import.meta.env.RESEND_API_KEY || 
      process.env.RESEND_API_KEY;
    const web3formsKey = 
      import.meta.env.WEB3FORMS_ACCESS_KEY || 
      process.env.WEB3FORMS_ACCESS_KEY;

    const emailHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #006655; margin-top: 0;">Nuevo Interesado en el Alquiler del Cuarto</h2>
        <p style="color: #555; font-size: 14px;">Has recibido una nueva solicitud de información desde el sitio web.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; color: #777; width: 140px;"><strong>Nombre:</strong></td>
            <td style="padding: 8px 0; color: #19322F;">${escapeHtml(name.trim())}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #777;"><strong>Teléfono/WhatsApp:</strong></td>
            <td style="padding: 8px 0; color: #19322F;">
              <a href="https://wa.me/${escapeHtml(phone.replace(/[^0-9]/g, ''))}" style="color: #006655; text-decoration: none; font-weight: 600;">
                ${escapeHtml(phone.trim())} (Abrir en WhatsApp)
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #777;"><strong>Correo:</strong></td>
            <td style="padding: 8px 0; color: #19322F;">
              <a href="mailto:${escapeHtml(email.trim())}" style="color: #006655; text-decoration: none;">
                ${escapeHtml(email.trim())}
              </a>
            </td>
          </tr>
        </table>
        
        <div style="margin-top: 20px; background-color: #f9fbfb; padding: 15px; border-left: 4px solid #006655; border-radius: 4px;">
          <strong style="color: #19322F; display: block; margin-bottom: 8px;">Mensaje:</strong>
          <p style="color: #333; margin: 0; line-height: 1.5; white-space: pre-wrap;">${escapeHtml(message.trim())}</p>
        </div>
        
        <p style="margin-top: 25px; font-size: 12px; color: #888; text-align: center;">
          Apartamento en La Siesta de Tocumen, Panamá &bull; Alquiler \$250/mes
        </p>
      </div>
    `;

    // 1. Envío mediante Resend si está disponible
    if (resendApiKey && resendApiKey !== 're_your_api_key_here') {
      const resend = new Resend(resendApiKey);
      const { error: emailError } = await resend.emails.send({
        from: 'Alquiler Tocumen <onboarding@resend.dev>',
        to: [recipientEmail],
        replyTo: email.trim(),
        subject: `Nuevo Interesado: Alquiler Tocumen - ${name.trim()}`,
        html: emailHtml,
      });

      if (emailError) {
        console.error('Error enviando con Resend:', emailError);
        throw new Error(emailError.message);
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: '¡Gracias por contactarnos! Tu mensaje fue enviado con éxito. Te responderemos a la brevedad.' 
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 2. Envío mediante Web3Forms si está configurado
    if (web3formsKey) {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: web3formsKey,
          to: recipientEmail,
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          message: message.trim(),
          subject: `Nuevo Interesado: Alquiler Tocumen - ${name.trim()}`,
        }),
      });

      const resJson = await response.json();
      if (!resJson.success) {
        throw new Error(resJson.message || 'Error en Web3Forms');
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: '¡Gracias por contactarnos! Tu mensaje fue enviado con éxito. Te responderemos a la brevedad.' 
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 3. Fallback de desarrollo local / Sin API keys configuradas
    console.log('--- [DEV] NUEVO CONTACTO RECIBIDO (Fallback local) ---');
    console.log('Destino:', recipientEmail);
    console.log('Nombre:', name.trim());
    console.log('Teléfono:', phone.trim());
    console.log('Email:', email.trim());
    console.log('Mensaje:', message.trim());
    console.log('----------------------------------------------------');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: '¡Gracias por contactarnos! Tu mensaje fue recibido correctamente. Te responderemos pronto.' 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error procesando formulario de contacto:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Hubo un inconveniente al enviar tu mensaje. Por favor intenta de nuevo o escríbenos directamente por WhatsApp.' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
