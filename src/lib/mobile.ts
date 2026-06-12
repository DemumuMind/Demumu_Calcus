export function isCapacitor(): boolean {
  return typeof window !== 'undefined' && !!(window as Window & { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor?.isNativePlatform?.();
}

export function isMobileWeb(): boolean {
  return typeof window !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export function isMobileApp(): boolean {
  return isCapacitor() || isMobileWeb();
}
