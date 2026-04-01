import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: enquiries, error } = await supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: "Gagal mengambil data" },
        { status: 500 }
      );
    }

    // Generate CSV
    const headers = [
      "ID",
      "Nama",
      "No. WhatsApp",
      "Tipe",
      "Pesan",
      "Status",
      "Catatan",
      "Tanggal",
    ];

    const rows = (enquiries || []).map((e) => [
      e.id,
      e.contact_name,
      e.wa_number,
      e.type,
      `"${(e.message || "").replace(/"/g, '""')}"`,
      e.status,
      `"${(e.notes || "").replace(/"/g, '""')}"`,
      new Date(e.created_at).toLocaleDateString("id-ID"),
    ]);

    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="enquiry-mmj-athletics-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
