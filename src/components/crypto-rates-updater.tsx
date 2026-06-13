'use client';

import { useEffect } from 'react';
import { refreshCryptoRates } from '@/lib/cryptoRates';

export function CryptoRatesUpdater() {
  useEffect(() => {
    refreshCryptoRates();
    const interval = setInterval(refreshCryptoRates, 3600000); // refresh every hour
    return () => clearInterval(interval);
  }, []);

  return null;
}
