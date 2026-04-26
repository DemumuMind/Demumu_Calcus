"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";

export function PwaProvider() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          // eslint-disable-next-line no-console
          console.log("SW registered:", reg.scope);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error("SW registration failed:", err);
        });
    }

    // Listen for install prompt
    const handleBeforeInstall = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setInstallPrompt(e);
      // Show prompt after 5 seconds if user hasn't dismissed it recently
      const dismissed = localStorage.getItem("pwa-prompt-dismissed");
      const dismissedDate = dismissed ? new Date(dismissed) : null;
      const now = new Date();
      const daysSinceDismissed = dismissedDate
        ? (now.getTime() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24)
        : Infinity;

      if (daysSinceDismissed > 7) {
        setTimeout(() => setShowPrompt(true), 5000);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall as EventListener);

    // Listen for successful install
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setInstallPrompt(null);
      localStorage.removeItem("pwa-prompt-dismissed");
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall as EventListener);
    };
  }, []);

  const handleInstall = useCallback(async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const result = await installPrompt.userChoice;
    if (result.outcome === "accepted") {
      setShowPrompt(false);
      setInstallPrompt(null);
    }
  }, [installPrompt]);

  const handleDismiss = useCallback(() => {
    setShowPrompt(false);
    localStorage.setItem("pwa-prompt-dismissed", new Date().toISOString());
  }, []);

  if (isInstalled || !showPrompt || !installPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 md:bottom-4 md:left-auto md:right-4 md:w-80">
      <div className="rounded-xl border bg-card p-4 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Download className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm">Установить Calcus</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Добавьте на главный экран для быстрого доступа к калькуляторам офлайн
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="shrink-0 -mt-1 -mr-1 p-1 rounded-md hover:bg-muted transition-colors"
            aria-label="Закрыть"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
        <div className="mt-3 flex gap-2">
          <Button size="sm" className="flex-1" onClick={handleInstall}>
            <Download className="h-4 w-4 mr-1.5" />
            Установить
          </Button>
          <Button size="sm" variant="ghost" onClick={handleDismiss}>
            Позже
          </Button>
        </div>
      </div>
    </div>
  );
}
