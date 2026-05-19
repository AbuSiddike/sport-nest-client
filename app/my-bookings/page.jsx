"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PrivateRoute } from "@/components/auth/private-route";
import { BookingCard } from "@/components/bookings/booking-card";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { PageHeader } from "@/components/ui/page-header";
import { cancelBooking, getMyBookings } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

function MyBookingsContent() {
  const { data: session } = authClient.useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [pendingCancel, setPendingCancel] = useState(null);

  const loadBookings = useCallback(async () => {
    if (!session?.user?.email) return;
    setLoading(true);
    try {
      const res = await getMyBookings(session.user.email);
      setBookings(res.data || []);
    } catch {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  async function handleCancelConfirm() {
    if (!pendingCancel) return;
    setCancellingId(pendingCancel._id);
    try {
      await cancelBooking(pendingCancel._id, session.user.email);
      toast.success("Booking cancelled successfully!");
      setPendingCancel(null);
      loadBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel booking");
    } finally {
      setCancellingId(null);
    }
  }

  if (loading) return <LoadingSpinner label="Loading your bookings..." />;

  return (
    <section className="page-container py-10">
      <PageHeader title="My Bookings" description="View and manage your sports facility reservations." />

      {!bookings.length ? (
        <p className="py-12 text-center text-muted">You have no bookings yet.</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              onCancel={setPendingCancel}
              isCancelling={cancellingId === booking._id}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={Boolean(pendingCancel)}
        onOpenChange={(open) => !open && setPendingCancel(null)}
        title="Cancel booking?"
        description="This will cancel your reservation. You can book again anytime."
        confirmLabel="Cancel Booking"
        onConfirm={handleCancelConfirm}
        isLoading={Boolean(cancellingId)}
      />
    </section>
  );
}

export default function MyBookingsPage() {
  return (
    <PrivateRoute>
      <MyBookingsContent />
    </PrivateRoute>
  );
}
