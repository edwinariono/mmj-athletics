import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/types";

export async function FeaturedProducts() {
  let products: Product[] = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("products")
      .select("*, categories(name)")
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(4);
    if (data) products = data as Product[];
  } catch {
    // Fallback: no products shown
  }

  if (products.length === 0) return null;

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-wider text-center mb-3">
          Produk Unggulan
        </h2>
        <p className="text-muted text-center text-sm mb-10">
          Peralatan terbaik untuk performa maksimal
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product: any) => (
            <ProductCard
              key={product.id}
              product={product}
              categoryName={product.categories?.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
