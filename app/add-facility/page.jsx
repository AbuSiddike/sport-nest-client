"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Card } from "@heroui/react";
import { PrivateRoute } from "@/components/auth/private-route";
import { FacilityForm } from "@/components/facilities/facility-form";
import { PageHeader } from "@/components/ui/page-header";
import { createFacility } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

function AddFacilityContent() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    if (!data.available_slots.length) {
      toast.error("Add at least one time slot");
      return;
    }

    setLoading(true);
    try {
      await createFacility({ ...data, owner_email: session.user.email });
      toast.success("Facility created successfully!");
      router.push("/manage-facilities");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create facility");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="page-container max-w-2xl py-10">
      <PageHeader title="Add Facility" description="List your sports venue on SportNest." />
      <Card className="p-6">
        <FacilityForm onSubmit={handleSubmit} submitLabel="Create Facility" isLoading={loading} />
      </Card>
    </section>
  );
}

export default function AddFacilityPage() {
  return (
    <PrivateRoute>
      <AddFacilityContent />
    </PrivateRoute>
  );
}
