"use client";

import { useState } from "react";
import { Save, Image, Type } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

const mockBanners = [
  { id: "1", title: "Katalog Musim 2026", subtitle: "Peralatan baru telah tiba", position: "hero", is_active: true },
  { id: "2", title: "Diskon Akhir Tahun", subtitle: "Hingga 20% untuk peralatan tertentu", position: "promo", is_active: false },
];

export default function ContentPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold uppercase tracking-wider mb-6">
        Konten & Banner
      </h1>

      {/* Banners */}
      <div className="mb-8">
        <h2 className="font-label font-semibold text-sm uppercase tracking-wider text-muted mb-4 flex items-center gap-2">
          <Image className="w-4 h-4" />
          Banner
        </h2>
        <div className="space-y-3">
          {mockBanners.map((banner) => (
            <div
              key={banner.id}
              className="bg-admin-surface border border-border rounded-sm p-4 flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold">{banner.title}</h3>
                  <Badge variant={banner.is_active ? "green" : "default"}>
                    {banner.is_active ? "Aktif" : "Nonaktif"}
                  </Badge>
                  <Badge>{banner.position}</Badge>
                </div>
                <p className="text-xs text-muted">{banner.subtitle}</p>
              </div>
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Page text */}
      <div>
        <h2 className="font-label font-semibold text-sm uppercase tracking-wider text-muted mb-4 flex items-center gap-2">
          <Type className="w-4 h-4" />
          Teks Halaman
        </h2>
        <div className="bg-admin-surface border border-border rounded-sm p-6 space-y-4">
          <Input
            label="Tagline Hero"
            defaultValue="Katalog Musim 2026"
          />
          <Input
            label="Headline Hero"
            defaultValue="Lengkapi. Kuasai. Arena Es."
          />
          <div className="space-y-1.5">
            <label className="block text-sm font-label font-semibold uppercase tracking-wider text-muted">
              Deskripsi Hero
            </label>
            <textarea
              className="w-full bg-surface border border-border rounded-sm px-3 py-2.5 text-sm text-white min-h-[80px] focus:outline-none focus:border-ice-blue/50 focus:ring-1 focus:ring-ice-blue/20"
              defaultValue="Peralatan hoki es premium dari brand terpercaya dunia. Dealer resmi Bauer & CCM di Indonesia."
            />
          </div>
          <div className="flex justify-end">
            <Button size="sm">
              <Save className="w-4 h-4" />
              Simpan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
