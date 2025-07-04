'use client';
import '@/lib/suppress-console-warning';

export function ConsolePatchProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
