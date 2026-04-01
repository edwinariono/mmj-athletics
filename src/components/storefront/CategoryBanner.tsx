import Image from "next/image";
import type { Banner } from "@/lib/types";

interface CategoryBannerProps {
  banner: Banner | null;
}

export function CategoryBanner({ banner }: CategoryBannerProps) {
  if (!banner || !banner.image_url) return null;

  return (
    <div className="relative w-full aspect-[4/1] overflow-hidden border-b border-border">
      <Image
        src={banner.image_url}
        alt={banner.title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/80 via-bg/40 to-transparent" />
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          {banner.subtitle && (
            <p className="text-white/70 text-sm">{banner.subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}
