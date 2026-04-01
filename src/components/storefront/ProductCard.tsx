import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { buildProductEnquiryLink } from "@/lib/whatsapp";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  categoryName?: string;
}

export function ProductCard({ product, categoryName = "Peralatan" }: ProductCardProps) {
  return (
    <div className="group bg-surface border border-border clip-corner-md hover:border-ice-blue/30 hover:bg-surface-light transition-all duration-300">
      <Link href={`/produk/${product.id}`}>
        {/* Image */}
        <div className="aspect-square bg-bg border-b border-border flex items-center justify-center overflow-hidden">
          <span className="font-heading text-3xl font-bold text-white/5 group-hover:text-white/10 transition-colors">
            {product.brand}
          </span>
        </div>
      </Link>

      {/* Info */}
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
