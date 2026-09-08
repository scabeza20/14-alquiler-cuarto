export interface PropertyImage {
  id: number;
  src: string;
  alt: string;
  title: string;
}

export interface PropertyData {
  title: string;
  tagline: string;
  price: number;
  priceFormatted: string;
  priceNote: string;
  depositPromo: string;
  area: number;
  areaUnit: string;
  bathrooms: number;
  maxOccupancy: number;
  occupancyNote: string;
  petPolicy: string;
  description: string;
  location: {
    country: string;
    city: string;
    corregimiento: string;
    barriada: string;
    street: string;
    fullAddress: string;
    googleMapsUrl: string;
  };
  contact: {
    recipientEmail: string;
    whatsappUrl: string;
  };
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
  images: PropertyImage[];
}

export const property: PropertyData = {
  title: "Apartamento Independiente en Tocumen",
  tagline: "Espacio cómodo, privado y accesible en La Siesta de Tocumen",
  price: 250,
  priceFormatted: "$250",
  priceNote: "Negociable",
  depositPromo:
    "Promoción especial: 50% de descuento en el depósito para ingresar",
  area: 25,
  areaUnit: "m²",
  bathrooms: 1,
  maxOccupancy: 3,
  occupancyNote: "Máximo 3 personas (preferiblemente parejas)",
  petPolicy: "No se aceptan mascotas",
  description:
    "Apartamento en la siesta de Tocumen, con entrada independiente, baño, área de lavado, servicios de agua y luz destacados sin irregularidades, para maximo 3 personas, no se aceptan perros grandes, promoción de la mitad del precio del deposito para ingresar, muy cerca de la parada de buses, comercios y zona paga la Siesta, centrico respecto al metro de la 24 de diciembre.",
  location: {
    country: "Panamá",
    city: "Panamá",
    corregimiento: "Tocumen",
    barriada: "La Siesta",
    street: "Calle Amador",
    fullAddress:
      "Calle Amador, Barriada La Siesta, Corregimiento de Tocumen, Ciudad de Panamá, Panamá",
    googleMapsUrl: "https://maps.app.goo.gl/wtWBXzSNpBpzRH1P9",
  },
  contact: {
    recipientEmail: "scabeza@outlook.com",
    whatsappUrl:
      "https://wa.me/50761196368?text=Hola,%20estoy%20interesado%20en%20el%20alquiler%20del%20cuarto%20en%20La%20Siesta%20de%20Tocumen",
  },
  features: [
    {
      icon: "door_front",
      title: "Entrada Independiente",
      description: "Total privacidad y autonomía de acceso.",
    },
    {
      icon: "shower",
      title: "Baño Completo Privado",
      description: "1 baño higiénico y reservado para el apartamento.",
    },
    {
      icon: "local_laundry_service",
      title: "Área de Lavado",
      description: "Espacio dedicado para lavado y tendido.",
    },
    {
      icon: "square_foot",
      title: "200 m² de Espacio",
      description: "Espacio amplio para mayor confort.",
    },
    {
      icon: "group",
      title: "Hasta 3 Personas",
      description: "Ambiente tranquilo, ideal para parejas o personas solas.",
    },
    {
      icon: "pets",
      title: "No se aceptan mascotas",
      description: "No hay suficiente espacio para animales",
    },
    {
      icon: "payments",
      title: "50% Depósito",
      description: "Facilidad de ingreso con la mitad del depósito inicial.",
    },
    {
      icon: "location_on",
      title: "Excelente Ubicación",
      description:
        "En La Siesta de Tocumen, con fácil acceso a transporte y comercios.",
    },
  ],
  images: [
    {
      id: 1,
      src: "/img/foto-1.webp",
      alt: "Vista principal del apartamento",
      title: "Área Principal",
    },
    {
      id: 2,
      src: "/img/foto-2.webp",
      alt: "Vista interior del apartamento",
      title: "Interior",
    },
    {
      id: 3,
      src: "/img/foto-3.webp",
      alt: "Distribución interior de la habitación",
      title: "Habitación",
    },
    {
      id: 4,
      src: "/img/foto-4.webp",
      alt: "Detalle de la habitación y acabados",
      title: "Detalle de la Habitación",
    },
    {
      id: 5,
      src: "/img/foto-5.webp",
      alt: "Baño completo independiente",
      title: "Baño Privado",
    },
    {
      id: 6,
      src: "/img/foto-6.webp",
      alt: "Área de lavado y servicios",
      title: "Área de Lavado",
    },
    {
      id: 7,
      src: "/img/foto-7.webp",
      alt: "Entrada independiente y pasillo",
      title: "Entrada Independiente",
    },
    {
      id: 8,
      src: "/img/foto-8.webp",
      alt: "Entorno y acceso al apartamento",
      title: "Acceso Exterior",
    },
  ],
};
