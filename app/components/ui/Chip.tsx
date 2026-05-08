import { ReactNode } from "react";

export type ChipTone = "beam" | "halo" | "neutral" | "success" | "danger";

export type ChipProps = {
  children: ReactNode;
  tone?: ChipTone;
  size?: "xs" | "sm";
  className?: string;
  icon?: ReactNode;
};

const toneClass: Record<ChipTone, string> = {
  beam:    "bg-beam-400/10 text-beam-400 border-beam-400/30",
  halo:    "bg-halo-500/10 text-halo-300 border-halo-500/30",
  neutral: "bg-white/5 text-text-secondary border-white/10",
  success: "bg-success/10 text-success border-success/30",
  danger:  "bg-danger/10 text-danger border-danger/30",
};

const sizeClass = {
  xs: "px-2 py-0.5 text-[10px]",
  sm: "px-2.5 py-1 text-xs",
};

export function Chip({ children, tone = "neutral", size = "sm", className = "", icon }: ChipProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold tracking-wide uppercase backdrop-blur-sm ${toneClass[tone]} ${sizeClass[size]} ${className}`}
    >
      {icon}
      {children}
    </span>
  );
}
