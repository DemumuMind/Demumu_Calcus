export interface HistoryEntry {
  id: string;
  timestamp: number;
  calculatorSlug: string;
  calculatorTitle: string;
  inputs: Record<string, string | number>;
  results: Array<{ label: string; value: string | number }>;
  url: string;
}

const HISTORY_KEY = 'calcus-history';
const MAX_ENTRIES = 50;

function isLocalStorageAvailable(): boolean {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

export function addToHistory(entry: Omit<HistoryEntry, 'id' | 'timestamp'>): void {
  if (!isLocalStorageAvailable()) return;
  const history = getHistory();
  const newEntry: HistoryEntry = {
    ...entry,
    id: typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    timestamp: Date.now(),
  };
  const updated = [newEntry, ...history].slice(0, MAX_ENTRIES);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}

export function getHistory(): HistoryEntry[] {
  if (!isLocalStorageAvailable()) return [];
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  if (!isLocalStorageAvailable()) return;
  localStorage.removeItem(HISTORY_KEY);
}

export function deleteHistoryEntry(id: string): void {
  if (!isLocalStorageAvailable()) return;
  const history = getHistory().filter(e => e.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}
