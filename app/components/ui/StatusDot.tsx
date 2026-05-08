type StatusDotProps = {
  open: boolean;
  size?: "sm" | "md";
};

export function StatusDot({ open, size = "sm" }: StatusDotProps) {
  const dim = size === "md" ? "w-2.5 h-2.5" : "w-2 h-2";
  return (
    <span className="relative inline-flex items-center justify-center" aria-hidden>
      <span
        className={`${dim} rounded-full ${open ? "bg-success" : "bg-text-tertiary"} ${open ? "animate-pulse" : ""}`}
      />
      {open && (
        <span
          className={`absolute ${dim} rounded-full bg-success/40 animate-ping`}
        />
      )}
    </span>
  );
}
