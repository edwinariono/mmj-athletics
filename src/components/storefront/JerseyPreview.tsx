import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ChevronRight, Paintbrush, Users, Clock } from "lucide-react";
import { buildJerseyEnquiryLink } from "@/lib/whatsapp";
import { JERSEY_COLORS } from "@/lib/constants";

interface JerseyPreviewProps {
  headline?: string;
  description?: string;
  mainImage?: string;
}

export function JerseyPreview({ headline, description, mainImage }: JerseyPreviewProps) {
  return (
    <section className="py-16 sm:py-20 bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Visual side */}
          <div className="relative">
            <div className="aspect-[4/3] bg-bg border border-border clip-corner-lg flex items-center justify-center relative overflow-hidden">
              {mainImage ? (
                <Image src={mainImage} alt="Jersey kustom" fill className="object-cover" />
              ) : (
                <div className="text-center">
                  <span className="font-heading text-6xl font-bold text-white/10">
                    JERSEY
                  </span>
                  <p className="text-muted text-sm mt-2">Preview jersey kustom</p>
                </div>
              )}
            </div>
            {/* Color swatches */}
            <div className="flex gap-2 mt-4">
              {JERSEY_COLORS.map((color) => (
                <div
                  key={color}
                  className="w-8 h-8 rounded-full border-2 border-border hover:border-white/50 transition-colors cursor-pointer"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Info side */}
          <div>
            <span className="inline-block font-label text-xs font-semibold uppercase tracking-wider text-mmj-red mb-3">
              MMJ Athletics Custom
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-wider mb-4">
              {headline || "Bangun Identitas Tim Anda"}
            </h2>
            <p className="text-muted text-sm leading-relaxed mb-6">
              {description ||
                "Jersey tim kustom dengan sublimasi penuh. Desain sesuai identitas tim Anda — mulai dari warna, logo, hingga detail terkecil."}
            </p>

            <ul className="space-y-3 mb-8">
              {[
                { icon: Paintbrush, text: "Sublimasi kustom penuh" },
                { icon: Users, text: "Nama, nomor & patch kapten" },
                { icon: Clock, text: "Pengerjaan 2-3 minggu" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-mmj-red/10 border border-mmj-red/20 flex items-center justify-center clip-corner-sm shrink-0">
                    <Icon className="w-4 h-4 text-mmj-red" />
                  </div>
                  <span className="text-white/80">{text}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <a
                href={buildJerseyEnquiryLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-wa-green hover:bg-wa-green-hover text-white px-5 py-3 font-label font-semibold uppercase tracking-wider text-sm transition-all duration-200 clip-corner-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Konsultasi Jersey
              </a>
              <Link
                href="/jersey-kustom"
                className="inline-flex items-center gap-2 border border-white/30 hover:border-white hover:bg-white/5 text-white px-5 py-3 font-label font-semibold uppercase tracking-wider text-sm transition-all duration-200 clip-corner-sm"
              >
                Lihat Selengkapnya
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
