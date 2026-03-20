"use client";

import { contactInfo } from "@/data";

export default function StructuredData() {
  // Local Business Schema - Highly optimized for "custom biled" keyword
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["AutomotiveBusiness", "AutoRepair", "LocalBusiness"],
    "@id": "https://owlighting-garage.vercel.app/#business",
    name: "Owlighting Garage - Custom BILED Lampung Timur",
    alternateName: ["Owlighting", "Owlighting Custom BILED", "Bengkel Custom BILED Lampung Timur"],
    description:
      "Owlighting adalah bengkel spesialis Custom BILED di Lampung Timur. Jasa pasang BILED mobil & motor, retrofit projector, D2 Laser, DRL Matrix, poles kaca lampu nano burn dengan garansi resmi. Konsultasi GRATIS!",
    url: "https://owlighting-garage.vercel.app",
    telephone: contactInfo.phone,
    email: contactInfo.email,
    priceRange: "Rp 1.500.000 - Rp 5.000.000",
    currenciesAccepted: "IDR",
    paymentAccepted: ["Cash", "Transfer Bank", "QRIS"],
    image: [
      "https://owlighting-garage.vercel.app/og-image.jpg",
      "https://owlighting-garage.vercel.app/assets/logo.png"
    ],
    logo: "https://owlighting-garage.vercel.app/assets/logo.png",
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
      latitude: -5.0833,
      longitude: 105.5167,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
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
    areaServed: [
      {
        "@type": "City",
        name: "Lampung Timur",
      },
      {
        "@type": "City", 
        name: "Metro",
      },
      {
        "@type": "City",
        name: "Bandar Lampung",
      },
      {
        "@type": "State",
        name: "Lampung",
      },
    ],
    slogan: "#MenolakGelap - Spesialis Custom BILED Lampung Timur",
    foundingDate: "2019",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: 5,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Ahmad Rizki",
        },
        datePublished: "2024-01-15",
        reviewBody: "Custom BILED untuk Alphard saya hasilnya luar biasa! Terang maksimal, cut-off presisi RHD. Pengerjaan rapi dan bergaransi. Recommended!",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Budi Santoso",
        },
        datePublished: "2024-02-20",
        reviewBody: "Pasang custom BILED di motor R15, sekarang malem jadi terang banget. Pelayanan ramah, harga masuk akal. Puas!",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
      },
    ],
  };

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://owlighting-garage.vercel.app/#organization",
    name: "Owlighting Garage",
    alternateName: "Owlighting Custom BILED",
    url: "https://owlighting-garage.vercel.app",
    logo: "https://owlighting-garage.vercel.app/assets/logo.png",
    description:
      "Spesialis Custom BILED dan retrofit lampu kendaraan di Lampung Timur. Berpengalaman 5+ tahun dengan 500+ kendaraan.",
    foundingDate: "2019",
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
      availableLanguage: ["Indonesian", "English"],
      areaServed: "ID",
    },
    sameAs: [
      contactInfo.socialMedia.instagram,
      contactInfo.socialMedia.facebook,
      contactInfo.socialMedia.tiktok,
    ],
  };

  // Service Schema - Detailed services with "custom biled" focus
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://owlighting-garage.vercel.app/#services",
    name: "Layanan Custom BILED & Retrofit Lampung Timur",
    description: "Jasa pasang Custom BILED mobil dan motor profesional di Lampung Timur. Retrofit projector, D2 Laser, DRL Matrix, poles kaca lampu dengan garansi resmi.",
    serviceType: "Custom BILED & Automotive Lighting Services",
    provider: {
      "@type": "AutomotiveBusiness",
      name: "Owlighting Garage",
      "@id": "https://owlighting-garage.vercel.app/#business",
    },
    areaServed: {
      "@type": "State",
      name: "Lampung",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Layanan Custom BILED & Pencahayaan Kendaraan",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom BILED Retrofit Mobil",
            description: "Pasang Custom BILED retrofit untuk mobil dengan cut-off RHD presisi, safety wiring, relay proteksi, dan garansi 1 tahun.",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "IDR",
            minPrice: "2500000",
            maxPrice: "5000000",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom BILED Retrofit Motor",
            description: "Pasang Custom BILED untuk motor segala merk. Projector berkualitas dengan bracket custom dan garansi.",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "IDR",
            minPrice: "1500000",
            maxPrice: "3000000",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "D2 Laser / Foglamp Custom",
            description: "Instalasi D2 Laser dan foglamp custom dengan dual color output, waterproof IP67.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "DRL Matrix Custom",
            description: "Custom DRL Matrix dengan desain eksklusif, fabrication presisi CNC Laser.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Poles Kaca Lampu Nano Burn",
            description: "Poles kaca lampu buram dengan teknologi nano burn coating untuk hasil jernih maksimal.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom CNC Laser & 3D Printing",
            description: "Fabrication custom dengan CNC Laser dan 3D Printing untuk lazy eyes, bracket, dan komponen presisi.",
          },
        },
      ],
    },
  };

  // FAQ Schema - Optimized for "custom biled" rich snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://owlighting-garage.vercel.app/#faq",
    mainEntity: [
      {
        "@type": "Question",
        name: "Apa itu Custom BILED?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Custom BILED adalah lampu projector LED yang dipasang (retrofit) ke headlamp kendaraan untuk pencahayaan lebih terang dan fokus. BILED memiliki cut-off yang presisi sehingga tidak menyilaukan pengendara lain. Owlighting adalah spesialis pasang custom BILED di Lampung Timur dengan garansi resmi.",
        },
      },
      {
        "@type": "Question",
        name: "Berapa harga pasang Custom BILED di Owlighting?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Harga pasang custom BILED di Owlighting mulai dari Rp 1.5 juta untuk motor dan Rp 2.5 - 5 juta untuk mobil, tergantung projector dan tingkat kesulitan. Harga sudah termasuk projector, ballast, wiring safety, dan garansi 1 tahun. Konsultasi gratis via WhatsApp untuk penawaran terbaik.",
        },
      },
      {
        "@type": "Question",
        name: "Apakah Custom BILED aman dan tidak menyebabkan kebakaran?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Custom BILED sangat aman jika dipasang dengan benar. Di Owlighting, kami menggunakan relay proteksi, fuse, kabel proper gauge, dan heatshrink waterproof. Dalam 5+ tahun beroperasi dengan 500+ kendaraan, Owlighting memiliki 0 kasus kebakaran. Semua instalasi dilengkapi garansi.",
        },
      },
      {
        "@type": "Question",
        name: "Dimana lokasi bengkel Custom BILED Owlighting?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Owlighting berlokasi di Jl. Danau Km.1, Sumberjo, Way Jepara, Kabupaten Lampung Timur, Lampung 34396. Buka Senin-Sabtu jam 09.00-18.00 WIB. Kami melayani custom BILED untuk area Lampung Timur, Metro, Bandar Lampung, dan sekitarnya.",
        },
      },
      {
        "@type": "Question",
        name: "Berapa lama waktu pengerjaan pasang Custom BILED?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Untuk retrofit custom BILED standar membutuhkan waktu 1-2 hari kerja. Custom project seperti DRL, lazy eyes, atau modifikasi kompleks membutuhkan 3-5 hari. Owlighting mengutamakan kualitas dan keamanan dalam setiap pengerjaan.",
        },
      },
      {
        "@type": "Question",
        name: "Mobil dan motor apa saja yang bisa dipasang Custom BILED?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Hampir semua kendaraan bisa dipasang custom BILED, termasuk mobil Jepang (Toyota, Honda, Suzuki, dll), Eropa (BMW, Mercedes, VW), Korea (Hyundai, KIA), serta motor segala merk. Owlighting akan survey headlamp untuk menentukan projector dan bracket yang sesuai.",
        },
      },
      {
        "@type": "Question",
        name: "Apa keunggulan Custom BILED dibanding lampu standar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Custom BILED memiliki keunggulan: (1) Pencahayaan 3-5x lebih terang dari halogen, (2) Cut-off presisi RHD tidak menyilaukan, (3) Konsumsi daya lebih rendah (35W vs 55W), (4) Umur pakai lebih lama, (5) Tampilan lebih modern dan stylish. Upgrade ke custom BILED adalah investasi keamanan berkendara malam.",
        },
      },
    ],
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://owlighting-garage.vercel.app/#breadcrumb",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home - Custom BILED Lampung Timur",
        item: "https://owlighting-garage.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Layanan Custom BILED",
        item: "https://owlighting-garage.vercel.app/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Portfolio Custom BILED",
        item: "https://owlighting-garage.vercel.app/portfolio",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Tentang Owlighting",
        item: "https://owlighting-garage.vercel.app/about",
      },
    ],
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://owlighting-garage.vercel.app/#website",
    url: "https://owlighting-garage.vercel.app",
    name: "Owlighting Garage - Custom BILED Lampung Timur",
    description: "Website resmi Owlighting Garage - Spesialis Custom BILED dan retrofit lampu kendaraan di Lampung Timur",
    publisher: {
      "@type": "Organization",
      "@id": "https://owlighting-garage.vercel.app/#organization",
    },
    inLanguage: "id-ID",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://owlighting-garage.vercel.app/?s={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  // Product Schema for Custom BILED
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": "https://owlighting-garage.vercel.app/#product",
    name: "Jasa Pasang Custom BILED",
    description: "Jasa pemasangan Custom BILED profesional untuk mobil dan motor di Lampung Timur. Termasuk projector BILED berkualitas, wiring safety, dan garansi 1 tahun.",
    image: "https://owlighting-garage.vercel.app/og-image.jpg",
    brand: {
      "@type": "Brand",
      name: "Owlighting Garage",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "IDR",
      lowPrice: "1500000",
      highPrice: "5000000",
      offerCount: "6",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Owlighting Garage",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
    </>
  );
}
