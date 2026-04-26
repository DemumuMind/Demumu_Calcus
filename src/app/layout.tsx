import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AnalyticsProvider } from "@/components/analytics-provider";
import { PwaProvider } from "@/components/pwa-provider";
import { calculators } from "@/lib/calculators";

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
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
        <AnalyticsProvider />
        <PwaProvider />
      </body>
    </html>
  );
}
