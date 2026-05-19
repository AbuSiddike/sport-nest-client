"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Input, Label, TextField } from "@heroui/react";
import { formatPrice } from "@/lib/utils";

export function BookingForm({ facility, onSubmit, isLoading }) {
  const [bookingDate, setBookingDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [hours, setHours] = useState(1);

  const totalPrice = useMemo(
    () => Number(facility.price_per_hour) * Number(hours || 0),
    [facility.price_per_hour, hours],
  );

  useEffect(() => {
    if (facility.available_slots?.length && !timeSlot) {
      setTimeSlot(facility.available_slots[0]);
    }
  }, [facility.available_slots, timeSlot]);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      facility_id: facility._id,
      booking_date: bookingDate,
      time_slot: timeSlot,
      hours: Number(hours),
    });
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-border bg-surface p-5"
    >
      <h2 className="text-xl font-semibold text-foreground">Book This Facility</h2>

      <TextField>
        <Label>Facility Name</Label>
        <Input
          value={facility.name}
          readOnly={true}
          className="rounded-md border border-border bg-surface"
        />
      </TextField>

      <TextField isRequired>
        <Label>Booking Date</Label>
        <Input
          type="date"
          min={today}
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          required
          className="rounded-md border border-border bg-surface"
        />
      </TextField>

      <TextField isRequired>
        <Label>Time Slot</Label>
        <select
          className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm"
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          required
        >
          {facility.available_slots?.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </TextField>

      <TextField isRequired>
        <Label>Hours</Label>
        <Input
          type="number"
          min={1}
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          required
          className="rounded-md border border-border bg-surface"
        />
      </TextField>

      <div className="rounded-lg bg-emerald-500/10 px-4 py-3">
        <p className="text-sm text-muted">Total Price</p>
        <p className="text-2xl font-bold text-emerald-500">{formatPrice(totalPrice)}</p>
      </div>

      <Button type="submit" variant="primary" className="w-full" isDisabled={isLoading}>
        {isLoading ? "Booking..." : "Confirm Booking"}
      </Button>
    </form>
  );
}
