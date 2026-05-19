"use client";

import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { LinkButton } from "@/components/ui/link-button";
import { authClient } from "@/lib/auth-client";

export function BookNowButton({ facilityId, size = "sm", className }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <Button size={size} variant="primary" className={className} isDisabled>
        Book Now
      </Button>
    );
  }

  if (!session?.user) {
    return (
      <Button
        size={size}
        variant="primary"
        className={className}
        onPress={() =>
          router.push(`/login?redirect=${encodeURIComponent(`/facility/${facilityId}`)}`)
        }
      >
        Book Now
      </Button>
    );
  }

  return (
    <LinkButton href={`/facility/${facilityId}`} size={size === "lg" ? "lg" : "sm"} className={className}>
      Book Now
    </LinkButton>
  );
}
