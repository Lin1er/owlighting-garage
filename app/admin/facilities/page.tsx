"use client";

import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured, type Facility } from "@/lib/supabase";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import {
  AdminPageHeader,
  AdminCard,
  NotConfiguredBanner,
} from "../_components/AdminShell";
import { FieldRow, Select, TextArea, TextInput } from "../_components/AdminInputs";
import { useToast } from "@/app/components/ui/Toast";

type Draft = Partial<Facility>;

const blankDraft: Draft = {
  title: "",
  description: "",
  image_url: "",
  tone: "beam",
  sort_order: 0,
  published: true,
};

export default function FacilitiesAdminPage() {
  const [items, setItems] = useState<Facility[]>([]);
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
      .from("facilities")
      .select("*")
      .order("sort_order", { ascending: true });
    if (!error) setItems((data as Facility[]) ?? []);
    setLoading(false);
  };

  const save = async () => {
    if (!draft || !supabase) return;
    if (!draft.title?.trim()) return toast.push("Title wajib", "error");
    const payload = {
      title: draft.title,
      description: draft.description ?? null,
      image_url: draft.image_url || null,
      tone: draft.tone ?? "beam",
      sort_order: draft.sort_order ?? 0,
      published: draft.published ?? true,
    };
    const op = draft.id
      ? supabase.from("facilities").update(payload).eq("id", draft.id)
      : supabase.from("facilities").insert([payload]);
    const { error } = await op;
    if (error) return toast.push(`Gagal: ${error.message}`, "error");
    toast.push("Tersimpan", "success");
    setDraft(null);
    void load();
  };

  const remove = async (id: number) => {
    if (!supabase) return;
    if (!confirm("Hapus fasilitas ini?")) return;
    const { error } = await supabase.from("facilities").delete().eq("id", id);
    if (error) return toast.push(`Gagal: ${error.message}`, "error");
    toast.push("Dihapus", "success");
    void load();
  };

  return (
    <div>
      <AdminPageHeader
        title="Fasilitas Workshop"
        description="Cards fasilitas yang ditampilkan di section Fasilitas pada /about."
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
              {draft.id ? "Edit Fasilitas" : "Fasilitas Baru"}
            </h2>
            <button onClick={() => setDraft(null)} className="text-text-tertiary hover:text-white">
              <FaTimes size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldRow label="Title">
              <TextInput
                value={draft.title ?? ""}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                placeholder="CNC Laser Precision"
              />
            </FieldRow>
            <FieldRow label="Tone" hint="Beam = cyan, Halo = amber">
              <Select
                value={draft.tone ?? "beam"}
                onChange={(e) => setDraft({ ...draft, tone: e.target.value })}
              >
                <option value="beam" className="bg-bg-card">Beam (cyan)</option>
                <option value="halo" className="bg-bg-card">Halo (amber)</option>
              </Select>
            </FieldRow>
            <FieldRow label="Description" className="md:col-span-2">
              <TextArea
                rows={3}
                value={draft.description ?? ""}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              />
            </FieldRow>
            <FieldRow label="Image URL" className="md:col-span-2">
              <TextInput
                value={draft.image_url ?? ""}
                onChange={(e) => setDraft({ ...draft, image_url: e.target.value })}
                placeholder="https://..."
              />
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
          <div className="p-8 text-center text-text-tertiary text-sm">Belum ada fasilitas.</div>
        ) : (
          <div className="divide-y divide-white/5">
            {items.map((item) => (
              <div key={item.id} className="p-4 flex items-start gap-4">
                {item.image_url && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-16 h-16 rounded object-cover shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-white text-sm">{item.title}</p>
                    <span
                      className={`text-[10px] uppercase tracking-widest font-bold px-1.5 py-0.5 rounded ${
                        item.tone === "halo"
                          ? "bg-halo-500/15 text-halo-300"
                          : "bg-beam-400/15 text-beam-400"
                      }`}
                    >
                      {item.tone}
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span
                    className={`text-[10px] uppercase tracking-widest font-bold ${
                      item.published ? "text-success" : "text-text-tertiary"
                    }`}
                  >
                    {item.published ? "Published" : "Draft"}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => setDraft(item)} className="p-1.5 text-text-secondary hover:text-beam-400">
                      <FaEdit size={14} />
                    </button>
                    <button onClick={() => remove(item.id)} className="p-1.5 text-text-secondary hover:text-danger">
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
