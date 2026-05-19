"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button, Card, Modal } from "@heroui/react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { PrivateRoute } from "@/components/auth/private-route";
import { FacilityForm } from "@/components/facilities/facility-form";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { PageHeader } from "@/components/ui/page-header";
import { deleteFacility, getMyFacilities, updateFacility } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { capitalize, formatPrice } from "@/lib/utils";

function ManageFacilitiesContent() {
  const { data: session } = authClient.useSession();
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [saving, setSaving] = useState(false);

  const loadFacilities = useCallback(async () => {
    if (!session?.user?.email) return;
    setLoading(true);
    try {
      const res = await getMyFacilities(session.user.email);
      setFacilities(res.data || []);
    } catch {
      toast.error("Failed to load your facilities");
    } finally {
      setLoading(false);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    loadFacilities();
  }, [loadFacilities]);

  async function handleUpdate(data) {
    setSaving(true);
    try {
      await updateFacility(editing._id, { ...data, owner_email: session.user.email });
      toast.success("Facility updated successfully!");
      setEditing(null);
      loadFacilities();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update facility");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setSaving(true);
    try {
      await deleteFacility(deleting._id, session.user.email);
      toast.success("Facility deleted successfully!");
      setDeleting(null);
      loadFacilities();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete facility");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <LoadingSpinner label="Loading your facilities..." />;

  return (
    <section className="page-container py-10">
      <PageHeader
        title="Manage My Facilities"
        description="Update or remove facilities you own."
      />

      {!facilities.length ? (
        <p className="py-12 text-center text-muted">You have not added any facilities yet.</p>
      ) : (
        <div className="grid gap-4">
          {facilities.map((facility) => (
            <Card key={facility._id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold text-foreground">{facility.name}</h3>
                <p className="text-sm text-muted">
                  {capitalize(facility.facility_type)} · {facility.location} · {formatPrice(facility.price_per_hour)}/hr
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onPress={() => setEditing(facility)}>
                  <FiEdit2 size={14} />
                  Edit
                </Button>
                <Button variant="danger" size="sm" onPress={() => setDeleting(facility)}>
                  <FiTrash2 size={14} />
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {editing && (
        <Modal isOpen onOpenChange={() => setEditing(null)}>
          <Modal.Backdrop>
            <Modal.Container size="lg">
              <Modal.Dialog>
                <Modal.Header>
                  <Modal.Heading>Edit Facility</Modal.Heading>
                </Modal.Header>
                <Modal.Body>
                  <FacilityForm
                    initialValues={editing}
                    onSubmit={handleUpdate}
                    submitLabel="Save Changes"
                    isLoading={saving}
                  />
                </Modal.Body>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      )}

      <ConfirmDialog
        isOpen={Boolean(deleting)}
        onOpenChange={(open) => !open && setDeleting(null)}
        title="Delete facility?"
        description={`Are you sure you want to delete "${deleting?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        isLoading={saving}
      />
    </section>
  );
}

export default function ManageFacilitiesPage() {
  return (
    <PrivateRoute>
      <ManageFacilitiesContent />
    </PrivateRoute>
  );
}
