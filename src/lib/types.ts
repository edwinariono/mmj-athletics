export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  sort_order: number;
}

export interface Product {
  id: string;
  name: string;
  brand: "Bauer" | "CCM" | "Warrior" | "True" | "MMJ Athletics";
  category_id: string;
  category?: Category;
  description: string;
  specs: Record<string, string>;
  images: string[];
  status: "active" | "draft";
  tags?: string[];
  created_at: string;
  updated_at: string;
}

export interface Enquiry {
  id: string;
  contact_name: string;
  wa_number: string;
  type: "equipment" | "jersey" | "team";
  product_id: string | null;
  product?: Product;
  message: string;
  status: "new" | "replied" | "quoted" | "won" | "lost";
  pic: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: string;
  name: string;
  wa_number: string;
  email: string | null;
  notes: string | null;
  created_at: string;
}

export interface Team {
  id: string;
  name: string;
  pic_name: string;
  wa_number: string;
  member_count: number;
  notes: string | null;
  created_at: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string | null;
  cta_text: string | null;
  cta_link: string | null;
  position: string;
  is_active: boolean;
  created_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
}
