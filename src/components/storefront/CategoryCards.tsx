import Link from "next/link";
import { Shield, Shirt, Layers } from "lucide-react";
import { ChevronRight } from "lucide-react";

const categories = [
  {
    name: "Helm & Pelindung",
    slug: "helm-pelindung",
    description: "Perlindungan kelas dunia untuk di atas es",
    icon: Shield,
  },
  {
    name: "Jersey Kustom",
    slug: "jersey-kustom",
    description: "Desain jersey tim dengan identitas Anda",
    icon: Shirt,
    isJersey: true,
  },
  {
    name: "Base Layer & Kaos Kaki",
    slug: "base-layer",
    description: "Kenyamanan dan performa dari dalam",
    icon: Layers,
  },
];

export function CategoryCards() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-wider text-center mb-3">
          Kategori Produk
        </h2>
        <p className="text-muted text-center text-sm mb-10">
          Temukan peralatan yang Anda butuhkan
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const href = cat.isJersey ? "/jersey-kustom" : `/katalog/${cat.slug}`;
            return (
              <Link
                key={cat.slug}
                href={href}
                className="group relative bg-surface border border-border p-6 sm:p-8 clip-corner-md hover:border-ice-blue/30 hover:bg-surface-light transition-all duration-300"
              >
                <div className="w-12 h-12 bg-ice-blue/10 border border-ice-blue/20 flex items-center justify-center clip-corner-sm mb-4">
                  <Icon className="w-6 h-6 text-ice-blue" />
                </div>
                <h3 className="font-heading text-lg font-bold uppercase tracking-wider mb-2">
                  {cat.name}
                </h3>
                <p className="text-sm text-muted mb-4">{cat.description}</p>
                <span className="inline-flex items-center gap-1 text-ice-blue text-sm font-label font-semibold uppercase tracking-wider group-hover:gap-2 transition-all">
                  Lihat Produk <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
