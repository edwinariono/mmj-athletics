import { createClient } from "@/lib/supabase/server";
import { HeroSection } from "@/components/storefront/HeroSection";
import { BrandBar } from "@/components/storefront/BrandBar";
import { CategoryCards } from "@/components/storefront/CategoryCards";
import { JerseyPreview } from "@/components/storefront/JerseyPreview";
import { FeaturedProducts } from "@/components/storefront/FeaturedProducts";
import { PromoBanner } from "@/components/storefront/PromoBanner";
import { WaCTABanner } from "@/components/storefront/WaCTABanner";
import { TeamBanner } from "@/components/storefront/TeamBanner";
import { TrustBar } from "@/components/storefront/TrustBar";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let heroBanner = null;
  let promoBanners: any[] = [];

  try {
    const supabase = await createClient();

    const [heroResult, promoResult] = await Promise.all([
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
    ]);

    heroBanner = heroResult.data;
    promoBanners = promoResult.data || [];
  } catch {
    // Fallback to static content
  }

  return (
    <>
      <HeroSection banner={heroBanner} />
      <BrandBar />
      <CategoryCards />
      {promoBanners.length > 0 && <PromoBanner banners={promoBanners} />}
      <JerseyPreview />
      <FeaturedProducts />
      <WaCTABanner />
      <TeamBanner />
      <TrustBar />
    </>
  );
}
