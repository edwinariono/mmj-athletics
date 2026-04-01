-- MMJ Athletics Database Schema
-- Run this in Supabase SQL Editor to create all tables

-- Categories
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL CHECK (brand IN ('Bauer', 'CCM', 'Warrior', 'True', 'MMJ Athletics')),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  description TEXT,
  specs JSONB DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('active', 'draft')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contacts
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  wa_number TEXT NOT NULL,
  email TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Teams
CREATE TABLE teams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  pic_name TEXT NOT NULL,
  wa_number TEXT NOT NULL,
  member_count INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enquiries
CREATE TABLE enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_name TEXT NOT NULL,
  wa_number TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('equipment', 'jersey', 'team')),
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'replied', 'quoted', 'won', 'lost')),
  pic TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Banners
CREATE TABLE banners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  image_url TEXT,
  cta_text TEXT,
  cta_link TEXT,
  position TEXT DEFAULT 'hero',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site Settings (key-value store)
CREATE TABLE site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL
);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER enquiries_updated_at
  BEFORE UPDATE ON enquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Indexes
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_enquiries_status ON enquiries(status);
CREATE INDEX idx_enquiries_type ON enquiries(type);
CREATE INDEX idx_categories_slug ON categories(slug);

-- Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read access for storefront
CREATE POLICY "Public can read active products" ON products
  FOR SELECT USING (status = 'active');

CREATE POLICY "Public can read categories" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Public can read active banners" ON banners
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can read site settings" ON site_settings
  FOR SELECT USING (true);

-- Authenticated full access for admin
CREATE POLICY "Admin full access products" ON products
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access categories" ON categories
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access contacts" ON contacts
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access teams" ON teams
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access enquiries" ON enquiries
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access banners" ON banners
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access site_settings" ON site_settings
  FOR ALL USING (auth.role() = 'authenticated');
