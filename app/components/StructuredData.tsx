"use client";

import { contactInfo, companyInfo } from "@/data";

export default function StructuredData() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "@id": "https://owlighting.com",
    name: "Owlighting Garage",
    alternateName: "Owlighting",
    description: companyInfo.description,
    url: "https://owlighting.com",
    telephone: contactInfo.phone,
    email: contactInfo.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Danau Km.1, Sumberjo",
      addressLocality: "Way Jepara",
      addressRegion: "Lampung Timur",
      postalCode: "34396",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -5.234567, // Ganti dengan koordinat asli dari Google Maps
      longitude: 105.678901,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    sameAs: [
      contactInfo.socialMedia.instagram,
      contactInfo.socialMedia.facebook,
      contactInfo.socialMedia.tiktok,
    ],
    hasMap: contactInfo.googleMapsUrl,
    paymentAccepted: "Cash, Transfer",
    currenciesAccepted: "IDR",
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: -5.234567,
        longitude: 105.678901,
      },
      geoRadius: "100000", // 100km radius
    },
    slogan: "#MenolakGelap - Custom Pencahayaan Kendaraan Presisi",
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Owlighting Garage",
    url: "https://owlighting.com",
    logo: "https://owlighting.com/logo.png",
    description:
      "Spesialis BILED retrofit dan custom pencahayaan kendaraan di Lampung Timur",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Danau Km.1, Sumberjo",
      addressLocality: "Way Jepara",
      addressRegion: "Lampung Timur",
      postalCode: "34396",
      addressCountry: "ID",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: contactInfo.phone,
      contactType: "customer service",
      availableLanguage: ["Indonesian"],
    },
  };

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Automotive Lighting Services",
    provider: {
      "@type": "AutomotiveBusiness",
      name: "Owlighting Garage",
    },
    areaServed: {
      "@type": "State",
      name: "Lampung",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Layanan Pencahayaan Kendaraan",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "BILED Retrofit",
            description:
              "Retrofit lampu BILED dengan cut-off RHD presisi untuk mobil dan motor",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "D2 Laser / Foglamp",
            description: "Instalasi D2 Laser dan foglamp custom",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom CNC & 3D Printing",
            description:
              "Custom DRL, lazy eyes, dan fabrication dengan CNC & 3D printing",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Slimframe",
            description: "Frame custom ultra tipis untuk headlight",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Akrilik",
            description: "Produksi custom akrilik untuk otomotif",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Neon Box & Huruf Timbul",
            description: "Pembuatan neon box dan neonbox huruf timbul",
          },
        },
      ],
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://owlighting.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://owlighting.com/#services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "About",
        item: "https://owlighting.com/about",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Portfolio",
        item: "https://owlighting.com/portfolio",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
