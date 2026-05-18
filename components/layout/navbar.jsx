"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/react";
import { FiChevronDown, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/layout/logo";
import { LinkButton } from "@/components/ui/link-button";
import { cn } from "@/lib/cn";

function NavLink({ href, children, onNavigate, className }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "text-sm font-medium transition-colors",
        active ? "text-emerald-500" : "text-muted hover:text-foreground",
        className,
      )}
    >
      {children}
    </Link>
  );
}

function ProfileMenu({ session, onLogout }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative hidden md:block">
      <Button variant="ghost" size="sm" className="gap-2" onPress={() => setOpen((v) => !v)}>
        {session.user.image ? (
          <img
            src={session.user.image}
            alt={session.user.name}
            className="h-7 w-7 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
            {session.user.name?.[0]?.toUpperCase() || "U"}
          </span>
        )}
        <span className="max-w-[100px] truncate text-sm">{session.user.name?.split(" ")[0]}</span>
        <FiChevronDown size={14} className={cn("transition-transform", open && "rotate-180")} />
      </Button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-border bg-surface p-2 shadow-lg">
            <div className="border-b border-border px-3 py-2">
              <p className="text-sm font-semibold text-foreground">{session.user.name}</p>
              <p className="text-xs text-muted">{session.user.email}</p>
            </div>
            {siteConfig.profileMenuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-default hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onLogout();
              }}
              className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-danger transition-colors hover:bg-danger/10"
            >
              <FiLogOut size={14} />
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export function Navbar() {
  const { data: session } = authClient.useSession();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  async function handleLogout() {
    await authClient.signOut();
  }

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="page-container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />
          <ul className="hidden items-center gap-6 md:flex">
            {siteConfig.navItems.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
            {session?.user &&
              siteConfig.navItemsAuth.map((item) => (
                <li key={item.href}>
                  <NavLink href={item.href}>{item.label}</NavLink>
                </li>
              ))}
          </ul>
        </div>

        <div className="flex items-center gap-2">
          <ThemeSwitch />

          {session?.user ? (
            <ProfileMenu session={session} onLogout={handleLogout} />
          ) : (
            <LinkButton href="/login" size="sm" className="hidden md:inline-flex">
              Login
            </LinkButton>
          )}

          <Button
            variant="ghost"
            isIconOnly
            className="md:hidden"
            aria-label="Toggle menu"
            onPress={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {[...siteConfig.navItems, ...(session?.user ? siteConfig.navItemsAuth : [])].map(
              (item) => (
                <li key={item.href}>
                  <NavLink href={item.href} onNavigate={closeMobile} className="block py-2 text-base">
                    {item.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
          <div className="mt-4 border-t border-border pt-4">
            {session?.user ? (
              <Button variant="danger" className="w-full" onPress={handleLogout}>
                <FiLogOut size={16} />
                Logout
              </Button>
            ) : (
              <LinkButton href="/login" className="w-full justify-center" onClick={closeMobile}>
                Login
              </LinkButton>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
