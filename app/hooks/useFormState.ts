"use client";

import { useCallback, useState } from "react";

export type FormStatus = "idle" | "loading" | "success" | "error";

export type FormState<T> = {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  status: FormStatus;
  message?: string;
  setField: <K extends keyof T>(key: K, value: T[K]) => void;
  setErrors: (errors: Partial<Record<keyof T, string>>) => void;
  setStatus: (status: FormStatus, message?: string) => void;
  reset: () => void;
};

/**
 * Lightweight form state machine for client forms.
 *
 * Keeps validation errors, submit status (idle → loading → success/error)
 * and an optional UI message in one place — replaces the bare `useState`
 * pattern that today scatters validation across handler closures.
 */
export function useFormState<T extends Record<string, unknown>>(
  initial: T,
): FormState<T> {
  const [values, setValues] = useState<T>(initial);
  const [errors, setErrorsState] = useState<Partial<Record<keyof T, string>>>({});
  const [status, setStatusState] = useState<FormStatus>("idle");
  const [message, setMessage] = useState<string | undefined>();

  const setField = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrorsState((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const setErrors = useCallback((next: Partial<Record<keyof T, string>>) => {
    setErrorsState(next);
  }, []);

  const setStatus = useCallback((next: FormStatus, msg?: string) => {
    setStatusState(next);
    setMessage(msg);
  }, []);

  const reset = useCallback(() => {
    setValues(initial);
    setErrorsState({});
    setStatusState("idle");
    setMessage(undefined);
  }, [initial]);

  return { values, errors, status, message, setField, setErrors, setStatus, reset };
}
