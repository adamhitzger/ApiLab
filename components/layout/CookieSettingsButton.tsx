"use client";

declare global {
  interface Window {
    Cookiebot?: { renew: () => void };
  }
}

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.Cookiebot?.renew()}>
      Nastavení cookies
    </button>
  );
}
