"use client";

import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured, type Testimonial } from "@/lib/supabase";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaStar } from "react-icons/fa";
import {
  AdminPageHeader,
  AdminCard,
  NotConfiguredBanner,
} from "../_components/AdminShell";
import { FieldRow, TextInput, TextArea, Select } from "../_components/AdminInputs";
import { useToast } from "@/app/components/ui/Toast";

type Draft = Partial<Testimonial>;

const blankDraft: Draft = {
  name: "",
  rating: 5,
  comment: "",
  vehicle: "",
  service_tag: "",
  instagram_handle: "",
  featured: false,
  published: true,
  sort_order: 0,
};

export default function TestimonialsAdminPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
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
      .from("testimonials")
      .select("*")
      .order("featured", { ascending: false })
      .order("sort_order", { ascending: true });
    if (!error) setItems((data as Testimonial[]) ?? []);
    setLoading(false);
  };

  const save = async () => {
    if (!draft || !supabase) return;
    if (!draft.name?.trim() || !draft.comment?.trim()) {
      toast.push("Nama dan Comment wajib diisi", "error");
      return;
    }
    const payload = {
      name: draft.name,
      rating: draft.rating ?? 5,
      comment: draft.comment,
      vehicle: draft.vehicle ?? null,
      service_tag: draft.service_tag ?? null,
      instagram_handle: draft.instagram_handle ?? null,
      featured: draft.featured ?? false,
      published: draft.published ?? true,
      sort_order: draft.sort_order ?? 0,
    };
    const op = draft.id
      ? supabase.from("testimonials").update(payload).eq("id", draft.id)
      : supabase.from("testimonials").insert([payload]);
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
    if (!confirm("Hapus testimoni ini?")) return;
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) toast.push(`Gagal: ${error.message}`, "error");
    else {
      toast.push("Dihapus", "success");
      void load();
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Testimonials"
        description="Komentar pelanggan yang ditampilkan di carousel testimoni."
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
              {draft.id ? "Edit Testimoni" : "Testimoni Baru"}
            </h2>
            <button onClick={() => setDraft(null)} className="text-text-tertiary hover:text-white">
              <FaTimes size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldRow label="Nama">
              <TextInput
                value={draft.name ?? ""}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                placeholder="Budi S."
              />
            </FieldRow>
            <FieldRow label="Vehicle">
              <TextInput
                value={draft.vehicle ?? ""}
                onChange={(e) => setDraft({ ...draft, vehicle: e.target.value })}
                placeholder="Toyota Alphard"
              />
            </FieldRow>
            <FieldRow label="Service Tag" hint="Layanan yang dipakai (opsional)">
              <TextInput
                value={draft.service_tag ?? ""}
                onChange={(e) => setDraft({ ...draft, service_tag: e.target.value })}
                placeholder="BILED Retrofit"
              />
            </FieldRow>
            <FieldRow label="Instagram Handle" hint="Tanpa @">
              <TextInput
                value={draft.instagram_handle ?? ""}
                onChange={(e) =>
                  setDraft({ ...draft, instagram_handle: e.target.value })
                }
                placeholder="budi_otomotif"
              />
            </FieldRow>
            <FieldRow label="Comment" className="md:col-span-2">
              <TextArea
                value={draft.comment ?? ""}
                onChange={(e) => setDraft({ ...draft, comment: e.target.value })}
                placeholder="Hasil retrofit BILED-nya sempurna…"
              />
            </FieldRow>
            <FieldRow label="Rating">
              <Select
                value={draft.rating ?? 5}
                onChange={(e) => setDraft({ ...draft, rating: Number(e.target.value) })}
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r} className="bg-bg-card">
                    {r} bintang
                  </option>
                ))}
              </Select>
            </FieldRow>
            <FieldRow label="Sort Order">
              <TextInput
                type="number"
                value={draft.sort_order ?? 0}
                onChange={(e) =>
                  setDraft({ ...draft, sort_order: Number(e.target.value) })
                }
              />
            </FieldRow>
          </div>
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5">
            <label className="inline-flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
              <input
                type="checkbox"
                checked={draft.published ?? true}
                onChange={(e) => setDraft({ ...draft, published: e.target.checked })}
                className="accent-beam-400"
              />
              Published
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
              <input
                type="checkbox"
                checked={draft.featured ?? false}
                onChange={(e) => setDraft({ ...draft, featured: e.target.checked })}
                className="accent-beam-400"
              />
              Featured
            </label>
            <button
              onClick={save}
              className="ml-auto inline-flex items-center gap-2 px-4 py-2 bg-beam-400 text-[color:var(--text-on-beam)] font-semibold rounded-lg hover:bg-beam-200 transition-colors text-sm"
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
            Belum ada testimoni. Tambahkan testimoni pertama Anda.
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {items.map((item) => (
              <div key={item.id} className="p-4 hover:bg-white/[0.02] transition-colors flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-white">{item.name}</span>
                    {item.vehicle && (
                      <span className="text-xs text-beam-400">{item.vehicle}</span>
                    )}
                    {item.featured && (
                      <span className="text-[10px] uppercase tracking-widest text-halo-300 bg-halo-500/10 px-1.5 py-0.5 rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex gap-0.5 mb-1.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <FaStar key={i} size={10} className="text-beam-400" />
                    ))}
                  </div>
                  <p className="text-sm text-text-secondary line-clamp-2">{item.comment}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span
                    className={`text-xs ${
                      item.published ? "text-success" : "text-text-tertiary"
                    }`}
                  >
                    {item.published ? "Published" : "Draft"}
                  </span>
                  <div className="flex gap-2 mt-1">
                    <button
                      onClick={() => setDraft(item)}
                      className="p-1.5 text-text-secondary hover:text-beam-400 transition-colors"
                    >
                      <FaEdit size={14} />
                    </button>
                    <button
                      onClick={() => remove(item.id)}
                      className="p-1.5 text-text-secondary hover:text-danger transition-colors"
                    >
                      <FaTrash size={14} />
                    </button>
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
