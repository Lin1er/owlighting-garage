"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import { forwardRef, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "halo";
export type ButtonSize = "sm" | "md" | "lg";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
  className?: string;
  children: ReactNode;
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-lg gap-1.5",
  md: "px-5 py-2.5 text-sm rounded-xl gap-2",
  lg: "px-8 py-4 text-base rounded-xl gap-2",
};

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-[color:var(--text-on-beam)] font-bold glow-primary hover:glow-primary-strong",
  secondary:
    "border-2 border-beam-400/30 text-white font-semibold hover:bg-beam-400/10 hover:border-beam-400",
  ghost:
    "text-text-secondary hover:text-white font-medium hover:bg-white/5",
  halo:
    "bg-gradient-to-r from-halo-500 to-halo-300 text-[#1a1200] font-bold glow-accent hover:glow-accent-strong",
};

const baseClass =
  "inline-flex items-center justify-center transition-all duration-[var(--dur-default)] ease-[var(--ease-out-expo)] disabled:opacity-50 disabled:cursor-not-allowed select-none";

function classes(p: CommonProps): string {
  return [
    baseClass,
    sizeClass[p.size ?? "md"],
    variantClass[p.variant ?? "primary"],
    p.fullWidth ? "w-full" : "",
    p.className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

function Spinner() {
  return (
    <span className="inline-block w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
  );
}

type ButtonAsButton = CommonProps &
  Omit<HTMLMotionProps<"button">, "children" | "ref"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
  onClick?: () => void;
  title?: string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  props,
  ref,
) {
  const { children, leftIcon, rightIcon, loading } = props;
  const inner = (
    <>
      {loading ? <Spinner /> : leftIcon}
      <span>{children}</span>
      {!loading && rightIcon}
    </>
  );

  if ("href" in props && props.href) {
    const { href, external, onClick, title, ...rest } = props;
    void rest;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
          title={title}
          className={classes(props)}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} title={title} onClick={onClick} className={classes(props)}>
        {inner}
      </Link>
    );
  }

  const {
    variant: _v,
    size: _s,
    fullWidth: _fw,
    leftIcon: _li,
    rightIcon: _ri,
    loading: _l,
    className: _cn,
    children: _c,
    ...buttonRest
  } = props as ButtonAsButton;
  void _v; void _s; void _fw; void _li; void _ri; void _l; void _cn; void _c;

  return (
    <motion.button
      ref={ref}
      whileHover={loading ? undefined : { scale: 1.02 }}
      whileTap={loading ? undefined : { scale: 0.98 }}
      disabled={loading || buttonRest.disabled}
      className={classes(props)}
      {...buttonRest}
    >
      {inner}
    </motion.button>
  );
});
