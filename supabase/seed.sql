-- Seed Data for MMJ Athletics

-- Categories
INSERT INTO categories (name, slug, icon, sort_order) VALUES
  ('Helm & Pelindung', 'helm-pelindung', 'Shield', 1),
  ('Jersey Kustom', 'jersey-kustom', 'Shirt', 2),
  ('Base Layer & Kaos Kaki', 'base-layer', 'Layers', 3),
  ('Stik & Blade', 'stik-blade', 'Swords', 4),
  ('Skate & Aksesoris', 'skate-aksesoris', 'Footprints', 5);

-- Products (using subquery for category_id)
INSERT INTO products (name, brand, category_id, description, specs, tags, status) VALUES
  ('Bauer RE-AKT 85 Helmet', 'Bauer',
    (SELECT id FROM categories WHERE slug = 'helm-pelindung'),
    'Helm hoki es premium dengan teknologi perlindungan terdepan. Dilengkapi dengan sistem ventilasi canggih dan padding yang dapat disesuaikan untuk kenyamanan maksimal di atas es.',
    '{"Bahan": "Polycarbonate Shell", "Ukuran": "S, M, L, XL", "Berat": "380g", "Sertifikasi": "CSA, HECC, CE"}'::jsonb,
    ARRAY['Pro Level', 'CSA Certified'], 'active'),

  ('CCM Tacks AS-V Pro Gloves', 'CCM',
    (SELECT id FROM categories WHERE slug = 'helm-pelindung'),
    'Sarung tangan hoki es profesional dengan konstruksi D3O® untuk perlindungan superior. Jari-jari fleksibel memberikan kontrol stik yang presisi.',
    '{"Bahan": "D3O® Smart Material", "Ukuran": "10\", 11\", 12\", 13\", 14\"", "Berat": "280g", "Sertifikasi": "Pro Grade"}'::jsonb,
    ARRAY['Pro Level'], 'active'),

  ('Bauer Supreme M5 Pro Skates', 'Bauer',
    (SELECT id FROM categories WHERE slug = 'skate-aksesoris'),
    'Sepatu es performa tinggi dengan boot karbon komposit untuk dukungan dan transfer energi optimal. Blade Tuuk LS Pulse TI untuk ketajaman dan kecepatan.',
    '{"Bahan": "Carbon Composite Boot", "Ukuran": "6-12 (Fit 1, 2, 3)", "Berat": "780g", "Sertifikasi": "Pro Grade"}'::jsonb,
    ARRAY['Pro Level', 'Best Seller'], 'active'),

  ('CCM Jetspeed FT6 Pro Stick', 'CCM',
    (SELECT id FROM categories WHERE slug = 'stik-blade'),
    'Stik hoki es ringan dengan teknologi Nanolite Carbon untuk kekuatan dan responsivitas. Blade Sigmatex untuk akurasi tembakan yang konsisten.',
    '{"Bahan": "Nanolite Carbon Layup", "Ukuran": "Senior 75/85/95 Flex", "Berat": "375g", "Sertifikasi": "Pro Grade"}'::jsonb,
    ARRAY['Pro Level', 'Lightweight'], 'active'),

  ('MMJ Athletics Custom Team Jersey', 'MMJ Athletics',
    (SELECT id FROM categories WHERE slug = 'jersey-kustom'),
    'Jersey tim kustom dengan sublimasi penuh. Desain sesuai identitas tim Anda — nama, nomor, dan patch kapten. Bahan breathable untuk performa optimal.',
    '{"Bahan": "Polyester Mesh Breathable", "Ukuran": "Youth S - Adult 3XL", "Berat": "220g", "Sertifikasi": "Custom Made"}'::jsonb,
    ARRAY['Custom', 'Team Order'], 'active'),

  ('Bauer Pro Series Base Layer Top', 'Bauer',
    (SELECT id FROM categories WHERE slug = 'base-layer'),
    'Base layer kompresi dengan teknologi kelembapan untuk menjaga tubuh tetap kering dan nyaman. Pas ketat untuk performa atletik.',
    '{"Bahan": "87% Polyester, 13% Spandex", "Ukuran": "S, M, L, XL, XXL", "Berat": "160g", "Sertifikasi": "Performance Wear"}'::jsonb,
    ARRAY['Comfort Fit'], 'active'),

  ('CCM Super Tacks AS4 Shoulder Pads', 'CCM',
    (SELECT id FROM categories WHERE slug = 'helm-pelindung'),
    'Pelindung bahu dengan konstruksi D3O® untuk perlindungan benturan maksimal. Desain ergonomis memungkinkan gerakan bebas.',
    '{"Bahan": "D3O® + PE Foam", "Ukuran": "S, M, L, XL", "Berat": "1.2kg", "Sertifikasi": "Pro Grade"}'::jsonb,
    ARRAY['Pro Level', 'Max Protection'], 'active'),

  ('Bauer Performance Hockey Socks', 'Bauer',
    (SELECT id FROM categories WHERE slug = 'base-layer'),
    'Kaos kaki hoki es performa tinggi dengan bantalan di area kunci. Bahan anti-bakteri menjaga kaki tetap segar selama permainan.',
    '{"Bahan": "Nylon Blend Anti-Microbial", "Ukuran": "Junior, Senior", "Berat": "80g", "Sertifikasi": "Performance Wear"}'::jsonb,
    ARRAY['Essential'], 'active');

-- Default site settings
INSERT INTO site_settings (key, value) VALUES
  ('wa_number', '6281200000000'),
  ('site_title', 'MMJ Athletics'),
  ('site_tagline', 'Hockey Outfitters');

-- Default banner
INSERT INTO banners (title, subtitle, cta_text, cta_link, position, is_active) VALUES
  ('Katalog Musim 2026', 'Peralatan hoki es terbaru telah tiba', 'Lihat Katalog', '/katalog/helm-pelindung', 'hero', true);
