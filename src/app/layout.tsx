import type { Metadata } from "next";
import { Oswald, Barlow_Condensed, Barlow } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const barlow = Barlow({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mmjathletics.com"),
  title: {
    default: "MMJ Athletics — Toko Peralatan Hoki Es Indonesia | Ice Hockey Equipment Store",
    template: "%s | MMJ Athletics",
  },
  description:
    "Toko peralatan hoki es terlengkap di Indonesia. Dealer resmi Bauer & CCM. Jual helm, sarung tangan, stik, skate, jersey kustom tim. Indonesia's #1 ice hockey equipment store — helmets, gloves, sticks, skates, custom team jerseys.",
  keywords: [
    // Bahasa Indonesia
    "toko hoki es",
    "peralatan hoki es Indonesia",
    "jual peralatan hoki es",
    "helm hoki es",
    "stik hoki es",
    "sarung tangan hoki es",
    "sepatu ice skating",
    "skate hoki es",
    "jersey hoki es kustom",
    "jersey tim hoki",
    "perlengkapan hoki es Jakarta",
    "dealer Bauer Indonesia",
    "dealer CCM Indonesia",
    "beli peralatan hoki es",
    "toko hoki Jakarta",
    "peralatan ice hockey",
    // English
    "ice hockey equipment Indonesia",
    "ice hockey store Indonesia",
    "buy ice hockey gear Indonesia",
    "ice hockey helmet Indonesia",
    "ice hockey stick Indonesia",
    "ice hockey gloves Indonesia",
    "ice hockey skates Indonesia",
    "custom ice hockey jersey Indonesia",
    "Bauer dealer Indonesia",
    "CCM dealer Indonesia",
    "hockey equipment Jakarta",
    "ice hockey gear Southeast Asia",
    "MMJ Athletics",
    "hockey outfitters",
  ],
  authors: [{ name: "MMJ Athletics" }],
  creator: "MMJ Athletics",
  publisher: "MMJ Athletics",
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: "en_US",
    url: "https://mmjathletics.com",
    siteName: "MMJ Athletics",
    title: "MMJ Athletics — Toko Peralatan Hoki Es #1 di Indonesia",
    description:
      "Dealer resmi Bauer & CCM. Jual helm, sarung tangan, stik, skate, dan jersey kustom tim hoki es. Hubungi via WhatsApp untuk konsultasi dan pemesanan.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MMJ Athletics — Hockey Outfitters Indonesia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MMJ Athletics — Toko Peralatan Hoki Es Indonesia",
    description:
      "Dealer resmi Bauer & CCM. Peralatan hoki es terlengkap dan jersey kustom tim. Hubungi via WhatsApp.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://mmjathletics.com",
  },
  verification: {
    // Add Google Search Console verification code here later
    // google: "your-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${oswald.variable} ${barlowCondensed.variable} ${barlow.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportingGoodsStore",
              name: "MMJ Athletics",
              alternateName: "MMJ Athletics Hockey Outfitters",
              description:
                "Toko peralatan hoki es terlengkap di Indonesia. Dealer resmi Bauer & CCM.",
              url: "https://mmjathletics.com",
              logo: "https://mmjathletics.com/icon.svg",
              image: "https://mmjathletics.com/og-image.png",
              telephone: "+6281213521745",
              address: {
                "@type": "PostalAddress",
                addressCountry: "ID",
              },
              geo: {
                "@type": "GeoCoordinates",
                addressCountry: "ID",
              },
              priceRange: "$$",
              openingHoursSpecification: {
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
              sameAs: [],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Peralatan Hoki Es",
                itemListElement: [
                  {
                    "@type": "OfferCatalog",
                    name: "Helm & Pelindung",
                  },
                  {
                    "@type": "OfferCatalog",
                    name: "Stik & Blade",
                  },
                  {
                    "@type": "OfferCatalog",
                    name: "Skate & Aksesoris",
                  },
                  {
                    "@type": "OfferCatalog",
                    name: "Jersey Kustom",
                  },
                  {
                    "@type": "OfferCatalog",
                    name: "Base Layer & Kaos Kaki",
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-white font-body">
        {children}
      </body>
    </html>
  );
}
