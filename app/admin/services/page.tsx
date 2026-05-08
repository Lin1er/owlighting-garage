"use client";

import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured, type Service } from "@/lib/supabase";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import {
  AdminPageHeader,
  AdminCard,
  NotConfiguredBanner,
} from "../_components/AdminShell";
import { FieldRow, TextInput, TextArea } from "../_components/AdminInputs";
import { useToast } from "@/app/components/ui/Toast";

type Draft = Partial<Service> & { featuresText?: string };

const blankDraft: Draft = {
  title: "",
  description: "",
  icon: "",
  features: [],
  is_active: true,
  sort_order: 0,
  price_from: "",
  price_note: "",
  duration: "",
  category: "",
  featuresText: "",
};

export default function ServicesAdminPage() {
  const [items, setItems] = useState<Service[]>([]);
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
      .from("services")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (!error) setItems((data as Service[]) ?? []);
    setLoading(false);
  };

  const startEdit = (s: Service) => {
    setDraft({
      ...s,
      featuresText: (s.features ?? []).join("\n"),
    });
  };

  const save = async () => {
    if (!draft || !supabase) return;
    if (!draft.title?.trim()) {
      toast.push("Title wajib diisi", "error");
      return;
    }
    const features = (draft.featuresText ?? "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const payload = {
      title: draft.title,
      description: draft.description ?? "",
      icon: draft.icon ?? null,
      features,
      is_active: draft.is_active ?? true,
      sort_order: draft.sort_order ?? 0,
      price_from: draft.price_from || null,
      price_note: draft.price_note || null,
      duration: draft.duration || null,
      category: draft.category || null,
      slug: draft.slug || null,
    };
    const op = draft.id
      ? supabase.from("services").update(payload).eq("id", draft.id)
      : supabase.from("services").insert([payload]);
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
    if (!confirm("Hapus layanan ini?")) return;
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) toast.push(`Gagal: ${error.message}`, "error");
    else {
      toast.push("Dihapus", "success");
      void load();
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Services"
        description="Daftar layanan yang ditampilkan di Services section dan halaman /services."
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
              {draft.id ? "Edit Layanan" : "Layanan Baru"}
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
                placeholder="BILED Retrofit"
              />
            </FieldRow>
            <FieldRow label="Slug" hint="URL-safe id">
              <TextInput
                value={draft.slug ?? ""}
                onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
                placeholder="biled-retrofit"
              />
            </FieldRow>
            <FieldRow label="Description" className="md:col-span-2">
              <TextArea
                value={draft.description ?? ""}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                placeholder="Fokus cahaya tajam dengan cut-off RHD rapi…"
              />
            </FieldRow>
            <FieldRow
              label="Features (satu per baris)"
              hint={`Saat ini ${(draft.featuresText ?? "").split("\n").filter(Boolean).length} fitur — frontend menampilkan max 4`}
              className="md:col-span-2"
            >
              <TextArea
                value={draft.featuresText ?? ""}
                onChange={(e) => setDraft({ ...draft, featuresText: e.target.value })}
                placeholder={"Cut-off RHD presisi\nBeam pattern tajam 6000K-8000K\nWiring rapih dengan relay proteksi"}
                rows={6}
              />
            </FieldRow>
            <FieldRow label="Icon" hint="React-icons name (FaCar, IoFlash, BiSolidBulb, dll)">
              <TextInput
                value={draft.icon ?? ""}
                onChange={(e) => setDraft({ ...draft, icon: e.target.value })}
                placeholder="BiSolidBulb"
              />
            </FieldRow>
            <FieldRow label="Category" hint="Otomotif, Custom, Signage">
              <TextInput
                value={draft.category ?? ""}
                onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                placeholder="Otomotif"
              />
            </FieldRow>
            <FieldRow label="Price From" hint='Contoh: "2.5jt"'>
              <TextInput
                value={draft.price_from ?? ""}
                onChange={(e) => setDraft({ ...draft, price_from: e.target.value })}
                placeholder="2.5jt"
              />
            </FieldRow>
            <FieldRow label="Price Note">
              <TextInput
                value={draft.price_note ?? ""}
                onChange={(e) => setDraft({ ...draft, price_note: e.target.value })}
                placeholder="Termasuk garansi 1 tahun"
              />
            </FieldRow>
            <FieldRow label="Duration">
              <TextInput
                value={draft.duration ?? ""}
                onChange={(e) => setDraft({ ...draft, duration: e.target.value })}
                placeholder="1 hari kerja"
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
                checked={draft.is_active ?? true}
                onChange={(e) => setDraft({ ...draft, is_active: e.target.checked })}
                className="accent-beam-400"
              />
              Aktif
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
            Belum ada layanan.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-white/5 border-b border-white/5">
              <tr className="text-left text-text-tertiary text-xs uppercase tracking-wider">
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Price From</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold w-24"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-white">{item.title}</div>
                    {item.description && (
                      <div className="text-xs text-text-tertiary line-clamp-1 mt-0.5">
                        {item.description}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-beam-400 font-semibold tabular">
                      {item.price_from ? `Rp ${item.price_from}` : "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs ${
                        item.is_active ? "text-success" : "text-text-tertiary"
                      }`}
                    >
                      {item.is_active ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(item)}
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
