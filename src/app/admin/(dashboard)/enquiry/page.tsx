"use client";

import { useState } from "react";
import { MessageCircle, Plus, ExternalLink, Check, Send, RefreshCw } from "lucide-react";
import { Tabs } from "@/components/ui/Tabs";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { mockEnquiries } from "@/lib/mock-data";
import { ENQUIRY_TYPES, ENQUIRY_STATUSES } from "@/lib/constants";
import { formatDate, formatWaNumber } from "@/lib/utils";
import { buildWaLink } from "@/lib/whatsapp";
import type { Enquiry } from "@/lib/types";

const tabs = [
  { id: "all", label: "Semua" },
  { id: "new", label: "Baru" },
  { id: "replied", label: "Dibalas" },
  { id: "quoted", label: "Penawaran" },
  { id: "won", label: "Deal" },
  { id: "lost", label: "Batal" },
];

function EnquiryCard({ enquiry }: { enquiry: Enquiry }) {
  const typeInfo = ENQUIRY_TYPES[enquiry.type];
  const statusInfo = ENQUIRY_STATUSES[enquiry.status];
  const typeBadgeVariant =
    enquiry.type === "equipment" ? "ice" : enquiry.type === "jersey" ? "red" : "yellow";
  const statusBadgeVariant =
    enquiry.status === "new" || enquiry.status === "won"
      ? "green"
      : enquiry.status === "replied"
        ? "ice"
        : enquiry.status === "quoted"
          ? "yellow"
          : "red";

  return (
    <div className="bg-admin-surface border border-border rounded-sm p-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-semibold text-sm">{enquiry.contact_name}</h3>
          <p className="text-xs text-muted">
            {formatWaNumber(enquiry.wa_number)} · {formatDate(enquiry.created_at)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={typeBadgeVariant}>{typeInfo.label}</Badge>
          <Badge variant={statusBadgeVariant}>{statusInfo.label}</Badge>
        </div>
      </div>

      <p className="text-sm text-muted mb-3">{enquiry.message}</p>

      {enquiry.notes && (
        <p className="text-xs text-muted/70 italic mb-3">Catatan: {enquiry.notes}</p>
      )}

      <div className="flex flex-wrap gap-2">
        <a
          href={buildWaLink(`Halo ${enquiry.contact_name}, mengenai enquiry Anda...`, enquiry.wa_number)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-wa-green/10 text-wa-green hover:bg-wa-green/20 px-3 py-1.5 text-xs font-label font-semibold uppercase tracking-wider rounded-sm transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          Balas via WA
        </a>
        <button className="inline-flex items-center gap-1.5 bg-ice-blue/10 text-ice-blue hover:bg-ice-blue/20 px-3 py-1.5 text-xs font-label font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer">
          <Check className="w-3 h-3" />
          Tandai Dibalas
        </button>
        <button className="inline-flex items-center gap-1.5 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 px-3 py-1.5 text-xs font-label font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer">
          <Send className="w-3 h-3" />
          Kirim Penawaran
        </button>
        <button className="inline-flex items-center gap-1.5 bg-white/5 text-muted hover:bg-white/10 px-3 py-1.5 text-xs font-label font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer">
          <RefreshCw className="w-3 h-3" />
          Follow Up
        </button>
      </div>
    </div>
  );
}

export default function EnquiryPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  const filtered = mockEnquiries.filter((e) => {
    if (activeTab !== "all" && e.status !== activeTab) return false;
    if (search && !e.contact_name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold uppercase tracking-wider">
          Enquiry
        </h1>
        <Button size="sm" onClick={() => setShowQuickAdd(!showQuickAdd)}>
          <Plus className="w-4 h-4" />
          Tambah Manual
        </Button>
      </div>

      {/* Quick-add form */}
      {showQuickAdd && (
        <div className="bg-admin-surface border border-border rounded-sm p-4 mb-6">
          <h3 className="font-label font-semibold text-sm uppercase tracking-wider text-muted mb-3">
            Tambah Enquiry Manual
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Input placeholder="Nama kontak" />
            <Input placeholder="Nomor WhatsApp" />
            <select className="w-full bg-surface border border-border rounded-sm px-3 py-2.5 text-sm text-white">
              <option value="equipment">Peralatan</option>
              <option value="jersey">Jersey</option>
              <option value="team">Tim</option>
            </select>
            <Input placeholder="Catatan" />
          </div>
          <div className="mt-3 flex justify-end">
            <Button size="sm">Simpan</Button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="sm:ml-auto w-full sm:w-64">
          <Input
            placeholder="Cari nama..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Enquiry list */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((enquiry) => (
            <EnquiryCard key={enquiry.id} enquiry={enquiry} />
          ))
        ) : (
          <div className="text-center py-12 text-muted">
            Tidak ada enquiry yang ditemukan
          </div>
        )}
      </div>
    </div>
  );
}
