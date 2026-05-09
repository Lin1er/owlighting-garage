"use client";

import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured, type CompanyParagraph } from "@/lib/supabase";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import {
  AdminPageHeader,
  AdminCard,
  NotConfiguredBanner,
} from "../_components/AdminShell";
import { FieldRow, TextArea, TextInput } from "../_components/AdminInputs";
import { useToast } from "@/app/components/ui/Toast";

type Draft = Partial<CompanyParagraph>;

const blankDraft: Draft = { body: "", sort_order: 0 };

export default function ParagraphsAdminPage() {
  const [items, setItems] = useState<CompanyParagraph[]>([]);
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
      .from("company_paragraphs")
      .select("*")
      .order("sort_order", { ascending: true });
    if (!error) setItems((data as CompanyParagraph[]) ?? []);
    setLoading(false);
  };

  const save = async () => {
    if (!draft || !supabase) return;
    if (!draft.body?.trim()) {
      toast.push("Isi paragraf wajib", "error");
      return;
    }
    const payload = { body: draft.body, sort_order: draft.sort_order ?? 0 };
    const op = draft.id
      ? supabase.from("company_paragraphs").update(payload).eq("id", draft.id)
      : supabase.from("company_paragraphs").insert([payload]);
    const { error } = await op;
    if (error) return toast.push(`Gagal: ${error.message}`, "error");
    toast.push("Tersimpan", "success");
    setDraft(null);
    void load();
  };

  const remove = async (id: number) => {
    if (!supabase) return;
    if (!confirm("Hapus paragraf ini?")) return;
    const { error } = await supabase.from("company_paragraphs").delete().eq("id", id);
    if (error) return toast.push(`Gagal: ${error.message}`, "error");
    toast.push("Dihapus", "success");
    void load();
  };

  return (
    <div>
      <AdminPageHeader
        title="Cerita Owlighting"
        description="Paragraf yang ditampilkan di section Cerita Kami pada halaman /about."
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
              {draft.id ? "Edit Paragraf" : "Paragraf Baru"}
            </h2>
            <button onClick={() => setDraft(null)} className="text-text-tertiary hover:text-white">
              <FaTimes size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <FieldRow label="Body">
              <TextArea
                rows={5}
                value={draft.body ?? ""}
                onChange={(e) => setDraft({ ...draft, body: e.target.value })}
                placeholder="Owlighting dimulai dari passion terhadap otomotif…"
              />
            </FieldRow>
            <FieldRow label="Sort Order" hint="Urutan tampil di halaman About">
              <TextInput
                type="number"
                value={draft.sort_order ?? 0}
                onChange={(e) =>
                  setDraft({ ...draft, sort_order: Number(e.target.value) })
                }
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
            Belum ada paragraf cerita.
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {items.map((item) => (
              <div key={item.id} className="p-5 flex items-start gap-4">
                <span className="font-mono-tech text-xs tabular text-text-tertiary mt-1 shrink-0 w-8">
                  {String(item.sort_order).padStart(2, "0")}
                </span>
                <p className="flex-1 text-sm text-text-secondary leading-relaxed">
                  {item.body}
                </p>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => setDraft(item)} className="p-1.5 text-text-secondary hover:text-beam-400">
                    <FaEdit size={14} />
                  </button>
                  <button onClick={() => remove(item.id)} className="p-1.5 text-text-secondary hover:text-danger">
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminCard>
    </div>
  );
}
