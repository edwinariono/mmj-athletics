import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { buildProductEnquiryLink } from "@/lib/whatsapp";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  categoryName?: string;
}

export function ProductCard({ product, categoryName = "Peralatan" }: ProductCardProps) {
  const hasImage = product.images && product.images.length > 0 && product.images[0];

  return (
    <div className="group bg-surface border border-border clip-corner-md hover:border-ice-blue/30 hover:bg-surface-light transition-all duration-300">
      <Link href={`/produk/${product.id}`}>
        <div className="aspect-square bg-bg border-b border-border flex items-center justify-center overflow-hidden relative">
          {hasImage ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <span className="font-heading text-3xl font-bold text-white/5 group-hover:text-white/10 transition-colors">
              {product.brand}
            </span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Badge variant="ice" className="mb-2">
          {product.brand}
        </Badge>
        <Link href={`/produk/${product.id}`}>
          <h3 className="font-heading text-sm font-bold uppercase tracking-wider mb-3 group-hover:text-ice-blue transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <a
          href={buildProductEnquiryLink(product.name, categoryName)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-wa-green hover:text-wa-green-hover text-xs font-label font-semibold uppercase tracking-wider transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          Tanyakan
        </a>
      </div>
    </div>
  );
}
