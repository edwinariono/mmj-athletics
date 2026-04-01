export function BrandBar() {
  const brands = ["BAUER", "CCM", "WARRIOR", "TRUE"];

  return (
    <section className="bg-surface border-y border-border py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-center text-xs font-label uppercase tracking-[0.25em] text-muted mb-4">
          Dealer Resmi
        </p>
        <div className="flex items-center justify-center gap-8 sm:gap-16">
          {brands.map((brand) => (
            <span
              key={brand}
              className="font-heading text-lg sm:text-2xl font-bold text-white/20 hover:text-white/40 transition-colors tracking-wider"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
