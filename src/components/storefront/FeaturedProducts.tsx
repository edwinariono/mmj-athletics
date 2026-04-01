import { ProductCard } from "./ProductCard";
import { mockProducts, mockCategories } from "@/lib/mock-data";

export function FeaturedProducts() {
  const featured = mockProducts.slice(0, 4);

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
          {featured.map((product) => {
            const category = mockCategories.find(
              (c) => c.id === product.category_id
            );
            return (
              <ProductCard
                key={product.id}
                product={product}
                categoryName={category?.name}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
