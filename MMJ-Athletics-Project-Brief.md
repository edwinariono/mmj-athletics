# MMJ Athletics — Project Brief v1.0

## Ringkasan Project
Website katalog toko ice hockey bernama **MMJ Athletics** (tagline: "Hockey Outfitters"). Bukan e-commerce — tidak ada harga, keranjang, atau pembayaran. Semua CTA mengarah ke **WhatsApp** untuk enquiry dan pemesanan.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Hosting:** Vercel
- **Database:** Supabase
- **Bahasa UI:** Bahasa Indonesia
- **Visual Style:** Sport-rugged, dark theme (terinspirasi Bauer.com)

## Tentang Toko
- MMJ Athletics adalah toko hoki es yang menjual peralatan dari brand **Bauer** dan **CCM**
- MMJ Athletics juga memproduksi **jersey kustom** dengan brand sendiri (MMJ Athletics)
- Target pasar: pemain hoki es, tim hoki, pelatih, dan manajer tim di Indonesia

---

## STOREFRONT (Website Publik)

### Desain Visual
- **Warna utama:** Dark background (#0a0a0a), Ice Blue (#4fc3f7), Red (#e53935)
- **Warna WhatsApp:** Green (#25d366) untuk semua CTA
- **Font:** Oswald (heading), Barlow Condensed (label), Barlow (body)
- **Style:** Gelap, maskulin, sport-rugged seperti Bauer. Angular cut corners, stripe accent, textured backgrounds

### Halaman-Halaman

#### 1. Homepage
- **Top bar:** "Hubungi kami via WhatsApp untuk pemesanan & konsultasi"
- **Navbar:** Logo MMJ Athletics (hexagonal) + navigasi + search + hamburger menu (mobile)
- **Hero section:** 
  - Tag: "Katalog Musim 2026"
  - Headline: "Lengkapi. Kuasai. Arena Es."
  - Deskripsi singkat tentang toko
  - CTA: "Hubungi WhatsApp" (hijau) + "Lihat Katalog" (outline)
- **Brand bar:** Logo text Bauer, CCM, Warrior, True — sebagai dealer resmi
- **Kategori section:** 3 card — Helm & Pelindung, Jersey Kustom, Base Layer & Kaos Kaki
- **Jersey kustom section:** Preview jersey dengan color swatches, fitur sublimasi, CTA WhatsApp
- **Produk unggulan section:** Grid 2 kolom, 4 produk tanpa harga, setiap produk ada "💬 Tanyakan"
- **WhatsApp CTA banner:** Background hijau, "Tertarik? Langsung Chat Kami!"
- **Team banner:** Background merah, "Pelatih & Manajer Tim" — CTA "Tanya Paket Tim"
- **Trust bar:** 4 item — Dealer Resmi, Respons Cepat, Desain Kustom, Ahli Hoki
- **Footer:** Nomor WhatsApp, navigasi link, social media (Instagram, Facebook, TikTok)
- **Floating WhatsApp button:** Pojok kanan bawah, selalu visible

#### 2. Halaman Katalog (per kategori)
- Header dengan back button + nama kategori
- Filter tabs: Semua, Helm, Sarung Tangan, Pads, dll
- Grid produk 2 kolom
- Setiap card: foto produk, brand (Bauer/CCM/MMJ), nama produk, "💬 Tanyakan" (bukan harga)
- Klik card → ke detail produk

#### 3. Halaman Detail Produk
- Foto produk besar (multiple angles)
- Brand + nama produk
- Tags (kategori, sertifikasi, level)
- Deskripsi produk
- Spesifikasi (bahan, ukuran, berat, sertifikasi) dalam grid 2x2
- **CTA besar: "Tanyakan via WhatsApp"** — pre-filled message
- Text kecil: "Tanya stok, ukuran, atau harga langsung ke tim kami"

#### 4. Halaman Jersey Kustom
- Visual jersey showcase dengan color swatches (6 warna)
- Headline: "Bangun Identitas Tim Anda"
- Deskripsi + fitur list:
  - Sublimasi kustom penuh
  - Nama, nomor & patch kapten
  - Kaos kaki & jersey latihan serasi
  - Minimal order 15+ set
  - Pengerjaan 2-3 minggu
- CTA: "Konsultasi Jersey via WhatsApp"
- Galeri jersey (grid 3x2 atau lebih)

### WhatsApp Integration (Gratis)
- Setiap tombol "Tanyakan" membuka `wa.me/62XXXXXXXXXX?text=...` dengan pesan pre-filled
- Contoh pre-filled message:
  ```
  Halo MMJ Athletics, saya tertarik dengan [Nama Produk] (Kategori: [Kategori]). Mohon info ketersediaan dan harga. Terima kasih!
  ```
- Pesan berbeda untuk:
  - Enquiry produk individual
  - Konsultasi jersey kustom
  - Enquiry paket tim
- Gunakan WhatsApp Business App untuk quick replies dan label

---

## CMS / BACKOFFICE (Admin Panel)

### Desain CMS
- Dark theme matching storefront (#0f1117 background)
- Sidebar navigasi di kiri
- Responsive tapi fokus desktop-first

### Sidebar Navigasi
**Utama:**
- Dashboard
- Pesan Masuk (enquiry WA) — dengan badge jumlah baru
- Enquiry Jersey — dengan badge
- Enquiry Tim — dengan badge

**Katalog:**
- Produk (CRUD)
- Kategori
- Stok

**Pelanggan:**
- Database Kontak
- Tim Terdaftar

**Konten:**
- Banner & Halaman
- Promosi

**Pengaturan:**
- Pengaturan Situs
- WhatsApp Config (nomor WA, template pesan)
- Pengguna & Akses

### Halaman CMS

#### 1. Dashboard
- **4 stat cards:**
  - Enquiry bulan ini (warna hijau WA)
  - Enquiry jersey kustom
  - Enquiry tim/grosir
  - Konversi (enquiry → deal) dalam persen
- **Funnel enquiry chart:** Masuk → Dibalas → Penawaran → Deal → Batal (horizontal bar)
- **Produk paling ditanyakan:** Top 5 ranked list

#### 2. Enquiry Management
- Filter tabs: Semua, Baru, Dibalas, Penawaran, Deal, Batal
- Search bar
- Card per enquiry:
  - Nama kontak + nomor WA + timestamp
  - Tipe badge: Peralatan (biru), Jersey (merah), Tim (kuning)
  - Deskripsi kebutuhan
  - Status: Baru (hijau), Dibalas (biru), Penawaran (kuning), Deal (hijau check), Batal (merah)
  - Tombol aksi: Balas via WA, Tandai dibalas, Kirim penawaran, Follow up, Tandai deal
- **Quick-add form:** Admin bisa input enquiry manual dengan cepat (nama, nomor WA, dropdown produk, catatan)

#### 3. Produk Management
- CRUD produk (tambah, edit, hapus)
- Fields: nama, brand (Bauer/CCM/MMJ Athletics), kategori, deskripsi, spesifikasi, foto, status (aktif/draft)
- **TIDAK ada field harga** di website publik

#### 4. Customer Database
- List semua kontak yang pernah enquiry
- Fields: nama, nomor WA, email (opsional), riwayat enquiry, catatan
- Filter dan search

#### 5. Tim Terdaftar
- Database tim yang pernah order/enquiry
- Fields: nama tim, PIC, nomor WA, jumlah anggota, riwayat order, catatan

#### 6. Content Management
- Edit banner homepage
- Edit teks halaman (about, FAQ, dll)
- Manage promosi/sale tags pada produk

#### 7. Export ke Google Sheets
- Tombol export data enquiry ke Google Sheets
- Untuk backup dan tracking sederhana

---

## Supabase Database Tables

### products
- id, name, brand, category_id, description, specs (JSON), images (array), status, created_at, updated_at

### categories
- id, name, slug, icon, sort_order

### enquiries
- id, contact_name, wa_number, type (equipment/jersey/team), product_id (nullable), message, status (new/replied/quoted/won/lost), pic, notes, created_at, updated_at

### contacts
- id, name, wa_number, email, notes, created_at

### teams
- id, name, pic_name, wa_number, member_count, notes, created_at

### banners
- id, title, subtitle, image_url, cta_text, cta_link, position, is_active, created_at

### site_settings
- id, key, value (untuk WhatsApp number, site title, dll)

---

## Nomor WhatsApp
- Placeholder: +62 812-XXXX-XXXX (nanti diganti nomor asli)

## Domain
- Belum ditentukan (kemungkinan mmjathletics.com atau mmjathletics.id)

## Catatan Development
- User tidak bisa coding — semua development via Claude Code
- Prioritaskan code yang clean dan mudah di-maintain
- Gunakan TypeScript
- Gunakan Tailwind CSS untuk styling
- Gunakan Supabase client library untuk database
- Setup GitHub repo dan auto-deploy via Vercel
