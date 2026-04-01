import { HeroSection } from "@/components/storefront/HeroSection";
import { BrandBar } from "@/components/storefront/BrandBar";
import { CategoryCards } from "@/components/storefront/CategoryCards";
import { JerseyPreview } from "@/components/storefront/JerseyPreview";
import { FeaturedProducts } from "@/components/storefront/FeaturedProducts";
import { WaCTABanner } from "@/components/storefront/WaCTABanner";
import { TeamBanner } from "@/components/storefront/TeamBanner";
import { TrustBar } from "@/components/storefront/TrustBar";

export default function HomePage() {
  return (
    <>
      <HeroSection />
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
