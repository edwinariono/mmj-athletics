import type { Metadata } from "next";
import { Oswald, Barlow_Condensed, Barlow } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const barlow = Barlow({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MMJ Athletics — Hockey Outfitters",
  description:
    "Toko peralatan hoki es terlengkap di Indonesia. Dealer resmi Bauer & CCM. Jersey kustom untuk tim Anda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${oswald.variable} ${barlowCondensed.variable} ${barlow.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-white font-body">
        {children}
      </body>
    </html>
  );
}
