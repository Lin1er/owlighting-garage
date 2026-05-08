"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from "react-icons/fa";

type ToastTone = "success" | "error" | "info";

type Toast = {
  id: number;
  message: string;
  tone: ToastTone;
};

type ToastContextValue = {
  push: (message: string, tone?: ToastTone) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const TONE_ICON: Record<ToastTone, React.ComponentType<{ size?: number; className?: string }>> = {
  success: FaCheckCircle,
  error: FaExclamationTriangle,
  info: FaInfoCircle,
};

const TONE_CLASS: Record<ToastTone, string> = {
  success: "border-success/40 text-success",
  error: "border-danger/40 text-danger",
  info: "border-beam-400/40 text-beam-400",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((message: string, tone: ToastTone = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, tone }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div
        className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-[calc(100vw-2rem)] sm:max-w-sm pointer-events-none"
        aria-live="polite"
      >
        <AnimatePresence>
          {toasts.map((t) => {
            const Icon = TONE_ICON[t.tone];
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: -16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 30, scale: 0.96 }}
                transition={{ duration: 0.24, ease: [0.32, 0.72, 0, 1] }}
                className={`pointer-events-auto glass-strong rounded-xl border ${TONE_CLASS[t.tone]} px-4 py-3 flex items-start gap-3 shadow-lg shadow-black/30`}
              >
                <Icon size={18} className="mt-0.5 shrink-0" />
                <p className="flex-1 text-sm text-white leading-snug">{t.message}</p>
                <button
                  onClick={() => dismiss(t.id)}
                  className="text-text-tertiary hover:text-white transition-colors mt-0.5"
                  aria-label="Dismiss"
                >
                  <FaTimes size={12} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}
