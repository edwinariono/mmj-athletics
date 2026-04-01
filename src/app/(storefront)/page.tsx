import { createClient } from "@/lib/supabase/server";
import { HeroSection } from "@/components/storefront/HeroSection";
import { BrandBar } from "@/components/storefront/BrandBar";
import { CategoryCards } from "@/components/storefront/CategoryCards";
import { JerseyPreview } from "@/components/storefront/JerseyPreview";
import { FeaturedProducts } from "@/components/storefront/FeaturedProducts";
import { WaCTABanner } from "@/components/storefront/WaCTABanner";
import { TeamBanner } from "@/components/storefront/TeamBanner";
import { TrustBar } from "@/components/storefront/TrustBar";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let heroBanner = null;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("banners")
      .select("*")
      .eq("position", "hero")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();
    heroBanner = data;
  } catch {
    // Fallback to static content if Supabase is not available
  }

  return (
    <>
      <HeroSection banner={heroBanner} />
      <BrandBar />
      <CategoryCards />
      <JerseyPreview />
      <FeaturedProducts />
      <WaCTABanner />
      <TeamBanner />
      <TrustBar />
    </>
  );
}
