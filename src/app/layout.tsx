import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BottomNav } from "@/components/mobile/bottom-nav";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AnalyticsProvider } from "@/components/analytics-provider";
import { PwaProvider } from "@/components/pwa-provider";
import { calculators } from "@/lib/calculators";

const isDevelopment = process.env.NODE_ENV === "development";

export const metadata: Metadata = {
  title: `Calcus — ${calculators.length}+ онлайн-калькуляторов`,
  description: "Бесплатные онлайн-калькуляторы для математики, финансов, здоровья, строительства. Все расчёты выполняются мгновенно и без регистрации.",
  keywords: "калькулятор, онлайн калькулятор, конвертер, математика, финансы, здоровье",
  themeColor: "#000000",
  manifest: "/manifest.json",
  icons: {
    apple: { url: "/icon-192x192.png", sizes: "192x192" },
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
        <Analytics />
        <SpeedInsights />
        <AnalyticsProvider />
        <PwaProvider />
        {process.env.NODE_ENV !== 'development' && (
          <Script
            id="yandex-rtb"
            strategy="afterInteractive"
            src="https://an.yandex.ru/system/context.js"
          />
        )}
      </body>
    </html>
  );
}
