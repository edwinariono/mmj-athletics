"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { BRANDS } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";

export default function NewProductPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    brand: "Bauer",
    category_id: "",
    description: "",
    status: "draft",
    specs: { Bahan: "", Ukuran: "", Berat: "", Sertifikasi: "" },
  });

  // Load categories from Supabase
  if (!loaded) {
    setLoaded(true);
    const supabase = createClient();
    supabase
      .from("categories")
      .select("id, name")
      .order("sort_order")
      .then(({ data }) => {
        if (data) setCategories(data);
      });
  }

  async function handleSave() {
    if (!formData.name || !formData.category_id) {
      setError("Nama produk dan kategori wajib diisi");
      return;
    }

    setSaving(true);
    setError("");

    const supabase = createClient();
    const { error: insertError } = await supabase.from("products").insert({
      name: formData.name,
      brand: formData.brand,
      category_id: formData.category_id,
      description: formData.description,
      status: formData.status,
      specs: formData.specs,
      images,
    });

    if (insertError) {
      setError("Gagal menyimpan: " + insertError.message);
      setSaving(false);
      return;
    }

    router.push("/admin/produk");
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
        Tambah Produk
      </h1>

      {error && (
        <div className="bg-mmj-red/10 border border-mmj-red/20 rounded-sm px-4 py-2.5 text-sm text-mmj-red mb-6">
          {error}
        </div>
      )}

      <div className="max-w-2xl space-y-6">
        <div className="bg-admin-surface border border-border rounded-sm p-6 space-y-4">
          <Input
            label="Nama Produk"
            placeholder="Contoh: Bauer RE-AKT 85 Helmet"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-label font-semibold uppercase tracking-wider text-muted">
                Brand
              </label>
              <select
                className="w-full bg-surface border border-border rounded-sm px-3 py-2.5 text-sm text-white"
                value={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
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
                value={formData.category_id}
                onChange={(e) =>
                  setFormData({ ...formData, category_id: e.target.value })
                }
              >
                <option value="">Pilih kategori</option>
                {categories.map((c) => (
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
              placeholder="Deskripsi produk..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-label font-semibold uppercase tracking-wider text-muted">
              Status
            </label>
            <select
              className="w-full bg-surface border border-border rounded-sm px-3 py-2.5 text-sm text-white"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
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
            {Object.entries(formData.specs).map(([key, value]) => (
              <Input
                key={key}
                label={key}
                placeholder={`Masukkan ${key.toLowerCase()}`}
                value={value}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    specs: { ...formData.specs, [key]: e.target.value },
                  })
                }
              />
            ))}
          </div>
        </div>

        {/* Image upload */}
        <ImageUpload images={images} onImagesChange={setImages} />

        <div className="flex justify-end">
          <Button size="lg" onClick={handleSave} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Simpan Produk
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
