import { WA_NUMBER } from "./constants";

export function buildWaLink(message: string, phone?: string): string {
  const number = phone || WA_NUMBER;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

export function buildProductEnquiryLink(
  productName: string,
  category: string
): string {
  const message = `Halo MMJ Athletics, saya tertarik dengan ${productName} (Kategori: ${category}). Mohon info ketersediaan dan harga. Terima kasih!`;
  return buildWaLink(message);
}

export function buildJerseyEnquiryLink(): string {
  const message =
    "Halo MMJ Athletics, saya ingin konsultasi tentang jersey kustom untuk tim kami. Mohon info desain, harga, dan proses pemesanan. Terima kasih!";
  return buildWaLink(message);
}

export function buildTeamEnquiryLink(): string {
  const message =
    "Halo MMJ Athletics, saya ingin tanya tentang paket peralatan untuk tim kami. Mohon info harga paket dan ketersediaan. Terima kasih!";
  return buildWaLink(message);
}

export function buildGeneralEnquiryLink(): string {
  const message =
    "Halo MMJ Athletics, saya tertarik dengan produk Anda. Mohon info lebih lanjut. Terima kasih!";
  return buildWaLink(message);
}
