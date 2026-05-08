"use client";

import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured, type PortfolioProject } from "@/lib/supabase";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import {
  AdminPageHeader,
  AdminCard,
  NotConfiguredBanner,
} from "../_components/AdminShell";
import { FieldRow, TextInput, TextArea, Select } from "../_components/AdminInputs";
import { useToast } from "@/app/components/ui/Toast";

const CATEGORIES = ["mobil", "motor", "custom"] as const;

type Draft = Partial<PortfolioProject>;

const blankDraft: Draft = {
  title: "",
  category: "mobil",
  description: "",
  image_url: "",
  sort_order: 0,
  featured: false,
  published: true,
};

export default function PortfolioAdminPage() {
  const [items, setItems] = useState<PortfolioProject[]>([]);
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
      .from("portfolio_projects")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (!error) setItems((data as PortfolioProject[]) ?? []);
    setLoading(false);
  };

  const save = async () => {
    if (!draft || !supabase) return;
    if (!draft.title?.trim() || !draft.category) {
      toast.push("Isi minimal Title dan Category", "error");
      return;
    }
    const payload = {
      title: draft.title,
      category: draft.category,
      description: draft.description ?? "",
      image_url: draft.image_url ?? null,
      slug: draft.slug ?? null,
      sort_order: draft.sort_order ?? 0,
      featured: draft.featured ?? false,
      published: draft.published ?? true,
      lux_before: draft.lux_before ?? null,
      lux_after: draft.lux_after ?? null,
      year: draft.year ?? null,
    };
    const op = draft.id
      ? supabase.from("portfolio_projects").update(payload).eq("id", draft.id)
      : supabase.from("portfolio_projects").insert([payload]);
    const { error } = await op;
    if (error) {
      toast.push(`Gagal menyimpan: ${error.message}`, "error");
      return;
    }
    toast.push("Tersimpan", "success");
    setDraft(null);
    void load();
  };

  const remove = async (id: number) => {
    if (!supabase) return;
    if (!confirm("Hapus project ini?")) return;
    const { error } = await supabase.from("portfolio_projects").delete().eq("id", id);
    if (error) toast.push(`Gagal: ${error.message}`, "error");
    else {
      toast.push("Dihapus", "success");
      void load();
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Portfolio"
        description="Project showcase di gallery section dan halaman /portfolio."
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

      {draft && <DraftEditor draft={draft} setDraft={setDraft} onSave={save} onCancel={() => setDraft(null)} />}

      <AdminCard className="overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-text-tertiary text-sm">Memuat…</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-text-tertiary text-sm">
            Belum ada project. Tambahkan project pertama Anda.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-white/5 border-b border-white/5">
              <tr className="text-left text-text-tertiary text-xs uppercase tracking-wider">
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Category</th>
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
                    <span className="px-2 py-0.5 bg-beam-400/10 text-beam-400 rounded text-xs uppercase">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs ${
                        item.published ? "text-success" : "text-text-tertiary"
                      }`}
                    >
                      {item.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setDraft(item)}
                        className="p-1.5 text-text-secondary hover:text-beam-400 transition-colors"
                        aria-label="Edit"
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                        onClick={() => remove(item.id)}
                        className="p-1.5 text-text-secondary hover:text-danger transition-colors"
                        aria-label="Delete"
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

function DraftEditor({
  draft,
  setDraft,
  onSave,
  onCancel,
}: {
  draft: Draft;
  setDraft: (d: Draft) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <AdminCard className="p-5 mb-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-white">
          {draft.id ? "Edit Project" : "Project Baru"}
        </h2>
        <button onClick={onCancel} className="text-text-tertiary hover:text-white">
          <FaTimes size={14} />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FieldRow label="Title">
          <TextInput
            value={draft.title ?? ""}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            placeholder="Toyota Alphard - Full LED Retrofit"
          />
        </FieldRow>
        <FieldRow label="Category">
          <Select
            value={draft.category ?? "mobil"}
            onChange={(e) => setDraft({ ...draft, category: e.target.value })}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c} className="bg-bg-card">{c}</option>
            ))}
          </Select>
        </FieldRow>
        <FieldRow label="Slug" hint="URL-safe identifier (opsional)" className="md:col-span-2">
          <TextInput
            value={draft.slug ?? ""}
            onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
            placeholder="alphard-full-led"
          />
        </FieldRow>
        <FieldRow label="Image URL" className="md:col-span-2">
          <TextInput
            value={draft.image_url ?? ""}
            onChange={(e) => setDraft({ ...draft, image_url: e.target.value })}
            placeholder="https://..."
          />
        </FieldRow>
        <FieldRow label="Description" className="md:col-span-2">
          <TextArea
            value={draft.description ?? ""}
            onChange={(e) => setDraft({ ...draft, description: e.target.value })}
            placeholder="BILED Projector + DRL Sequential"
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
        <FieldRow label="Year">
          <TextInput
            type="number"
            value={draft.year ?? ""}
            onChange={(e) =>
              setDraft({ ...draft, year: e.target.value ? Number(e.target.value) : null })
            }
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
          onClick={onSave}
          className="ml-auto inline-flex items-center gap-2 px-4 py-2 bg-beam-400 text-[color:var(--text-on-beam)] font-semibold rounded-lg hover:bg-beam-200 transition-colors text-sm"
        >
          <FaSave size={12} /> Simpan
        </button>
      </div>
    </AdminCard>
  );
}
