export const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || "6281200000000";

export const BRANDS = ["Bauer", "CCM", "Warrior", "True", "MMJ Athletics"] as const;

export const CATEGORIES = [
  { name: "Helm & Pelindung", slug: "helm-pelindung", icon: "Shield" },
  { name: "Jersey Kustom", slug: "jersey-kustom", icon: "Shirt" },
  { name: "Base Layer & Kaos Kaki", slug: "base-layer", icon: "Layers" },
  { name: "Stik & Blade", slug: "stik-blade", icon: "Swords" },
  { name: "Skate & Aksesoris", slug: "skate-aksesoris", icon: "Footprints" },
] as const;

export const ENQUIRY_TYPES = {
  equipment: { label: "Peralatan", color: "bg-ice-blue" },
  jersey: { label: "Jersey", color: "bg-mmj-red" },
  team: { label: "Tim", color: "bg-yellow-500" },
} as const;

export const ENQUIRY_STATUSES = {
  new: { label: "Baru", color: "bg-wa-green" },
  replied: { label: "Dibalas", color: "bg-ice-blue" },
  quoted: { label: "Penawaran", color: "bg-yellow-500" },
  won: { label: "Deal", color: "bg-wa-green" },
  lost: { label: "Batal", color: "bg-mmj-red" },
} as const;

export const JERSEY_COLORS = [
  "#e53935",
  "#1e88e5",
  "#111111",
  "#ffffff",
  "#fdd835",
  "#43a047",
] as const;
