"use client";

import { useState } from "react";
import { Button, Input, Label, TextArea, TextField } from "@heroui/react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { FACILITY_TYPES } from "@/constants/facility-types";
import { capitalize } from "@/lib/utils";

const EMPTY_FORM = {
  name: "",
  facility_type: "football",
  image: "",
  location: "",
  price_per_hour: "",
  capacity: "",
  description: "",
  available_slots: ["06:00-08:00"],
};

export function FacilityForm({ initialValues, onSubmit, submitLabel, isLoading }) {
  const [form, setForm] = useState({ ...EMPTY_FORM, ...initialValues });
  const [uploading, setUploading] = useState(false);

  function updateField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function updateSlot(index, value) {
    setForm((prev) => {
      const slots = [...prev.available_slots];
      slots[index] = value;
      return { ...prev, available_slots: slots };
    });
  }

  function addSlot() {
    setForm((prev) => ({ ...prev, available_slots: [...prev.available_slots, ""] }));
  }

  function removeSlot(index) {
    setForm((prev) => ({
      ...prev,
      available_slots: prev.available_slots.filter((_, i) => i !== index),
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      ...form,
      price_per_hour: Number(form.price_per_hour),
      capacity: Number(form.capacity),
      available_slots: form.available_slots.filter(Boolean),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <TextField isRequired>
        <Label>Facility Name</Label>
        <Input value={form.name} onChange={(e) => updateField("name", e.target.value)} required placeholder="John Due"/>
      </TextField>

      <TextField isRequired>
        <Label>Facility Type</Label>
        <select
          className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm"
          value={form.facility_type}
          onChange={(e) => updateField("facility_type", e.target.value)}
        >
          {FACILITY_TYPES.map((type) => (
            <option key={type} value={type}>
              {capitalize(type)}
            </option>
          ))}
        </select>
      </TextField>

      <TextField isRequired>
        <Label>Image Upload</Label>
        <Input
          type="text"
          value={form.image}
          onChange={(e) => updateField("image", e.target.value)}
          placeholder="https://i.ibb.co/your-photo.jpg"
        />
      </TextField>

      <TextField isRequired>
        <Label>Location</Label>
        <Input
          value={form.location}
          onChange={(e) => updateField("location", e.target.value)}
          placeholder="Dhaka, Mirpur"
          required
        />
      </TextField>

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField isRequired>
          <Label>Price Per Hour (৳)</Label>
          <Input
            type="number"
            min={1}
            value={form.price_per_hour}
            onChange={(e) => updateField("price_per_hour", e.target.value)}
            required
          />
        </TextField>
        <TextField isRequired>
          <Label>Capacity</Label>
          <Input
            type="number"
            min={1}
            value={form.capacity}
            onChange={(e) => updateField("capacity", e.target.value)}
            required
          />
        </TextField>
      </div>

      <div>
        <Label className="mb-2 block">Available Time Slots</Label>
        <div className="space-y-2">
          {form.available_slots.map((slot, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={slot}
                onChange={(e) => updateSlot(index, e.target.value)}
                placeholder="06:00-08:00"
                className="flex-1"
                required
              />
              {form.available_slots.length > 1 && (
                <Button
                  type="button"
                  variant="danger"
                  isIconOnly
                  onPress={() => removeSlot(index)}
                  aria-label="Remove slot"
                >
                  <FiTrash2 size={16} />
                </Button>
              )}
            </div>
          ))}
        </div>
        <Button type="button" variant="secondary" size="sm" className="mt-2" onPress={addSlot}>
          <FiPlus size={14} />
          Add slot
        </Button>
      </div>

      <TextField isRequired>
        <Label>Description</Label>
        <TextArea
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          minRows={4}
          required
        />
      </TextField>

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        isDisabled={isLoading || uploading}
      >
        {isLoading ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
