import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({ className }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 no-underline", className)}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 text-sm font-extrabold text-white">
        SN
      </span>
      <span className="text-lg font-bold text-foreground">SportNest</span>
    </Link>
  );
}
