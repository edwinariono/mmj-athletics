import type { MetadataRoute } from "next";
import { mockProducts, mockCategories } from "@/lib/mock-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mmjathletics.com";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/jersey-kustom`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

  const categoryPages: MetadataRoute.Sitemap = mockCategories
    .filter((c) => c.slug !== "jersey-kustom")
    .map((c) => ({
      url: `${baseUrl}/katalog/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  const productPages: MetadataRoute.Sitemap = mockProducts
    .filter((p) => p.status === "active")
    .map((p) => ({
      url: `${baseUrl}/produk/${p.id}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

  return [...staticPages, ...categoryPages, ...productPages];
}
