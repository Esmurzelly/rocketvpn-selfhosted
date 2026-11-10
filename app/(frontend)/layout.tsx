import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});


export const metadata: Metadata = {
  metadataBase: new URL("https://rkt-vpn.com"),
  title: "Rocket VPN",
  description: "Rocket VPN для свободного и безопасного доступа в интернет. Высокая скорость, стабильные серверы, поддержка Windows, Android, iPhone, macOS и Android TV.",
  openGraph: {
    siteName: "Rocket VPN",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} h-full antialiased scroll-smooth`}
    >

      <body className="min-h-full flex flex-col overflow-x-hidden">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
