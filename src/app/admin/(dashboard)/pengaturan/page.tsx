"use client";

import { useState } from "react";
import { Save, Phone, MessageCircle, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    wa_number: "6281200000000",
    site_title: "MMJ Athletics",
    site_tagline: "Hockey Outfitters",
    template_product: "Halo MMJ Athletics, saya tertarik dengan {product} (Kategori: {category}). Mohon info ketersediaan dan harga. Terima kasih!",
    template_jersey: "Halo MMJ Athletics, saya ingin konsultasi tentang jersey kustom untuk tim kami. Mohon info desain, harga, dan proses pemesanan. Terima kasih!",
    template_team: "Halo MMJ Athletics, saya ingin tanya tentang paket peralatan untuk tim kami. Mohon info harga paket dan ketersediaan. Terima kasih!",
  });

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold uppercase tracking-wider mb-6">
        Pengaturan
      </h1>

      <div className="max-w-2xl space-y-6">
        {/* Site settings */}
        <div className="bg-admin-surface border border-border rounded-sm p-6">
          <h2 className="font-label font-semibold text-sm uppercase tracking-wider text-muted mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Pengaturan Situs
          </h2>
          <div className="space-y-4">
            <Input
              label="Nama Situs"
              value={settings.site_title}
              onChange={(e) =>
                setSettings({ ...settings, site_title: e.target.value })
              }
            />
            <Input
              label="Tagline"
              value={settings.site_tagline}
              onChange={(e) =>
                setSettings({ ...settings, site_tagline: e.target.value })
              }
            />
          </div>
        </div>

        {/* WhatsApp config */}
        <div className="bg-admin-surface border border-border rounded-sm p-6">
          <h2 className="font-label font-semibold text-sm uppercase tracking-wider text-muted mb-4 flex items-center gap-2">
            <Phone className="w-4 h-4" />
            WhatsApp Config
          </h2>
          <div className="space-y-4">
            <Input
              label="Nomor WhatsApp"
              placeholder="628xxxxxxxxxx"
              value={settings.wa_number}
              onChange={(e) =>
                setSettings({ ...settings, wa_number: e.target.value })
              }
            />
          </div>
        </div>

        {/* Message templates */}
        <div className="bg-admin-surface border border-border rounded-sm p-6">
          <h2 className="font-label font-semibold text-sm uppercase tracking-wider text-muted mb-4 flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Template Pesan WhatsApp
          </h2>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-label font-semibold uppercase tracking-wider text-muted">
                Template Enquiry Produk
              </label>
              <textarea
                className="w-full bg-surface border border-border rounded-sm px-3 py-2.5 text-sm text-white min-h-[80px] focus:outline-none focus:border-ice-blue/50 focus:ring-1 focus:ring-ice-blue/20"
                value={settings.template_product}
                onChange={(e) =>
                  setSettings({ ...settings, template_product: e.target.value })
                }
              />
              <p className="text-xs text-muted">
                Gunakan {"{product}"} dan {"{category}"} sebagai placeholder
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-label font-semibold uppercase tracking-wider text-muted">
                Template Enquiry Jersey
              </label>
              <textarea
                className="w-full bg-surface border border-border rounded-sm px-3 py-2.5 text-sm text-white min-h-[80px] focus:outline-none focus:border-ice-blue/50 focus:ring-1 focus:ring-ice-blue/20"
                value={settings.template_jersey}
                onChange={(e) =>
                  setSettings({ ...settings, template_jersey: e.target.value })
                }
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-label font-semibold uppercase tracking-wider text-muted">
                Template Enquiry Tim
              </label>
              <textarea
                className="w-full bg-surface border border-border rounded-sm px-3 py-2.5 text-sm text-white min-h-[80px] focus:outline-none focus:border-ice-blue/50 focus:ring-1 focus:ring-ice-blue/20"
                value={settings.template_team}
                onChange={(e) =>
                  setSettings({ ...settings, template_team: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button size="lg">
            <Save className="w-4 h-4" />
            Simpan Pengaturan
          </Button>
        </div>
      </div>
    </div>
  );
}
