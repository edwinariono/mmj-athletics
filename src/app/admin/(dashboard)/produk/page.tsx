"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { mockProducts, mockCategories } from "@/lib/mock-data";

export default function ProductManagementPage() {
  const [search, setSearch] = useState("");

  const filtered = mockProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold uppercase tracking-wider">
          Produk
        </h1>
        <Link href="/admin/produk/baru">
          <Button size="sm">
            <Plus className="w-4 h-4" />
            Tambah Produk
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="mb-6 max-w-sm">
        <Input
          placeholder="Cari produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Product table */}
      <div className="bg-admin-surface border border-border rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-xs font-label font-semibold uppercase tracking-wider text-muted">
                  Produk
                </th>
                <th className="text-left px-4 py-3 text-xs font-label font-semibold uppercase tracking-wider text-muted">
                  Brand
                </th>
                <th className="text-left px-4 py-3 text-xs font-label font-semibold uppercase tracking-wider text-muted">
                  Kategori
                </th>
                <th className="text-left px-4 py-3 text-xs font-label font-semibold uppercase tracking-wider text-muted">
                  Status
                </th>
                <th className="text-right px-4 py-3 text-xs font-label font-semibold uppercase tracking-wider text-muted">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => {
                const category = mockCategories.find(
                  (c) => c.id === product.category_id
                );
                return (
                  <tr
                    key={product.id}
                    className="border-b border-border last:border-0 hover:bg-white/[0.02]"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-bg border border-border clip-corner-sm flex items-center justify-center shrink-0">
                          <span className="text-[8px] font-bold text-white/20">
                            {product.brand.slice(0, 2)}
                          </span>
                        </div>
                        <span className="text-sm font-semibold truncate max-w-[200px]">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="ice">{product.brand}</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted">
                      {category?.name || "-"}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={product.status === "active" ? "green" : "default"}
                      >
                        {product.status === "active" ? "Aktif" : "Draft"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/produk/${product.id}`}
                          className="p-2 text-muted hover:text-ice-blue transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button className="p-2 text-muted hover:text-mmj-red transition-colors cursor-pointer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
