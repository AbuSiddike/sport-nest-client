import { FACILITY_TYPES } from "@/constants/facility-types";

export const siteConfig = {
  name: "SportNest",
  description:
    "Book your favorite sports facilities — football turfs, badminton courts, swimming lanes, tennis courts and more.",
  navItems: [
    { label: "Home", href: "/" },
    { label: "All Facilities", href: "/facilities" },
  ],
  navItemsAuth: [
    { label: "My Bookings", href: "/my-bookings" },
    { label: "Add Facility", href: "/add-facility" },
    { label: "Manage My Facilities", href: "/manage-facilities" },
  ],
  profileMenuItems: [
    { label: "My Bookings", href: "/my-bookings" },
    { label: "Add Facility", href: "/add-facility" },
    { label: "Manage My Facilities", href: "/manage-facilities" },
  ],
  facilityTypes: FACILITY_TYPES,
  links: {
    github: "https://github.com",
    facebook: "https://facebook.com",
    x: "https://x.com",
    instagram: "https://instagram.com",
  },
};
