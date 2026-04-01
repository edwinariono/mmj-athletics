import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ProductCard } from "@/components/storefront/ProductCard";
import { buildProductEnquiryLink } from "@/lib/whatsapp";
import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/lib/types";

async function getProduct(id: string) {
  try {
    const supabase = await createClient();
    const { data: product } = await supabase
      .from("products")
      .select("*, categories(name, slug)")
      .eq("id", id)
      .single();
    return product;
  } catch {
    return null;
  }
}

async function getRelatedProducts(categoryId: string, currentId: string) {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("products")
      .select("*, categories(name)")
      .eq("category_id", categoryId)
      .eq("status", "active")
      .neq("id", currentId)
      .limit(3);
    return (data || []) as Product[];
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: "Produk Tidak Ditemukan" };
  const categoryName = product.categories?.name || "Peralatan";
  return {
    title: `${product.name} — ${product.brand} | Jual ${categoryName} Hoki Es`,
    description: `${product.description} Hubungi via WhatsApp untuk info harga dan ketersediaan. ${product.brand} ${product.name} — available at MMJ Athletics Indonesia.`,
    keywords: [
      product.name,
      product.brand,
      `jual ${product.name}`,
      `${product.brand} Indonesia`,
      categoryName,
      "hoki es",
      "ice hockey",
    ],
    openGraph: {
      title: `${product.name} — MMJ Athletics`,
      description: product.description,
      url: `https://mmjathletics.com/produk/${id}`,
      images: product.images?.[0] ? [{ url: product.images[0] }] : undefined,
    },
    alternates: {
      canonical: `https://mmjathletics.com/produk/${id}`,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold uppercase mb-2">
            Produk Tidak Ditemukan
          </h1>
          <Link href="/" className="text-ice-blue text-sm hover:underline">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  const categoryName = product.categories?.name || "Peralatan";
  const categorySlug = product.categories?.slug;
  const related = product.category_id
    ? await getRelatedProducts(product.category_id, product.id)
    : [];
  const hasImage = product.images && product.images.length > 0 && product.images[0];
  const specs = product.specs || {};

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <Link
            href={categorySlug ? `/katalog/${categorySlug}` : "/"}
            className="inline-flex items-center gap-2 text-muted hover:text-ice-blue text-sm font-label font-semibold uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke {categoryName}
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="aspect-square bg-surface border border-border clip-corner-lg flex items-center justify-center overflow-hidden relative">
            {hasImage ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <span className="font-heading text-5xl font-bold text-white/5">
                {product.brand}
              </span>
            )}
          </div>

          {/* Info */}
          <div>
            <Badge variant="ice" className="mb-3">
              {product.brand}
            </Badge>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-wider mb-4">
              {product.name}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge>{categoryName}</Badge>
              {product.tags?.map((tag: string) => (
                <Badge key={tag} variant="default">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Description */}
            <p className="text-muted text-sm leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Specs */}
            {Object.keys(specs).length > 0 && (
              <div className="grid grid-cols-2 gap-3 mb-8">
                {Object.entries(specs).map(([key, value]) => (
                  <div
                    key={key}
                    className="bg-surface border border-border p-3 clip-corner-sm"
                  >
                    <p className="text-xs font-label font-semibold uppercase tracking-wider text-muted mb-1">
                      {key}
                    </p>
                    <p className="text-sm font-semibold text-white">{value as string}</p>
                  </div>
                ))}
              </div>
            )}

            {/* WA CTA */}
            <a
              href={buildProductEnquiryLink(product.name, categoryName)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-wa-green hover:bg-wa-green-hover text-white px-7 py-4 font-label font-bold uppercase tracking-wider text-base transition-all duration-200 clip-corner-md"
            >
              <MessageCircle className="w-5 h-5" />
              Tanyakan via WhatsApp
            </a>
            <p className="text-center text-xs text-muted mt-3">
              Tanya stok, ukuran, atau harga langsung ke tim kami
            </p>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading text-xl font-bold uppercase tracking-wider mb-6">
              Produk Terkait
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {related.map((p: any) => (
                <ProductCard key={p.id} product={p} categoryName={p.categories?.name || categoryName} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
