"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function PrivateRoute({ children }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();
  const redirectingRef = useRef(false);

  useEffect(() => {
    if (isPending) return;

    if (session?.user) {
      redirectingRef.current = false;
      return;
    }

    if (pathname === "/login" || pathname === "/register") return;
    if (redirectingRef.current) return;

    redirectingRef.current = true;
    const redirect = encodeURIComponent(pathname);
    router.replace(`/login?redirect=${redirect}`);
  }, [isPending, session?.user, router, pathname]);

  if (isPending) {
    return <LoadingSpinner label="Checking session..." />;
  }

  if (!session?.user) {
    return <LoadingSpinner label="Redirecting to login..." />;
  }

  return children;
}
