"use client";

import { ReactNode } from "react";

export type AdminPageHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function AdminPageHeader({ title, description, actions }: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 pb-5 border-b border-white/5">
      <div>
        <h1 className="text-2xl font-black text-white">{title}</h1>
        {description && (
          <p className="text-sm text-text-secondary mt-1">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function AdminCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`glass rounded-xl border border-white/5 ${className}`}>
      {children}
    </div>
  );
}

export function NotConfiguredBanner() {
  return (
    <div className="glass rounded-xl border border-warning/30 bg-warning/5 p-5 mb-6">
      <h3 className="text-sm font-bold text-warning mb-1">
        Supabase belum di-configure
      </h3>
      <p className="text-xs text-text-secondary leading-relaxed">
        Set <code className="text-white">NEXT_PUBLIC_SUPABASE_URL</code> dan{" "}
        <code className="text-white">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> di{" "}
        <code className="text-white">.env.local</code> lalu jalankan migrations di{" "}
        <code className="text-white">supabase/migrations/</code>. Site frontend tetap jalan
        dengan fallback data hardcoded di <code className="text-white">data/*.ts</code>.
      </p>
    </div>
  );
}
