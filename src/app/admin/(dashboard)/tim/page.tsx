"use client";

import { useState } from "react";
import { Plus, MessageCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { formatWaNumber } from "@/lib/utils";
import { buildWaLink } from "@/lib/whatsapp";

const mockTeams = [
  { id: "1", name: "Jakarta Ice Bears", pic_name: "Budi Santoso", wa_number: "6289876543210", member_count: 20, notes: "Tim aktif liga Jakarta" },
  { id: "2", name: "Bandung Avalanche", pic_name: "Diana Wijaya", wa_number: "6281122334455", member_count: 15, notes: "Tim baru, butuh perlengkapan lengkap" },
  { id: "3", name: "Surabaya Wolves", pic_name: "Eko Prasetyo", wa_number: "6281399887766", member_count: 22, notes: null },
];

export default function TeamPage() {
  const [search, setSearch] = useState("");

  const filtered = mockTeams.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.pic_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold uppercase tracking-wider">
          Tim Terdaftar
        </h1>
        <Button size="sm">
          <Plus className="w-4 h-4" />
          Tambah Tim
        </Button>
      </div>

      <div className="mb-6 max-w-sm">
        <Input
          placeholder="Cari tim..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((team) => (
          <div
            key={team.id}
            className="bg-admin-surface border border-border rounded-sm p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-heading text-lg font-bold uppercase tracking-wider">
                {team.name}
              </h3>
              <Badge variant="ice">
                <Users className="w-3 h-3 mr-1" />
                {team.member_count}
              </Badge>
            </div>
            <div className="space-y-1.5 mb-4">
              <p className="text-sm text-muted">
                <span className="text-white/70">PIC:</span> {team.pic_name}
              </p>
              <p className="text-sm text-muted">
                <span className="text-white/70">WA:</span>{" "}
                {formatWaNumber(team.wa_number)}
              </p>
              {team.notes && (
                <p className="text-xs text-muted/70 italic">{team.notes}</p>
              )}
            </div>
            <a
              href={buildWaLink(
                `Halo ${team.pic_name}, ini dari MMJ Athletics mengenai tim ${team.name}.`,
                team.wa_number
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-wa-green/10 text-wa-green hover:bg-wa-green/20 px-3 py-1.5 text-xs font-label font-semibold uppercase tracking-wider rounded-sm transition-colors"
            >
              <MessageCircle className="w-3 h-3" />
              Hubungi via WA
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
