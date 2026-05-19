import Link from "next/link";
import { cn } from "@/lib/cn";

const variants = {
  primary:
    "bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm",
  secondary:
    "border border-border bg-surface text-foreground hover:border-emerald-500 hover:text-emerald-500",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export function LinkButton({ href, children, variant = "primary", size = "md", className, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </Link>
  );
}
