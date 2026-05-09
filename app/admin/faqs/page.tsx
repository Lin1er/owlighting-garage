"use client";

import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured, type Faq } from "@/lib/supabase";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import {
  AdminPageHeader,
  AdminCard,
  NotConfiguredBanner,
} from "../_components/AdminShell";
import { FieldRow, TextArea, TextInput } from "../_components/AdminInputs";
import { useToast } from "@/app/components/ui/Toast";

type Draft = Partial<Faq>;

const blankDraft: Draft = {
  icon: "FaQuestion",
  question: "",
  answer: "",
  sort_order: 0,
  published: true,
};

export default function FaqsAdminPage() {
  const [items, setItems] = useState<Faq[]>([]);
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
      .from("faqs")
      .select("*")
      .order("sort_order", { ascending: true });
    if (!error) setItems((data as Faq[]) ?? []);
    setLoading(false);
  };

  const save = async () => {
    if (!draft || !supabase) return;
    if (!draft.question?.trim() || !draft.answer?.trim()) {
      return toast.push("Question dan Answer wajib", "error");
    }
    const payload = {
      icon: draft.icon ?? null,
      question: draft.question,
      answer: draft.answer,
      sort_order: draft.sort_order ?? 0,
      published: draft.published ?? true,
    };
    const op = draft.id
      ? supabase.from("faqs").update(payload).eq("id", draft.id)
      : supabase.from("faqs").insert([payload]);
    const { error } = await op;
    if (error) return toast.push(`Gagal: ${error.message}`, "error");
    toast.push("Tersimpan", "success");
    setDraft(null);
    void load();
  };

  const remove = async (id: number) => {
    if (!supabase) return;
    if (!confirm("Hapus FAQ ini?")) return;
    const { error } = await supabase.from("faqs").delete().eq("id", id);
    if (error) return toast.push(`Gagal: ${error.message}`, "error");
    toast.push("Dihapus", "success");
    void load();
  };

  return (
    <div>
      <AdminPageHeader
        title="FAQ"
        description="Pertanyaan & jawaban yang ditampilkan di halaman /services. Pakai **bold** untuk emphasis."
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
              {draft.id ? "Edit FAQ" : "FAQ Baru"}
            </h2>
            <button onClick={() => setDraft(null)} className="text-text-tertiary hover:text-white">
              <FaTimes size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldRow label="Question" className="md:col-span-2">
              <TextInput
                value={draft.question ?? ""}
                onChange={(e) => setDraft({ ...draft, question: e.target.value })}
                placeholder="Apakah Custom BILED Aman?"
              />
            </FieldRow>
            <FieldRow
              label="Answer"
              hint="Markdown-lite: bungkus **kata** untuk bold."
              className="md:col-span-2"
            >
              <TextArea
                rows={5}
                value={draft.answer ?? ""}
                onChange={(e) => setDraft({ ...draft, answer: e.target.value })}
                placeholder="Sangat aman jika instalasi dilakukan dengan benar… **5+ tahun, 0 kasus terbakar.**"
              />
            </FieldRow>
            <FieldRow label="Icon" hint="React-icons name">
              <TextInput
                value={draft.icon ?? ""}
                onChange={(e) => setDraft({ ...draft, icon: e.target.value })}
                placeholder="FaFire"
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
          <div className="p-8 text-center text-text-tertiary text-sm">Belum ada FAQ.</div>
        ) : (
          <div className="divide-y divide-white/5">
            {items.map((item) => (
              <div key={item.id} className="p-5 flex items-start gap-4">
                <span className="font-mono-tech text-xs tabular text-text-tertiary mt-1 shrink-0 w-8">
                  {String(item.sort_order).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm mb-1.5">{item.question}</p>
                  <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                    {item.answer}
                  </p>
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
