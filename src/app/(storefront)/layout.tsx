import { TopBar } from "@/components/storefront/TopBar";
import { Navbar } from "@/components/storefront/Navbar";
import { Footer } from "@/components/storefront/Footer";
import { FloatingWaButton } from "@/components/storefront/FloatingWaButton";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWaButton />
    </>
  );
}
