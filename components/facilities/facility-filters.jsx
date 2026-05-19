"use client";

import { Button, Checkbox, CheckboxGroup, Input, Label, TextField } from "@heroui/react";
import { FACILITY_TYPES } from "@/constants/facility-types";
import { capitalize } from "@/lib/utils";

export function FacilityFilters({ search, selectedTypes, onSearchChange, onTypesChange, onReset }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
        <TextField className="w-full">
          <Label>Search by name</Label>
          <Input
            placeholder="Search facilities..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="rounded-md border border-border bg-surface"
          />
        </TextField>

        <Button variant="secondary" onPress={onReset}>
          Reset filters
        </Button>
      </div>

      <div className="mt-4">
        <Label className="mb-2 block">Filter by sport type</Label>
        <CheckboxGroup
          value={selectedTypes}
          onChange={onTypesChange}
          className="grid grid-cols-2 gap-2 sm:grid-cols-4"
        >
          {FACILITY_TYPES.map((type) => (
            <Checkbox key={type} value={type}>
              <Checkbox.Control className="border-1 drop-shadow-md">
                <Checkbox.Indicator/>
              </Checkbox.Control>
              <Checkbox.Content>
                <Label>{capitalize(type)}</Label>
              </Checkbox.Content>
            </Checkbox>
          ))}
        </CheckboxGroup>
      </div>
    </div>
  );
}
