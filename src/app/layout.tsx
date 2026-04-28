import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BottomNav } from "@/components/mobile/bottom-nav";
import { AnalyticsProvider } from "@/components/analytics-provider";
import { PwaProvider } from "@/components/pwa-provider";
import { calculators } from "@/lib/calculators";

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: `Calcus — ${calculators.length}+ онлайн-калькуляторов`,
  description: "Бесплатные онлайн-калькуляторы для математики, финансов, здоровья, строительства. Все расчёты выполняются мгновенно и без регистрации.",
  keywords: "калькулятор, онлайн калькулятор, конвертер, математика, финансы, здоровье",
  manifest: "/manifest.json",
  icons: {
    apple: { url: "/icon-192x192.png", sizes: "192x192" },
    icon: [
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Calcus",
    startupImage: [
      { url: "/icon-512x512.png", media: "(device-width: 768px) and (device-height: 1024px)" },
    ],
  },
  openGraph: {
    title: `Calcus — ${calculators.length}+ онлайн-калькуляторов`,
    description: "Бесплатные онлайн-калькуляторы для всех задач",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <BottomNav />
          <div className="hidden md:block">
            <Footer />
          </div>
        </ThemeProvider>
        <AnalyticsProvider />
        <PwaProvider />
        {process.env.NODE_ENV !== 'development' && (
          <Script
            id="yandex-rtb"
            strategy="lazyOnload"
            src="https://an.yandex.ru/system/context.js"
          />
        )}
      </body>
    </html>
  );
}
