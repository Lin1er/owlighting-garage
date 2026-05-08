"use client";

import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured, type HomepageStat } from "@/lib/supabase";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import {
  AdminPageHeader,
  AdminCard,
  NotConfiguredBanner,
} from "../_components/AdminShell";
import { FieldRow, TextInput } from "../_components/AdminInputs";
import { useToast } from "@/app/components/ui/Toast";

type Draft = Partial<HomepageStat>;

const blankDraft: Draft = {
  slug: "",
  value: "",
  label: "",
  icon: "FaStar",
  sort_order: 0,
};

export default function StatsAdminPage() {
  const [items, setItems] = useState<HomepageStat[]>([]);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    void load();
  }, []);

  const load = async () => {
    if (!supabase) return setLoading(false);
    setLoading(true);
    const { data, error } = await supabase
      .from("homepage_stats")
      .select("*")
      .order("sort_order", { ascending: true });
    if (!error) setItems((data as HomepageStat[]) ?? []);
    setLoading(false);
  };

  const save = async () => {
    if (!draft || !supabase) return;
    if (!draft.slug?.trim() || !draft.value?.trim() || !draft.label?.trim()) {
      toast.push("Slug, Value, dan Label wajib", "error");
      return;
    }
    const payload = {
      slug: draft.slug,
      value: draft.value,
      label: draft.label,
      icon: draft.icon ?? "FaStar",
      sort_order: draft.sort_order ?? 0,
    };
    const op = draft.id
      ? supabase.from("homepage_stats").update(payload).eq("id", draft.id)
      : supabase.from("homepage_stats").insert([payload]);
    const { error } = await op;
    if (error) {
      toast.push(`Gagal: ${error.message}`, "error");
      return;
    }
    toast.push("Tersimpan", "success");
    setDraft(null);
    void load();
  };

  const remove = async (id: number) => {
    if (!supabase) return;
    if (!confirm("Hapus stat ini?")) return;
    const { error } = await supabase.from("homepage_stats").delete().eq("id", id);
    if (error) toast.push(`Gagal: ${error.message}`, "error");
    else {
      toast.push("Dihapus", "success");
      void load();
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Homepage Stats"
        description="Counter angka di section Stats homepage (500+ kendaraan, 99% kepuasan, dst)."
        actions={
          <button
            onClick={() => setDraft({ ...blankDraft })}
            className="inline-flex items-center gap-2 px-4 py-2 bg-beam-400 text-[color:var(--text-on-beam)] font-semibold rounded-lg hover:bg-beam-200 transition-colors text-sm"
          >
            <FaPlus size={12} /> Tambah
          </button>
        }
      />

      {!isSupabaseConfigured && <NotConfiguredBanner />}

      {draft && (
        <AdminCard className="p-5 mb-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white">
              {draft.id ? "Edit Stat" : "Stat Baru"}
            </h2>
            <button onClick={() => setDraft(null)} className="text-text-tertiary hover:text-white">
              <FaTimes size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldRow label="Slug" hint="URL-safe identifier">
              <TextInput
                value={draft.slug ?? ""}
                onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
                placeholder="vehicles"
              />
            </FieldRow>
            <FieldRow label="Value" hint='Angka + suffix, contoh "500+", "99%"'>
              <TextInput
                value={draft.value ?? ""}
                onChange={(e) => setDraft({ ...draft, value: e.target.value })}
                placeholder="500+"
              />
            </FieldRow>
            <FieldRow label="Label">
              <TextInput
                value={draft.label ?? ""}
                onChange={(e) => setDraft({ ...draft, label: e.target.value })}
                placeholder="Kendaraan"
              />
            </FieldRow>
            <FieldRow label="Icon" hint="React-icons name">
              <TextInput
                value={draft.icon ?? ""}
                onChange={(e) => setDraft({ ...draft, icon: e.target.value })}
                placeholder="FaCar"
              />
            </FieldRow>
            <FieldRow label="Sort Order">
              <TextInput
                type="number"
                value={draft.sort_order ?? 0}
                onChange={(e) => setDraft({ ...draft, sort_order: Number(e.target.value) })}
              />
            </FieldRow>
          </div>
          <div className="flex justify-end mt-4 pt-4 border-t border-white/5">
            <button
              onClick={save}
              className="inline-flex items-center gap-2 px-4 py-2 bg-beam-400 text-[color:var(--text-on-beam)] font-semibold rounded-lg hover:bg-beam-200 transition-colors text-sm"
            >
              <FaSave size={12} /> Simpan
            </button>
          </div>
        </AdminCard>
      )}

      <AdminCard className="overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-text-tertiary text-sm">Memuat…</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-text-tertiary text-sm">
            Belum ada stats.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-white/5 border-b border-white/5">
              <tr className="text-left text-text-tertiary text-xs uppercase tracking-wider">
                <th className="px-4 py-3 font-semibold">Slug</th>
                <th className="px-4 py-3 font-semibold">Value</th>
                <th className="px-4 py-3 font-semibold">Label</th>
                <th className="px-4 py-3 font-semibold">Order</th>
                <th className="px-4 py-3 font-semibold w-24"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3 font-mono text-xs text-text-secondary">{item.slug}</td>
                  <td className="px-4 py-3 font-display text-2xl font-black tabular gradient-text">
                    {item.value}
                  </td>
                  <td className="px-4 py-3 text-white">{item.label}</td>
                  <td className="px-4 py-3 text-text-tertiary tabular">{item.sort_order}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setDraft(item)}
                        className="p-1.5 text-text-secondary hover:text-beam-400"
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                        onClick={() => remove(item.id)}
                        className="p-1.5 text-text-secondary hover:text-danger"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </AdminCard>
    </div>
  );
}
