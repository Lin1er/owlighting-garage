export type PriceTagProps = {
  /** Lower bound of the price range, e.g. "2.5jt". `null` means "by inquiry". */
  from?: string | null;
  /** Optional secondary line (e.g. "termasuk garansi 1 tahun"). */
  note?: string;
  /** Override the prefix word ("dari" by default). */
  prefix?: string;
  /** Compact tag for use inside dense cards. */
  size?: "sm" | "md";
};

/**
 * Anchor harga visual untuk service / portfolio card.
 *
 * Audiens otomotif Indonesia familiar dengan pola "Mulai dari Rp 2.5jt"
 * sebagai signal "ini affordable, mari klik untuk detail". Tanpa anchor,
 * setiap user harus tanya WhatsApp untuk tahu — friction tinggi.
 */
export function PriceTag({ from, note, prefix = "Mulai dari", size = "md" }: PriceTagProps) {
  const isInquiry = from === null || from === undefined || from.trim() === "";
  const big = size === "md";

  if (isInquiry) {
    return (
      <div className="inline-flex flex-col">
        <span className="text-[10px] uppercase tracking-widest text-text-tertiary">Estimasi</span>
        <span className={`font-display font-bold text-white ${big ? "text-lg" : "text-base"}`}>
          Konsultasi WA
        </span>
      </div>
    );
  }

  return (
    <div className="inline-flex flex-col">
      <span className="text-[10px] uppercase tracking-widest text-text-tertiary">{prefix}</span>
      <span className={`font-display font-bold gradient-text tabular ${big ? "text-2xl" : "text-lg"}`}>
        Rp {from}
      </span>
      {note && (
        <span className="text-[11px] text-text-tertiary mt-0.5">{note}</span>
      )}
    </div>
  );
}
