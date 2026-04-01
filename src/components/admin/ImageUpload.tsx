"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
}

export function ImageUpload({ images, onImagesChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError("");

    const supabase = createClient();
    const newImages: string[] = [];

    for (const file of Array.from(files)) {
      // Validate file
      if (!file.type.startsWith("image/")) {
        setError("Hanya file gambar yang diperbolehkan");
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Ukuran file maksimal 5MB");
        continue;
      }

      // Generate unique filename
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("Product")
        .upload(filePath, file);

      if (uploadError) {
        setError("Gagal upload: " + uploadError.message);
        continue;
      }

      const { data } = supabase.storage
        .from("Product")
        .getPublicUrl(filePath);

      newImages.push(data.publicUrl);
    }

    if (newImages.length > 0) {
      onImagesChange([...images, ...newImages]);
    }

    setUploading(false);
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleRemove(imageUrl: string) {
    // Extract path from URL
    const url = new URL(imageUrl);
    const pathParts = url.pathname.split("/storage/v1/object/public/Product/");
    if (pathParts[1]) {
      const supabase = createClient();
      await supabase.storage.from("Product").remove([pathParts[1]]);
    }
    onImagesChange(images.filter((img) => img !== imageUrl));
  }

  return (
    <div className="bg-admin-surface border border-border rounded-sm p-6">
      <h3 className="font-label font-semibold text-sm uppercase tracking-wider text-muted mb-4">
        Foto Produk
      </h3>

      {error && (
        <div className="bg-mmj-red/10 border border-mmj-red/20 rounded-sm px-4 py-2 text-sm text-mmj-red mb-4">
          {error}
        </div>
      )}

      {/* Image grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          {images.map((url, i) => (
            <div key={i} className="relative aspect-square bg-bg border border-border rounded-sm overflow-hidden group">
              <Image
                src={url}
                alt={`Product image ${i + 1}`}
                fill
                className="object-cover"
              />
              <button
                onClick={() => handleRemove(url)}
                className="absolute top-2 right-2 w-7 h-7 bg-black/70 hover:bg-mmj-red rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <X className="w-4 h-4 text-white" />
              </button>
              {i === 0 && (
                <span className="absolute bottom-2 left-2 bg-ice-blue/90 text-black text-[10px] font-label font-bold uppercase px-2 py-0.5 rounded-sm">
                  Utama
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload area */}
      <div
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={cn(
          "border-2 border-dashed border-border rounded-sm p-8 text-center transition-colors",
          uploading ? "opacity-50" : "hover:border-ice-blue/30 cursor-pointer"
        )}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 text-ice-blue animate-spin" />
            <p className="text-sm text-muted">Mengupload...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload className="w-8 h-8 text-muted" />
            <p className="text-sm text-muted">
              Klik untuk upload foto produk
            </p>
            <p className="text-xs text-muted/50">
              JPG, PNG, WebP — Maks 5MB per file
            </p>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
        className="hidden"
      />
    </div>
  );
}
