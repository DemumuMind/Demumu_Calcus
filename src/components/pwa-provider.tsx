"use client";

import { useEffect } from "react";

export function PwaProvider() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch((err) => {
          // eslint-disable-next-line no-console
          console.error("SW registration failed:", err);
        });
      });
    }
  }, []);

  return null;
}
