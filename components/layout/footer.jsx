import Link from "next/link";
import { FaXTwitter, FaFacebook, FaInstagram, FaGithub } from "react-icons/fa6";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/layout/logo";

const socialLinks = [
  { Icon: FaFacebook, href: siteConfig.links.facebook, label: "Facebook" },
  { Icon: FaXTwitter, href: siteConfig.links.x, label: "X" },
  { Icon: FaInstagram, href: siteConfig.links.instagram, label: "Instagram" },
  { Icon: FaGithub, href: siteConfig.links.github, label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-default">
      <div className="page-container py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo className="mb-3" />
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Your one-stop platform to discover, book, and manage sports facilities across the
              country.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2">
              {[
                { label: "Home", href: "/" },
                { label: "All Facilities", href: "/facilities" },
                { label: "My Bookings", href: "/my-bookings" },
                { label: "Add Facility", href: "/add-facility" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted transition-colors hover:text-emerald-500">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-muted">
              <li className="flex items-center gap-2">
                <FiMapPin className="shrink-0 text-emerald-500" size={15} />
                Dhaka, Bangladesh
              </li>
              <li className="flex items-center gap-2">
                <FiPhone className="shrink-0 text-emerald-500" size={15} />
                +880 1700-000000
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="shrink-0 text-emerald-500" size={15} />
                hello@sportnest.com
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">
              Follow Us
            </h3>
            <div className="flex gap-2">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-emerald-500 hover:text-emerald-500"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-8 border-t border-border pt-6 text-center text-sm text-muted">
          &copy; {new Date().getFullYear()} SportNest. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
