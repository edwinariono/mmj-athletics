"use client";

import { useState } from "react";
import { Plus, Search, Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatWaNumber } from "@/lib/utils";
import { buildWaLink } from "@/lib/whatsapp";

const mockContacts = [
  { id: "1", name: "Andi Pratama", wa_number: "6281234567890", email: "andi@email.com", enquiry_count: 2, notes: "Pemain Jakarta Ice" },
  { id: "2", name: "Budi Santoso", wa_number: "6289876543210", email: null, enquiry_count: 1, notes: "Manager Jakarta Ice Bears" },
  { id: "3", name: "Diana Wijaya", wa_number: "6281122334455", email: "diana@email.com", enquiry_count: 3, notes: "Pelatih tim baru" },
  { id: "4", name: "Reza Mahendra", wa_number: "6287766554433", email: null, enquiry_count: 1, notes: null },
  { id: "5", name: "Siti Nurhaliza", wa_number: "6285544332211", email: "siti@email.com", enquiry_count: 1, notes: null },
];

export default function ContactPage() {
  const [search, setSearch] = useState("");

  const filtered = mockContacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.wa_number.includes(search)
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold uppercase tracking-wider">
          Database Kontak
        </h1>
        <Button size="sm">
          <Plus className="w-4 h-4" />
          Tambah Kontak
        </Button>
      </div>

      <div className="mb-6 max-w-sm">
        <Input
          placeholder="Cari nama atau nomor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-admin-surface border border-border rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-xs font-label font-semibold uppercase tracking-wider text-muted">Nama</th>
                <th className="text-left px-4 py-3 text-xs font-label font-semibold uppercase tracking-wider text-muted">WhatsApp</th>
                <th className="text-left px-4 py-3 text-xs font-label font-semibold uppercase tracking-wider text-muted">Email</th>
                <th className="text-left px-4 py-3 text-xs font-label font-semibold uppercase tracking-wider text-muted">Enquiry</th>
                <th className="text-left px-4 py-3 text-xs font-label font-semibold uppercase tracking-wider text-muted">Catatan</th>
                <th className="text-right px-4 py-3 text-xs font-label font-semibold uppercase tracking-wider text-muted">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((contact) => (
                <tr key={contact.id} className="border-b border-border last:border-0 hover:bg-white/[0.02]">
                  <td className="px-4 py-3 text-sm font-semibold">{contact.name}</td>
                  <td className="px-4 py-3 text-sm text-muted">{formatWaNumber(contact.wa_number)}</td>
                  <td className="px-4 py-3 text-sm text-muted">{contact.email || "-"}</td>
                  <td className="px-4 py-3 text-sm text-ice-blue font-semibold">{contact.enquiry_count}</td>
                  <td className="px-4 py-3 text-sm text-muted truncate max-w-[200px]">{contact.notes || "-"}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end">
                      <a
                        href={buildWaLink("Halo, ini dari MMJ Athletics.", contact.wa_number)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-muted hover:text-wa-green transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
