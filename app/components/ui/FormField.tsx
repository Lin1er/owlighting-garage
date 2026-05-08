"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

export type FormFieldProps = {
  label: string;
  htmlFor?: string;
  /** Optional helper text shown below the input. */
  hint?: string;
  /** Validation error — overrides hint and adds danger styling. */
  error?: string;
  /** Mark required fields visually. */
  required?: boolean;
  children: ReactNode;
  className?: string;
};

const inputBaseClass =
  "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none transition-all duration-[var(--dur-default)] text-white placeholder-text-tertiary focus:border-beam-400 focus:bg-white/8 disabled:opacity-50";

export const fieldClasses = {
  input: inputBaseClass,
  inputError: `${inputBaseClass} border-danger/60 focus:border-danger`,
};

/**
 * Form field wrapper with label, hint, and animated error message.
 *
 * The bare reservation form today has no validation feedback — submit either
 * works or silently misroutes. Wrapping inputs with this component gives every
 * form a consistent error-presentation behavior without per-form code.
 */
export function FormField({
  label,
  htmlFor,
  hint,
  error,
  required,
  children,
  className = "",
}: FormFieldProps) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-semibold mb-2 text-white/80"
      >
        {label}
        {required && <span className="text-danger ml-1">*</span>}
      </label>
      {children}
      <AnimatePresence mode="wait">
        {error ? (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.18 }}
            className="text-xs text-danger mt-1.5"
          >
            {error}
          </motion.p>
        ) : hint ? (
          <p className="text-xs text-text-tertiary mt-1.5">{hint}</p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
