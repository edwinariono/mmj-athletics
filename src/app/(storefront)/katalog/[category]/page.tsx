import type { Metadata } from "next";
import { CatalogContent } from "@/components/storefront/CatalogContent";
import { mockCategories } from "@/lib/mock-data";

const categoryMeta: Record<string, { title: string; description: string; keywords: string[] }> = {
  "helm-pelindung": {
    title: "Helm & Pelindung Hoki Es — Bauer, CCM | Ice Hockey Helmets & Protection",
    description:
      "Jual helm hoki es, sarung tangan, shoulder pads, shin guards dari Bauer & CCM. Perlindungan terbaik untuk di atas es. Ice hockey helmets, gloves, and protective gear in Indonesia.",
    keywords: ["helm hoki es", "sarung tangan hoki", "pelindung hoki es", "hockey helmet Indonesia", "hockey gloves", "Bauer helmet", "CCM gloves"],
  },
  "base-layer": {
    title: "Base Layer & Kaos Kaki Hoki Es | Ice Hockey Base Layers & Socks",
    description:
      "Jual base layer kompresi dan kaos kaki hoki es. Bahan breathable untuk kenyamanan maksimal. Hockey base layers and performance socks Indonesia.",
    keywords: ["base layer hoki es", "kaos kaki hoki", "hockey socks", "hockey base layer", "compression wear hockey"],
  },
  "stik-blade": {
    title: "Stik & Blade Hoki Es — Bauer, CCM | Ice Hockey Sticks & Blades",
    description:
      "Jual stik hoki es dan blade dari Bauer, CCM. Stik karbon ringan untuk akurasi dan kekuatan. Ice hockey sticks and replacement blades Indonesia.",
    keywords: ["stik hoki es", "hockey stick Indonesia", "blade hoki", "Bauer stick", "CCM stick", "jual stik hockey"],
  },
  "skate-aksesoris": {
    title: "Skate & Aksesoris Hoki Es — Bauer, CCM | Ice Hockey Skates & Accessories",
    description:
      "Jual sepatu ice skate hoki es dan aksesoris dari Bauer & CCM. Skate performa tinggi untuk kecepatan di atas es. Ice hockey skates and accessories Indonesia.",
    keywords: ["skate hoki es", "sepatu ice skating", "hockey skates Indonesia", "Bauer skates", "CCM skates", "aksesoris hoki"],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const meta = categoryMeta[category];
  const categoryData = mockCategories.find((c) => c.slug === category);
  const categoryName = categoryData?.name || "Katalog";

  if (meta) {
    return {
      title: meta.title,
      description: meta.description,
      keywords: meta.keywords,
      openGraph: {
        title: `${categoryName} — MMJ Athletics`,
        description: meta.description,
        url: `https://mmjathletics.com/katalog/${category}`,
      },
      alternates: {
        canonical: `https://mmjathletics.com/katalog/${category}`,
      },
    };
  }

  return {
    title: `${categoryName} — Peralatan Hoki Es`,
    description: `Jual ${categoryName.toLowerCase()} hoki es dari brand terpercaya. Hubungi via WhatsApp.`,
  };
}

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return <CatalogContent category={category} />;
}
