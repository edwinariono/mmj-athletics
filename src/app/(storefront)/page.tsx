import { createClient } from "@/lib/supabase/server";
import { HeroSection } from "@/components/storefront/HeroSection";
import { CategoryCards } from "@/components/storefront/CategoryCards";
import { JerseyPreview } from "@/components/storefront/JerseyPreview";
import { FeaturedProducts } from "@/components/storefront/FeaturedProducts";
import { PromoBanner } from "@/components/storefront/PromoBanner";
import { WaCTABanner } from "@/components/storefront/WaCTABanner";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let heroBanner = null;
  let promoBanners: any[] = [];
  const texts: Record<string, string> = {};

  try {
    const supabase = await createClient();

    const [heroResult, promoResult, settingsResult] = await Promise.all([
      supabase
        .from("banners")
        .select("*")
        .eq("position", "hero")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(1)
        .single(),
      supabase
        .from("banners")
        .select("*")
        .eq("position", "promo")
        .eq("is_active", true)
        .order("created_at", { ascending: false }),
      supabase.from("site_settings").select("key, value"),
    ]);

    heroBanner = heroResult.data;
    promoBanners = promoResult.data || [];
    settingsResult.data?.forEach((s: { key: string; value: string }) => {
      texts[s.key] = s.value;
    });
  } catch {
    // Fallback to static content
  }

  return (
    <>
      <HeroSection
        banner={heroBanner}
        tagline={texts.hero_tagline}
        headline={texts.hero_headline}
        description={texts.hero_description}
      />
      <CategoryCards />
      {promoBanners.length > 0 && <PromoBanner banners={promoBanners} />}
      <JerseyPreview
        headline={texts.jersey_headline}
        description={texts.jersey_description}
      />
      <FeaturedProducts />
      <WaCTABanner
        headline={texts.wa_cta_headline}
        description={texts.wa_cta_description}
      />
    </>
  );
}
