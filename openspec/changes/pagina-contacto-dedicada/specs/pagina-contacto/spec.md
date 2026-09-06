## Purpose

Proporciona una página dedicada de contacto para el apartamento en alquiler en Tocumen, separando el formulario de la página de detalles y enlazándolo claramente desde la navegación y la vista de detalles.

## ADDED Requirements

### Requirement: Dedicated Contact Page
The system MUST (el sistema DEBE) proveer una página accesible en la ruta `/contacto` que albergue el formulario de contacto para el apartamento en alquiler en Tocumen, con soporte para modo claro y oscuro, y acceso directo a WhatsApp.

#### Scenario: User navigates to contact page
- **WHEN** el usuario navega a la URL `/contacto` o hace clic en "Contacto" en la barra de navegación o pie de página
- **THEN** el sistema presenta una página dedicada con el formulario de contacto, información de contexto del apartamento y enlace a WhatsApp

#### Scenario: Form submission on dedicated page
- **WHEN** el usuario completa y envía el formulario de contacto en `/contacto`
- **THEN** el sistema procesa el envío mediante el endpoint `/api/contact` y muestra el mensaje de confirmación correspondiente

### Requirement: Property Details Contact Redirection
The property details page MUST (la página de detalles DEBE) reemplazar el formulario incrustado por un bloque o tarjeta de contacto con una llamada a la acción clara que redirija al usuario a la página dedicada `/contacto`.

#### Scenario: User views contact section in details page
- **WHEN** el usuario explora la sección de contacto o la barra lateral en `/detalle`
- **THEN** el sistema muestra un botón o enlace que dirige a `/contacto` junto con el botón de WhatsApp directo, sin renderizar los campos del formulario dentro de `/detalle`

### Requirement: Site Navigation Link to Contact
The site navigation components MUST (los componentes de navegación DEBEN) enlazar directamente a la ruta `/contacto` tanto en Navbar como en Footer.

#### Scenario: Navigation links redirect to dedicated contact page
- **WHEN** el usuario hace clic en el enlace "Contacto" en el Navbar o en el Footer
- **THEN** el navegador navega a `/contacto` y el Navbar resalta "Contacto" como la ruta activa
