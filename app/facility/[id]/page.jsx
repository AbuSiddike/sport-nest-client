"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { Card, Chip } from "@heroui/react";
import { FiClock, FiMapPin, FiUsers } from "react-icons/fi";
import { PrivateRoute } from "@/components/auth/private-route";
import { BookingForm } from "@/components/bookings/booking-form";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { createBooking, getFacilityById } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { capitalize, formatPrice } from "@/lib/utils";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=900&h=500&fit=crop";

function FacilityDetailContent() {
  const { id } = useParams();
  const { data: session } = authClient.useSession();
  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    getFacilityById(id)
      .then((res) => setFacility(res.data))
      .catch(() => toast.error("Facility not found"))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleBooking(data) {
    setSubmitting(true);
    try {
      await createBooking({ ...data, user_email: session.user.email });
      toast.success("Booking created successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create booking");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <LoadingSpinner label="Loading facility..." />;
  if (!facility) {
    return <p className="page-container py-16 text-center text-muted">Facility not found.</p>;
  }

  return (
    <section className="page-container py-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <img
            src={facility.image || FALLBACK_IMAGE}
            alt={facility.name}
            className="aspect-video w-full rounded-xl object-cover"
            onError={(e) => {
              e.currentTarget.src = FALLBACK_IMAGE;
            }}
          />
          <Card className="mt-6 p-5">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground">{facility.name}</h1>
              <Chip color="accent" variant="soft">
                {capitalize(facility.facility_type)}
              </Chip>
            </div>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex items-center gap-2">
                <FiMapPin className="text-emerald-500" />
                {facility.location}
              </li>
              <li className="flex items-center gap-2">
                <FiUsers className="text-emerald-500" />
                Capacity: {facility.capacity}
              </li>
              <li className="flex items-center gap-2">
                <FiClock className="text-emerald-500" />
                {formatPrice(facility.price_per_hour)}/hour
              </li>
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-muted">{facility.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {facility.available_slots?.map((slot) => (
                <Chip key={slot} variant="bordered" size="sm">
                  {slot}
                </Chip>
              ))}
            </div>
          </Card>
        </div>

        <BookingForm facility={facility} onSubmit={handleBooking} isLoading={submitting} />
      </div>
    </section>
  );
}

export default function FacilityDetailPage() {
  return (
    <PrivateRoute>
      <FacilityDetailContent />
    </PrivateRoute>
  );
}
