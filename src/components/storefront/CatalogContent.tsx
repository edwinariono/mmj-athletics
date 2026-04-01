"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Tabs } from "@/components/ui/Tabs";
import { ProductCard } from "@/components/storefront/ProductCard";
import type { Product } from "@/lib/types";

const subFilters: Record<string, { id: string; label: string }[]> = {
  "helm-pelindung": [
    { id: "all", label: "Semua" },
    { id: "helm", label: "Helm" },
    { id: "sarung-tangan", label: "Sarung Tangan" },
    { id: "pads", label: "Pads" },
  ],
  "base-layer": [
    { id: "all", label: "Semua" },
    { id: "base-layer", label: "Base Layer" },
    { id: "kaos-kaki", label: "Kaos Kaki" },
  ],
  "stik-blade": [
    { id: "all", label: "Semua" },
    { id: "stik", label: "Stik" },
    { id: "blade", label: "Blade" },
  ],
  "skate-aksesoris": [
    { id: "all", label: "Semua" },
    { id: "skate", label: "Skate" },
    { id: "aksesoris", label: "Aksesoris" },
  ],
};

interface CatalogContentProps {
  category: string;
  categoryName: string;
  products: Product[];
}

export function CatalogContent({ category, categoryName, products }: CatalogContentProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = subFilters[category] || [{ id: "all", label: "Semua" }];

  return (
    <div className="min-h-screen">
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted hover:text-ice-blue text-sm font-label font-semibold uppercase tracking-wider transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Link>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-wider">
            {categoryName}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Tabs
          tabs={filters}
          activeTab={activeFilter}
          onTabChange={setActiveFilter}
          className="mb-8"
        />

        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                categoryName={categoryName}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted">Belum ada produk di kategori ini</p>
          </div>
        )}
      </div>
    </div>
  );
}
