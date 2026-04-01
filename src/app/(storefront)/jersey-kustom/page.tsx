import type { Metadata } from "next";
import { MessageCircle, Paintbrush, Users, Clock, Shirt, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Jersey Hoki Es Kustom — Desain Jersey Tim | Custom Ice Hockey Jersey",
  description:
    "Buat jersey tim hoki es kustom dengan sublimasi penuh. Desain bebas sesuai identitas tim. Nama, nomor, patch kapten. Minimal order 15+ set. Pengerjaan 2-3 minggu. Custom ice hockey team jerseys Indonesia — full sublimation, free design.",
  keywords: [
    "jersey hoki es kustom",
    "custom hockey jersey Indonesia",
    "jersey tim hoki es",
    "buat jersey hoki",
    "sublimasi jersey hoki",
    "ice hockey team jersey custom",
    "desain jersey hoki es",
    "order jersey hoki",
  ],
  openGraph: {
    title: "Jersey Hoki Es Kustom — MMJ Athletics",
    description:
      "Buat jersey tim hoki es kustom dengan sublimasi penuh. Desain bebas, nama & nomor, minimal 15+ set.",
    url: "https://mmjathletics.com/jersey-kustom",
  },
  alternates: {
    canonical: "https://mmjathletics.com/jersey-kustom",
  },
};
import { buildJerseyEnquiryLink } from "@/lib/whatsapp";
import { JERSEY_COLORS } from "@/lib/constants";

const features = [
  { icon: Paintbrush, text: "Sublimasi kustom penuh" },
  { icon: Award, text: "Nama, nomor & patch kapten" },
  { icon: Shirt, text: "Kaos kaki & jersey latihan serasi" },
  { icon: Users, text: "Minimal order 15+ set" },
  { icon: Clock, text: "Pengerjaan 2-3 minggu" },
];

export default function JerseyKustomPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-surface border-b border-border">
        <div className="absolute inset-0 stripe-accent opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Visual */}
            <div>
              <div className="aspect-[4/3] bg-bg border border-border clip-corner-lg flex items-center justify-center">
                <div className="text-center">
                  <span className="font-heading text-7xl font-bold text-white/5">
                    JERSEY
                  </span>
                  <p className="text-muted text-sm mt-2">
                    Jersey showcase preview
                  </p>
                </div>
              </div>
              {/* Color swatches */}
              <div className="flex gap-3 mt-6">
                {JERSEY_COLORS.map((color) => (
                  <div
                    key={color}
                    className="w-10 h-10 rounded-full border-2 border-border"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              <span className="inline-block font-label text-xs font-semibold uppercase tracking-wider text-mmj-red mb-3">
                MMJ Athletics Custom
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-wider mb-4">
                Bangun Identitas Tim Anda
              </h1>
              <p className="text-muted text-sm leading-relaxed mb-8">
                Jersey tim kustom dengan sublimasi berkualitas tinggi. Desain
                sepenuhnya sesuai identitas tim Anda — dari warna, logo, font,
                hingga detail terkecil. Diproduksi oleh MMJ Athletics dengan
                material premium.
              </p>

              <ul className="space-y-4 mb-8">
                {features.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-mmj-red/10 border border-mmj-red/20 flex items-center justify-center clip-corner-sm shrink-0">
                      <Icon className="w-5 h-5 text-mmj-red" />
                    </div>
                    <span className="text-sm text-white/80">{text}</span>
                  </li>
                ))}
              </ul>

              <a
                href={buildJerseyEnquiryLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-wa-green hover:bg-wa-green-hover text-white px-7 py-4 font-label font-bold uppercase tracking-wider text-sm transition-all duration-200 clip-corner-sm"
              >
                <MessageCircle className="w-5 h-5" />
                Konsultasi Jersey via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-wider text-center mb-3">
            Galeri Jersey
          </h2>
          <p className="text-muted text-center text-sm mb-10">
            Beberapa contoh jersey yang telah kami produksi
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-surface border border-border clip-corner-md flex items-center justify-center hover:border-ice-blue/30 transition-colors"
              >
                <span className="font-heading text-xl font-bold text-white/5">
                  Jersey {i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-mmj-red py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white mb-3">
            Siap Membuat Jersey Tim?
          </h2>
          <p className="text-white/80 text-sm mb-8 max-w-md mx-auto">
            Konsultasikan desain dan kebutuhan tim Anda langsung dengan tim kami
          </p>
          <a
            href={buildJerseyEnquiryLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-mmj-red hover:bg-white/90 px-7 py-3.5 font-label font-bold uppercase tracking-wider text-sm transition-all duration-200 clip-corner-sm"
          >
            <MessageCircle className="w-5 h-5" />
            Hubungi Kami Sekarang
          </a>
        </div>
      </section>
    </div>
  );
}
