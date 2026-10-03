"use client";

import Link from "next/link";
import Image from 'next/image';
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import ThemeToggle from "@/components/theme-toggle";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Expertise", href: "/expertise" },
  { name: "Process", href: "/process" },
  { name: "Contact", href: "/contact" },
  { name: "Calculators", href: "/calculators" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 text-slate-900 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95 dark:text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setMobileOpen(false)}
        >
         <Image 
          src="/logo.svg" 
          alt="Company Logo" 
          width={80} 
          height={80} 
          priority
        />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            Book A Consultation
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((current) => !current)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white md:hidden"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 md:hidden">
          <div className="mx-auto max-w-7xl space-y-2 px-4 py-4 sm:px-6">
            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-3 block rounded-lg bg-teal-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              Book A Consultation
            </Link>
            <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-800">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Appearance
              </span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}

    </header>
  );
}