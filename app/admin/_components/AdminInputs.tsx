"use client";

import { ReactNode, TextareaHTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes } from "react";

const baseInput =
  "w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-text-tertiary focus:border-beam-400 focus:bg-white/10 outline-none transition-colors disabled:opacity-50";

export function FieldRow({
  label,
  hint,
  children,
  className = "",
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-xs font-semibold text-white/80">{label}</span>
      {children}
      {hint && <span className="text-[11px] text-text-tertiary">{hint}</span>}
    </label>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${baseInput} ${props.className ?? ""}`} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`${baseInput} ${props.className ?? ""} min-h-[80px] resize-vertical`}
    />
  );
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={`${baseInput} ${props.className ?? ""}`}>
      {props.children}
    </select>
  );
}
