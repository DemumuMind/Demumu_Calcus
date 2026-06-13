import { NextResponse } from 'next/server';
import { refreshCryptoRates } from '@/lib/cryptoRates';

export const revalidate = 3600;

export async function GET() {
  const rates = await refreshCryptoRates();
  return NextResponse.json({ rates, updated: new Date().toISOString() });
}
