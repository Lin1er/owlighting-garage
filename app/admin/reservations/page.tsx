"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase, isSupabaseConfigured, type Reservation } from "@/lib/supabase";
import { FaWhatsapp, FaPhone } from "react-icons/fa";
import {
  AdminPageHeader,
  AdminCard,
  NotConfiguredBanner,
} from "../_components/AdminShell";
import { Select } from "../_components/AdminInputs";
import { useToast } from "@/app/components/ui/Toast";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const STATUSES: Reservation["status"][] = ["new", "contacted", "won", "lost"];

const statusClass: Record<Reservation["status"], string> = {
  new: "bg-warning/10 text-warning border-warning/30",
  contacted: "bg-beam-400/10 text-beam-400 border-beam-400/30",
  won: "bg-success/10 text-success border-success/30",
  lost: "bg-danger/10 text-danger border-danger/30",
};

export default function ReservationsAdminPage() {
  const [items, setItems] = useState<Reservation[]>([]);
  const [filter, setFilter] = useState<"all" | Reservation["status"]>("all");
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    void load();
  }, []);

  const load = async () => {
    if (!supabase) return setLoading(false);
    setLoading(true);
    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (!error) setItems((data as Reservation[]) ?? []);
    setLoading(false);
  };

  const filtered = useMemo(
    () =>
      filter === "all" ? items : items.filter((r) => r.status === filter),
    [items, filter],
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: items.length };
    for (const r of items) c[r.status] = (c[r.status] ?? 0) + 1;
    return c;
  }, [items]);

  const updateStatus = async (id: number, status: Reservation["status"]) => {
    if (!supabase) return;
    const { error } = await supabase
      .from("reservations")
      .update({ status })
      .eq("id", id);
    if (error) toast.push(`Gagal: ${error.message}`, "error");
    else {
      toast.push("Status diperbarui", "success");
      setItems((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Reservations"
        description="Lead dari form reservasi. Klik WhatsApp untuk follow-up."
      />

      {!isSupabaseConfigured && <NotConfiguredBanner />}

      {/* Status filter chips */}
      <div className="flex gap-2 flex-wrap mb-5">
        {(["all", ...STATUSES] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs uppercase tracking-widest transition-all ${
              filter === s
                ? "bg-beam-400 text-[color:var(--text-on-beam)] font-bold"
                : "bg-white/5 text-text-secondary hover:bg-white/10 border border-white/10"
            }`}
          >
            {s === "all" ? "Semua" : s}
            <span className="ml-2 tabular text-[10px] opacity-70">{counts[s] ?? 0}</span>
          </button>
        ))}
      </div>

      <AdminCard className="overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-text-tertiary text-sm">Memuat…</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-text-tertiary text-sm">
            Belum ada reservasi {filter !== "all" && `dengan status "${filter}"`}.
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filtered.map((r) => (
              <div key={r.id} className="p-4 hover:bg-white/[0.02] transition-colors">
                <div className="flex flex-col md:flex-row md:items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-semibold text-white">{r.name}</span>
                      <span
                        className={`text-[10px] uppercase tracking-widest font-bold px-1.5 py-0.5 rounded border ${statusClass[r.status]}`}
                      >
                        {r.status}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary">
                      <span className="text-beam-400">{r.service}</span> ·{" "}
                      {r.vehicle}
                      {r.vehicle_model ? ` · ${r.vehicle_model}` : ""}
                      {r.preferred_date && (
                        <>
                          {" "}
                          · 📅 {new Date(r.preferred_date).toLocaleDateString("id-ID")}
                        </>
                      )}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-text-tertiary">
                      <span>
                        {new Date(r.created_at).toLocaleString("id-ID", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                      {r.phone && (
                        <span className="font-mono text-text-secondary">{r.phone}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {r.phone && (
                      <>
                        <a
                          href={buildWhatsAppLink({
                            to: r.phone.replace(/\D/g, ""),
                            message: `Halo ${r.name},\n\nTerima kasih sudah mendaftar konsultasi Custom BILED di Owlighting. Saya ingin follow-up reservasi Anda untuk *${r.service}* (${r.vehicle}${r.vehicle_model ? ` ${r.vehicle_model}` : ""}).`,
                          })}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-success/15 text-success rounded-lg hover:bg-success/25 transition-colors text-xs font-semibold"
                        >
                          <FaWhatsapp size={12} /> WA
                        </a>
                        <a
                          href={`tel:${r.phone}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors text-xs"
                        >
                          <FaPhone size={11} />
                        </a>
                      </>
                    )}
                    <Select
                      value={r.status}
                      onChange={(e) =>
                        updateStatus(r.id, e.target.value as Reservation["status"])
                      }
                      className="!w-32"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s} className="bg-bg-card">
                          {s}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminCard>
    </div>
  );
}
