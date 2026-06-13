const RATE_CACHE = new Map<string, { rate: number; ts: number }>();
const CACHE_TTL = 3600000; // 1 hour

const COIN_IDS = ['bitcoin', 'ethereum', 'tether'] as const;
type CoinId = (typeof COIN_IDS)[number];

const FALLBACKS: Record<CoinId, number> = {
  bitcoin: 6_500_000,
  ethereum: 180_000,
  tether: 95,
};

const COINGECKO_URL =
  'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=rub';

export function getCryptoRate(coin: string): number {
  const cached = RATE_CACHE.get(coin);
  if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.rate;
  return FALLBACKS[(coin as CoinId)] ?? 0;
}

export function getCryptoRateInfo(coin: string): { rate: number; fallback: boolean } {
  const cached = RATE_CACHE.get(coin);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return { rate: cached.rate, fallback: false };
  }
  return { rate: FALLBACKS[(coin as CoinId)] ?? 0, fallback: true };
}

function getFallbackRates(): Record<string, number> {
  const result: Record<string, number> = {};
  for (const coin of COIN_IDS) {
    result[coin] = FALLBACKS[coin];
  }
  return result;
}

export async function refreshCryptoRates(): Promise<Record<string, number>> {
  const now = Date.now();

  const allFresh = COIN_IDS.every((coin) => {
    const cached = RATE_CACHE.get(coin);
    return cached && now - cached.ts < CACHE_TTL;
  });

  if (allFresh) {
    const result: Record<string, number> = {};
    for (const coin of COIN_IDS) {
      result[coin] = RATE_CACHE.get(coin)!.rate;
    }
    return result;
  }

  if (typeof window !== 'undefined') {
    // Client side: ask the server API, then update the local in-memory cache.
    try {
      const res = await fetch('/api/crypto-rates');
      if (!res.ok) throw new Error('Crypto rates API error');
      const data = (await res.json()) as Record<string, number>;
      for (const [coin, rate] of Object.entries(data)) {
        if (typeof coin === 'string' && typeof rate === 'number') {
          RATE_CACHE.set(coin, { rate, ts: now });
        }
      }
      return data;
    } catch {
      return getFallbackRates();
    }
  }

  // Server side / SSR: fetch directly from CoinGecko.
  try {
    const res = await fetch(COINGECKO_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error('CoinGecko API error');
    const data = (await res.json()) as Record<string, Record<string, number>>;

    const result: Record<string, number> = {};
    for (const coin of COIN_IDS) {
      const rate = data?.[coin]?.rub;
      if (typeof rate === 'number') {
        RATE_CACHE.set(coin, { rate, ts: now });
        result[coin] = rate;
      } else {
        result[coin] = FALLBACKS[coin];
      }
    }
    return result;
  } catch {
    return getFallbackRates();
  }
}
