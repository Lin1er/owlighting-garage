"use client";

import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured, type GalleryImage } from "@/lib/supabase";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import {
  AdminPageHeader,
  AdminCard,
  NotConfiguredBanner,
} from "../_components/AdminShell";
import { FieldRow, TextInput, TextArea, Select } from "../_components/AdminInputs";
import { useToast } from "@/app/components/ui/Toast";

const CATEGORIES = ["mobil", "motor", "custom"] as const;

type Draft = Partial<GalleryImage>;

const blankDraft: Draft = {
  title: "",
  category: "mobil",
  before_image_url: "",
  after_image_url: "",
  slider_color: "#00C2FF",
  service_tag: "",
  vehicle: "",
  description: "",
  published: true,
  sort_order: 0,
};

export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryImage[]>([]);
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
      .from("gallery_images")
      .select("*")
      .order("sort_order", { ascending: true });
    if (!error) setItems((data as GalleryImage[]) ?? []);
    setLoading(false);
  };

  const save = async () => {
    if (!draft || !supabase) return;
    if (!draft.title?.trim() || !draft.before_image_url?.trim() || !draft.after_image_url?.trim()) {
      toast.push("Title dan kedua URL gambar wajib", "error");
      return;
    }
    const payload = {
      slug: draft.slug ?? null,
      title: draft.title,
      category: draft.category ?? "mobil",
      before_image_url: draft.before_image_url,
      after_image_url: draft.after_image_url,
      slider_color: draft.slider_color ?? "#00C2FF",
      service_tag: draft.service_tag || null,
      vehicle: draft.vehicle || null,
      lux_before: draft.lux_before ?? null,
      lux_after: draft.lux_after ?? null,
      duration_days: draft.duration_days ?? null,
      description: draft.description || null,
      published: draft.published ?? true,
      sort_order: draft.sort_order ?? 0,
    };
    const op = draft.id
      ? supabase.from("gallery_images").update(payload).eq("id", draft.id)
      : supabase.from("gallery_images").insert([payload]);
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
    if (!confirm("Hapus gallery item?")) return;
    const { error } = await supabase.from("gallery_images").delete().eq("id", id);
    if (error) toast.push(`Gagal: ${error.message}`, "error");
    else {
      toast.push("Dihapus", "success");
      void load();
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Before / After Gallery"
        description="Slider perbandingan halogen vs BILED yang ditampilkan di section Before/After."
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
              {draft.id ? "Edit Slider" : "Slider Baru"}
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
                placeholder="BILED Toyota Avanza"
              />
            </FieldRow>
            <FieldRow label="Category">
              <Select
                value={draft.category ?? "mobil"}
                onChange={(e) => setDraft({ ...draft, category: e.target.value })}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-bg-card">
                    {c}
                  </option>
                ))}
              </Select>
            </FieldRow>
            <FieldRow label="Before Image URL">
              <TextInput
                value={draft.before_image_url ?? ""}
                onChange={(e) =>
                  setDraft({ ...draft, before_image_url: e.target.value })
                }
                placeholder="https://..."
              />
            </FieldRow>
            <FieldRow label="After Image URL">
              <TextInput
                value={draft.after_image_url ?? ""}
                onChange={(e) =>
                  setDraft({ ...draft, after_image_url: e.target.value })
                }
                placeholder="https://..."
              />
            </FieldRow>
            <FieldRow label="Slider Color" hint="Warna handle slider">
              <TextInput
                value={draft.slider_color ?? "#00C2FF"}
                onChange={(e) => setDraft({ ...draft, slider_color: e.target.value })}
                placeholder="#00C2FF"
              />
            </FieldRow>
            <FieldRow label="Vehicle">
              <TextInput
                value={draft.vehicle ?? ""}
                onChange={(e) => setDraft({ ...draft, vehicle: e.target.value })}
                placeholder="Toyota Avanza 2018"
              />
            </FieldRow>
            <FieldRow label="Service Tag">
              <TextInput
                value={draft.service_tag ?? ""}
                onChange={(e) => setDraft({ ...draft, service_tag: e.target.value })}
                placeholder="BILED Retrofit"
              />
            </FieldRow>
            <FieldRow label="Duration (days)">
              <TextInput
                type="number"
                value={draft.duration_days ?? ""}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    duration_days: e.target.value ? Number(e.target.value) : null,
                  })
                }
              />
            </FieldRow>
            <FieldRow label="Lux Before">
              <TextInput
                type="number"
                value={draft.lux_before ?? ""}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    lux_before: e.target.value ? Number(e.target.value) : null,
                  })
                }
              />
            </FieldRow>
            <FieldRow label="Lux After">
              <TextInput
                type="number"
                value={draft.lux_after ?? ""}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    lux_after: e.target.value ? Number(e.target.value) : null,
                  })
                }
              />
            </FieldRow>
            <FieldRow label="Description" className="md:col-span-2">
              <TextArea
                value={draft.description ?? ""}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
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
          <div className="p-8 text-center text-text-tertiary text-sm">
            Belum ada slider gallery.
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {items.map((item) => (
              <div key={item.id} className="p-4 flex items-start gap-4 hover:bg-white/[0.02]">
                <div className="grid grid-cols-2 gap-1 w-32 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.before_image_url}
                    alt="before"
                    className="aspect-square object-cover rounded"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.after_image_url}
                    alt="after"
                    className="aspect-square object-cover rounded"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white">{item.title}</div>
                  <div className="text-xs text-beam-400 mt-0.5">
                    {item.category}
                    {item.vehicle ? ` · ${item.vehicle}` : ""}
                  </div>
                  {(item.lux_before || item.lux_after) && (
                    <div className="text-xs text-text-tertiary mt-1 tabular">
                      {item.lux_before ?? "—"} lx → {item.lux_after ?? "—"} lx
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1 items-end">
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
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminCard>
    </div>
  );
}
