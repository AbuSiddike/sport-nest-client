"use client";

import { useCallback, useEffect, useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { FacilityFilters } from "@/components/facilities/facility-filters";
import { FacilityGrid, FacilityGridSkeleton } from "@/components/facilities/facility-grid";
import { getFacilities } from "@/lib/api";

export default function FacilitiesPage() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);

  const typesKey = selectedTypes.join(",");

  const fetchFacilities = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getFacilities({
        search: search || undefined,
        types: typesKey || undefined,
      });
      setFacilities(res.data || []);
    } catch {
      setFacilities([]);
    } finally {
      setLoading(false);
    }
  }, [search, typesKey]);

  useEffect(() => {
    const timer = setTimeout(fetchFacilities, 300);
    return () => clearTimeout(timer);
  }, [fetchFacilities]);

  function handleReset() {
    setSearch("");
    setSelectedTypes([]);
  }

  return (
    <section className="page-container py-10">
      <PageHeader
        title="All Facilities"
        description="Browse sports venues and book your preferred time slot."
      />

      <FacilityFilters
        search={search}
        selectedTypes={selectedTypes}
        onSearchChange={setSearch}
        onTypesChange={setSelectedTypes}
        onReset={handleReset}
      />

      <div className="mt-8">
        {loading ? <FacilityGridSkeleton /> : <FacilityGrid facilities={facilities} />}
      </div>
    </section>
  );
}
