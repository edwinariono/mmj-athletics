"use client";

import { useState, useEffect, useRef } from "react";
import NextImage from "next/image";
import {
  Save,
  Image,
  Type,
  Plus,
  Pencil,
  Trash2,
  Upload,
  X,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { createClient } from "@/lib/supabase/client";
import type { Banner } from "@/lib/types";

interface BannerFormData {
  title: string;
  subtitle: string;
  image_url: string;
  cta_text: string;
  cta_link: string;
  position: string;
  is_active: boolean;
}

const emptyForm: BannerFormData = {
  title: "",
  subtitle: "",
  image_url: "",
  cta_text: "",
  cta_link: "",
  position: "hero",
  is_active: true,
};

export default function ContentPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null); // banner id or "new"
  const [form, setForm] = useState<BannerFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadBanners();
  }, []);

  async function loadBanners() {
    const supabase = createClient();
    const { data } = await supabase
      .from("banners")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setBanners(data);
    setLoading(false);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Hanya file gambar yang diperbolehkan");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran file maksimal 5MB");
      return;
    }

    setUploading(true);
    setError("");

    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const fileName = `banners/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("Product")
      .upload(fileName, file);

    if (uploadError) {
      setError("Gagal upload: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("Product").getPublicUrl(fileName);
    setForm({ ...form, image_url: data.publicUrl });
    setUploading(false);

    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSave() {
    if (!form.title) {
      setError("Judul banner wajib diisi");
      return;
    }

    setSaving(true);
    setError("");
    const supabase = createClient();

    if (editing === "new") {
      const { error } = await supabase.from("banners").insert(form);
      if (error) {
        setError("Gagal menyimpan: " + error.message);
        setSaving(false);
        return;
      }
    } else {
      const { error } = await supabase
        .from("banners")
        .update(form)
        .eq("id", editing);
      if (error) {
        setError("Gagal menyimpan: " + error.message);
        setSaving(false);
        return;
      }
    }

    setSaving(false);
    setEditing(null);
    setForm(emptyForm);
    loadBanners();
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus banner ini?")) return;
    const supabase = createClient();
    await supabase.from("banners").delete().eq("id", id);
    loadBanners();
  }

  async function toggleActive(banner: Banner) {
    const supabase = createClient();
    await supabase
      .from("banners")
      .update({ is_active: !banner.is_active })
      .eq("id", banner.id);
    loadBanners();
  }

  function startEdit(banner: Banner) {
    setEditing(banner.id);
    setForm({
      title: banner.title,
      subtitle: banner.subtitle || "",
      image_url: banner.image_url || "",
      cta_text: banner.cta_text || "",
      cta_link: banner.cta_link || "",
      position: banner.position || "hero",
      is_active: banner.is_active,
    });
    setError("");
  }

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold uppercase tracking-wider mb-6">
        Konten & Banner
      </h1>

      {/* Banners */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-label font-semibold text-sm uppercase tracking-wider text-muted flex items-center gap-2">
            <Image className="w-4 h-4" />
            Banner
          </h2>
          {!editing && (
            <Button
              size="sm"
              onClick={() => {
                setEditing("new");
                setForm(emptyForm);
                setError("");
              }}
            >
              <Plus className="w-4 h-4" />
              Tambah Banner
            </Button>
          )}
        </div>

        {/* Banner form */}
        {editing && (
          <div className="bg-admin-surface border border-ice-blue/30 rounded-sm p-6 mb-4 space-y-4">
            <h3 className="font-label font-semibold text-sm uppercase tracking-wider text-ice-blue">
              {editing === "new" ? "Banner Baru" : "Edit Banner"}
            </h3>

            {error && (
              <div className="bg-mmj-red/10 border border-mmj-red/20 rounded-sm px-4 py-2 text-sm text-mmj-red">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Judul"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <Input
                label="Subtitle"
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              />
              <Input
                label="Teks CTA"
                placeholder="Contoh: Lihat Katalog"
                value={form.cta_text}
                onChange={(e) => setForm({ ...form, cta_text: e.target.value })}
              />
              <Input
                label="Link CTA"
                placeholder="Contoh: /katalog/helm-pelindung"
                value={form.cta_link}
                onChange={(e) => setForm({ ...form, cta_link: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-label font-semibold uppercase tracking-wider text-muted">
                  Posisi
                </label>
                <select
                  className="w-full bg-surface border border-border rounded-sm px-3 py-2.5 text-sm text-white"
                  value={form.position}
                  onChange={(e) =>
                    setForm({ ...form, position: e.target.value })
                  }
                >
                  <option value="hero">Hero</option>
                  <option value="promo">Promo</option>
                  <option value="category">Kategori</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-label font-semibold uppercase tracking-wider text-muted">
                  Status
                </label>
                <select
                  className="w-full bg-surface border border-border rounded-sm px-3 py-2.5 text-sm text-white"
                  value={form.is_active ? "active" : "inactive"}
                  onChange={(e) =>
                    setForm({ ...form, is_active: e.target.value === "active" })
                  }
                >
                  <option value="active">Aktif</option>
                  <option value="inactive">Nonaktif</option>
                </select>
              </div>
            </div>

            {/* Image upload */}
            <div className="space-y-1.5">
              <label className="block text-sm font-label font-semibold uppercase tracking-wider text-muted">
                Gambar Banner
              </label>

              {form.image_url && (
                <div className="relative aspect-[3/1] max-w-md bg-bg border border-border rounded-sm overflow-hidden mb-2">
                  <NextImage
                    src={form.image_url}
                    alt="Banner preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => setForm({ ...form, image_url: "" })}
                    className="absolute top-2 right-2 w-7 h-7 bg-black/70 hover:bg-mmj-red rounded-full flex items-center justify-center cursor-pointer"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              )}

              <div
                onClick={() => !uploading && fileInputRef.current?.click()}
                className="border-2 border-dashed border-border rounded-sm p-6 text-center hover:border-ice-blue/30 cursor-pointer transition-colors"
              >
                {uploading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 text-ice-blue animate-spin" />
                    <span className="text-sm text-muted">Mengupload...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Upload className="w-5 h-5 text-muted" />
                    <span className="text-sm text-muted">
                      {form.image_url ? "Ganti gambar" : "Upload gambar banner"}
                    </span>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEditing(null);
                  setForm(emptyForm);
                  setError("");
                }}
              >
                Batal
              </Button>
              <Button size="sm" onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Simpan
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Banner list */}
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 text-ice-blue animate-spin" />
          </div>
        ) : (
          <div className="space-y-3">
            {banners.length === 0 && !editing && (
              <p className="text-muted text-sm text-center py-8">
                Belum ada banner
              </p>
            )}
            {banners.map((banner) => (
              <div
                key={banner.id}
                className="bg-admin-surface border border-border rounded-sm p-4 flex items-center gap-4"
              >
                {/* Thumbnail */}
                {banner.image_url ? (
                  <div className="w-24 h-16 relative bg-bg border border-border rounded-sm overflow-hidden shrink-0">
                    <NextImage
                      src={banner.image_url}
                      alt={banner.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-16 bg-bg border border-border rounded-sm flex items-center justify-center shrink-0">
                    <Image className="w-5 h-5 text-white/10" />
                  </div>
                )}

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold truncate">
                      {banner.title}
                    </h3>
                    <Badge variant={banner.is_active ? "green" : "default"}>
                      {banner.is_active ? "Aktif" : "Nonaktif"}
                    </Badge>
                    <Badge>{banner.position}</Badge>
                  </div>
                  <p className="text-xs text-muted truncate">
                    {banner.subtitle || "Tidak ada subtitle"}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => toggleActive(banner)}
                    className="p-2 text-muted hover:text-ice-blue transition-colors cursor-pointer"
                    title={banner.is_active ? "Nonaktifkan" : "Aktifkan"}
                  >
                    {banner.is_active ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => startEdit(banner)}
                    className="p-2 text-muted hover:text-ice-blue transition-colors cursor-pointer"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(banner.id)}
                    className="p-2 text-muted hover:text-mmj-red transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Page text */}
      <div>
        <h2 className="font-label font-semibold text-sm uppercase tracking-wider text-muted mb-4 flex items-center gap-2">
          <Type className="w-4 h-4" />
          Teks Halaman
        </h2>
        <div className="bg-admin-surface border border-border rounded-sm p-6 space-y-4">
          <Input label="Tagline Hero" defaultValue="Katalog Musim 2026" />
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
