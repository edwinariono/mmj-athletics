import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contact_name, wa_number, type, product_id, message } = body;

    if (!contact_name || !wa_number || !type) {
      return NextResponse.json(
        { error: "Nama, nomor WA, dan tipe wajib diisi" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Create enquiry
    const { data: enquiry, error: enquiryError } = await supabase
      .from("enquiries")
      .insert({
        contact_name,
        wa_number,
        type,
        product_id: product_id || null,
        message: message || "",
        status: "new",
      })
      .select()
      .single();

    if (enquiryError) {
      return NextResponse.json(
        { error: "Gagal menyimpan enquiry" },
        { status: 500 }
      );
    }

    // Upsert contact
    await supabase.from("contacts").upsert(
      {
        name: contact_name,
        wa_number,
      },
      { onConflict: "wa_number", ignoreDuplicates: true }
    );

    return NextResponse.json({ data: enquiry }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
