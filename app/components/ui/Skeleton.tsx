export type SkeletonProps = {
  className?: string;
  rounded?: "sm" | "md" | "lg" | "xl" | "full";
};

const roundedMap = {
  sm: "rounded",
  md: "rounded-lg",
  lg: "rounded-xl",
  xl: "rounded-2xl",
  full: "rounded-full",
};

export function Skeleton({ className = "h-4 w-full", rounded = "md" }: SkeletonProps) {
  return <div className={`skeleton ${roundedMap[rounded]} ${className}`} aria-hidden />;
}
