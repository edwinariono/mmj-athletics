"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { BRANDS } from "@/lib/constants";
import { mockProducts, mockCategories } from "@/lib/mock-data";

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-muted">Produk tidak ditemukan</p>
        <Link href="/admin/produk" className="text-ice-blue text-sm hover:underline">
          Kembali ke daftar produk
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/admin/produk"
        className="inline-flex items-center gap-2 text-muted hover:text-ice-blue text-sm font-label font-semibold uppercase tracking-wider transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali
      </Link>

      <h1 className="font-heading text-2xl font-bold uppercase tracking-wider mb-6">
        Edit Produk
      </h1>

      <div className="max-w-2xl space-y-6">
        <div className="bg-admin-surface border border-border rounded-sm p-6 space-y-4">
          <Input label="Nama Produk" defaultValue={product.name} />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-label font-semibold uppercase tracking-wider text-muted">
                Brand
              </label>
              <select
                className="w-full bg-surface border border-border rounded-sm px-3 py-2.5 text-sm text-white"
                defaultValue={product.brand}
              >
                {BRANDS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-label font-semibold uppercase tracking-wider text-muted">
                Kategori
              </label>
              <select
                className="w-full bg-surface border border-border rounded-sm px-3 py-2.5 text-sm text-white"
                defaultValue={product.category_id}
              >
                {mockCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-label font-semibold uppercase tracking-wider text-muted">
              Deskripsi
            </label>
            <textarea
              className="w-full bg-surface border border-border rounded-sm px-3 py-2.5 text-sm text-white min-h-[100px] focus:outline-none focus:border-ice-blue/50 focus:ring-1 focus:ring-ice-blue/20"
              defaultValue={product.description}
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-label font-semibold uppercase tracking-wider text-muted">
              Status
            </label>
            <select
              className="w-full bg-surface border border-border rounded-sm px-3 py-2.5 text-sm text-white"
              defaultValue={product.status}
            >
              <option value="draft">Draft</option>
              <option value="active">Aktif</option>
            </select>
          </div>
        </div>

        {/* Specs */}
        <div className="bg-admin-surface border border-border rounded-sm p-6">
          <h3 className="font-label font-semibold text-sm uppercase tracking-wider text-muted mb-4">
            Spesifikasi
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(product.specs).map(([key, value]) => (
              <Input key={key} label={key} defaultValue={value} />
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button size="lg">
            <Save className="w-4 h-4" />
            Simpan Perubahan
          </Button>
        </div>
      </div>
    </div>
  );
}
