"use client";

import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured, type SiteSetting } from "@/lib/supabase";
import { FaSave } from "react-icons/fa";
import {
  AdminPageHeader,
  AdminCard,
  NotConfiguredBanner,
} from "../_components/AdminShell";
import { FieldRow, TextInput } from "../_components/AdminInputs";
import { useToast } from "@/app/components/ui/Toast";

export default function SettingsAdminPage() {
  const [items, setItems] = useState<SiteSetting[]>([]);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    void load();
  }, []);

  const load = async () => {
    if (!supabase) return setLoading(false);
    setLoading(true);
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .order("key", { ascending: true });
    if (!error) {
      const settings = (data as SiteSetting[]) ?? [];
      setItems(settings);
      setDrafts(
        settings.reduce<Record<string, string>>((acc, s) => {
          acc[s.key] = s.value ?? "";
          return acc;
        }, {}),
      );
    }
    setLoading(false);
  };

  const save = async (key: string) => {
    if (!supabase) return;
    setSavingKey(key);
    const { error } = await supabase
      .from("site_settings")
      .upsert({ key, value: drafts[key] }, { onConflict: "key" });
    setSavingKey(null);
    if (error) toast.push(`Gagal: ${error.message}`, "error");
    else {
      toast.push(`Setting "${key}" disimpan`, "success");
      void load();
    }
  };

  const isDirty = (s: SiteSetting) => (drafts[s.key] ?? "") !== (s.value ?? "");

  return (
    <div>
      <AdminPageHeader
        title="Site Settings"
        description="Pengaturan global website yang bisa diubah tanpa redeploy."
      />

      {!isSupabaseConfigured && <NotConfiguredBanner />}

      <div className="space-y-3">
        {loading ? (
          <AdminCard className="p-8 text-center text-text-tertiary text-sm">
            Memuat…
          </AdminCard>
        ) : items.length === 0 ? (
          <AdminCard className="p-8 text-center text-text-tertiary text-sm">
            Belum ada settings. Migration default akan menambah beberapa key.
          </AdminCard>
        ) : (
          items.map((s) => (
            <AdminCard key={s.key} className="p-5">
              <FieldRow
                label={s.key}
                hint={s.description ?? undefined}
              >
                <div className="flex gap-2">
                  <TextInput
                    value={drafts[s.key] ?? ""}
                    onChange={(e) =>
                      setDrafts((prev) => ({ ...prev, [s.key]: e.target.value }))
                    }
                  />
                  <button
                    onClick={() => save(s.key)}
                    disabled={!isDirty(s) || savingKey === s.key}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-beam-400 text-[color:var(--text-on-beam)] font-semibold rounded-lg hover:bg-beam-200 transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                  >
                    <FaSave size={12} />
                    {savingKey === s.key ? "Menyimpan..." : "Simpan"}
                  </button>
                </div>
              </FieldRow>
              <p className="text-[11px] text-text-tertiary mt-2">
                Terakhir diubah: {new Date(s.updated_at).toLocaleString("id-ID")}
              </p>
            </AdminCard>
          ))
        )}
      </div>
    </div>
  );
}
