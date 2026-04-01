import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Banner } from "@/lib/types";

interface PromoBannerProps {
  banners: Banner[];
}

export function PromoBanner({ banners }: PromoBannerProps) {
  if (banners.length === 0) return null;

  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`grid gap-4 ${banners.length === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="relative overflow-hidden rounded-sm clip-corner-lg border border-border group"
            >
              {/* Background image */}
              {banner.image_url ? (
                <div className="relative aspect-[3/1]">
                  <Image
                    src={banner.image_url}
                    alt={banner.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                  <div className="absolute inset-0 flex items-center p-6 sm:p-8">
                    <div>
                      <h3 className="font-heading text-lg sm:text-xl font-bold uppercase tracking-wider text-white mb-1">
                        {banner.title}
                      </h3>
                      {banner.subtitle && (
                        <p className="text-white/70 text-sm mb-3">
                          {banner.subtitle}
                        </p>
                      )}
                      {banner.cta_text && banner.cta_link && (
                        <Link
                          href={banner.cta_link}
                          className="inline-flex items-center gap-1 text-ice-blue text-sm font-label font-semibold uppercase tracking-wider hover:gap-2 transition-all"
                        >
                          {banner.cta_text}
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="aspect-[3/1] bg-surface flex items-center p-6 sm:p-8">
                  <div>
                    <h3 className="font-heading text-lg sm:text-xl font-bold uppercase tracking-wider text-white mb-1">
                      {banner.title}
                    </h3>
                    {banner.subtitle && (
                      <p className="text-muted text-sm mb-3">
                        {banner.subtitle}
                      </p>
                    )}
                    {banner.cta_text && banner.cta_link && (
                      <Link
                        href={banner.cta_link}
                        className="inline-flex items-center gap-1 text-ice-blue text-sm font-label font-semibold uppercase tracking-wider hover:gap-2 transition-all"
                      >
                        {banner.cta_text}
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
