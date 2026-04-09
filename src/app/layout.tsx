import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Calcus Clone - 600+ онлайн-калькуляторов",
  description: "Бесплатные онлайн-калькуляторы для математики, финансов, здоровья, строительства. Все расчёты выполняются мгновенно и без регистрации.",
  keywords: "калькулятор, онлайн калькулятор, конвертер, математика, финансы, здоровье",
  openGraph: {
    title: "Calcus Clone - 600+ онлайн-калькуляторов",
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
      </body>
    </html>
  );
}
