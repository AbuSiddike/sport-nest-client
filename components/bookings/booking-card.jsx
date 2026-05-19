"use client";

import { Button, Card } from "@heroui/react";
import { FiCalendar, FiClock } from "react-icons/fi";
import { StatusChip } from "@/components/ui/status-chip";
import { formatDate, formatPrice } from "@/lib/utils";

export function BookingCard({ booking, onCancel, isCancelling }) {
  const canCancel = booking.status === "pending" || booking.status === "confirmed";

  return (
    <Card className="p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-foreground">{booking.facility_name}</h3>
            <StatusChip status={booking.status} />
          </div>
          <p className="flex items-center gap-2 text-sm text-muted">
            <FiCalendar size={14} className="text-emerald-500" />
            {formatDate(booking.booking_date)}
          </p>
          <p className="flex items-center gap-2 text-sm text-muted">
            <FiClock size={14} className="text-emerald-500" />
            {booking.time_slot} · {booking.hours} hour{booking.hours !== 1 ? "s" : ""}
          </p>
          <p className="text-sm font-semibold text-emerald-500">{formatPrice(booking.total_price)}</p>
        </div>

        {canCancel && (
          <Button variant="danger" size="sm" onPress={() => onCancel(booking)} isDisabled={isCancelling}>
            Cancel Booking
          </Button>
        )}
      </div>
    </Card>
  );
}
