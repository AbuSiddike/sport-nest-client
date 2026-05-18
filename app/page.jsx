"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, Skeleton } from "@heroui/react";
import { LinkButton } from "@/components/ui/link-button";
import {
  FiArrowRight,
  FiAward,
  FiCalendar,
  FiCheckCircle,
  FiMapPin,
  FiSearch,
  FiStar,
  FiUsers,
} from "react-icons/fi";
import { FacilityCard } from "@/components/facilities/facility-card";
import { getFeaturedFacilities } from "@/lib/api";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.45, ease: "easeOut" },
  }),
};

const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedFacilities()
      .then((res) => setFeatured(res.data || []))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" aria-hidden />

        <div className="page-container relative max-w-3xl text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span
              variants={fadeUp}
              className="mb-5 inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500"
            >
              <FiAward size={14} />
              #1 Sports Booking Platform
            </motion.span>

            <motion.h1 variants={fadeUp} custom={1} className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Book Your Perfect <span className="gradient-text">Sports Facility</span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="mx-auto mt-4 max-w-xl text-lg text-muted">
              Discover and book football turfs, badminton courts, swimming lanes, tennis courts and more — all in one
              place.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="mt-8 flex flex-wrap justify-center gap-3">
              <LinkButton href="/facilities" size="lg">
                Explore Facilities
                <FiArrowRight size={18} />
              </LinkButton>
              <LinkButton href="/register" variant="secondary" size="lg">
                Get Started
              </LinkButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="page-container py-14">
        <div className="mb-10 text-center">
          <h2 className="section-heading">Featured Facilities</h2>
          <p className="section-subheading mx-auto">Top-rated and most booked sports venues near you</p>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-xl border border-border">
                <Skeleton className="aspect-[4/3] w-full rounded-none" />
                <div className="space-y-3 p-4">
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : featured.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((f) => (
              <FacilityCard key={f._id} facility={f} />
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-muted">No featured facilities yet. Check back soon!</p>
        )}

        <div className="mt-10 text-center">
          <LinkButton href="/facilities" variant="secondary">
            View All Facilities
            <FiArrowRight size={16} />
          </LinkButton>
        </div>
      </section>

      <section className="bg-default px-4 py-14 sm:px-6">
        <div className="page-container">
          <div className="mb-10 text-center">
            <h2 className="section-heading">How It Works</h2>
            <p className="section-subheading mx-auto">Book your next sports session in three easy steps</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: FiSearch,
                title: "Find a Facility",
                desc: "Browse venues by location, type, or name. Filter to find exactly what you need.",
              },
              {
                icon: FiCalendar,
                title: "Pick a Time Slot",
                desc: "Choose your date and slot with real-time availability and transparent pricing.",
              },
              {
                icon: FiCheckCircle,
                title: "Confirm & Play",
                desc: "Complete your booking instantly and manage it from your dashboard anytime.",
              },
            ].map((step, i) => (
              <motion.div key={step.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="h-full p-6 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                    <step.icon size={24} />
                  </div>
                  <span className="mx-auto mb-3 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted">{step.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-container py-14">
        <div className="mb-10 text-center">
          <h2 className="section-heading">Trusted by Athletes Everywhere</h2>
          <p className="section-subheading mx-auto">Join thousands of sports enthusiasts who book with confidence</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: FiMapPin, value: "100+", label: "Facilities Listed" },
            { icon: FiUsers, value: "5,000+", label: "Happy Users" },
            { icon: FiCalendar, value: "20,000+", label: "Bookings Made" },
            { icon: FiStar, value: "4.9/5", label: "Average Rating" },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <Card className="p-6 text-center">
                <stat.icon className="mx-auto mb-3 text-emerald-500" size={28} />
                <p className="text-2xl font-extrabold text-foreground">{stat.value}</p>
                <p className="mt-1 text-sm text-muted">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
