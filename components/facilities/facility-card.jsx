"use client";

import { motion } from "framer-motion";
import { Card, Chip } from "@heroui/react";
import { FiClock, FiMapPin, FiUsers } from "react-icons/fi";
import { BookNowButton } from "@/components/ui/book-now-button";
import { formatPrice, capitalize } from "@/lib/utils";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop";

export function FacilityCard({ facility }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="h-full"
    >
      <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={facility.image || FALLBACK_IMAGE}
            alt={facility.name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = FALLBACK_IMAGE;
            }}
          />
          <Chip className="absolute left-3 top-3" color="accent" variant="soft" size="sm">
            {capitalize(facility.facility_type)}
          </Chip>
        </div>

        <Card.Content className="flex flex-1 flex-col gap-3 p-4">
          <Card.Title className="line-clamp-1 text-lg">{facility.name}</Card.Title>

          <ul className="flex flex-col gap-1.5 text-sm text-muted">
            <li className="flex items-center gap-2">
              <FiMapPin className="shrink-0 text-emerald-500" size={14} />
              <span className="line-clamp-1">{facility.location}</span>
            </li>
            <li className="flex items-center gap-2">
              <FiUsers className="shrink-0 text-emerald-500" size={14} />
              Capacity: {facility.capacity}
            </li>
            <li className="flex items-center gap-2">
              <FiClock className="shrink-0 text-emerald-500" size={14} />
              {facility.available_slots?.length || 0} slots available
            </li>
          </ul>

          <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
            <div>
              <span className="text-lg font-bold text-emerald-500">{formatPrice(facility.price_per_hour)}</span>
              <span className="text-xs text-muted">/hr</span>
            </div>
            <BookNowButton facilityId={facility._id} />
          </div>
        </Card.Content>
      </Card>
    </motion.div>
  );
}
