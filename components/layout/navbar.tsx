"use client"

import Link from "next/link"
import { useState } from "react"
import {
  FavouriteIcon,
  Menu01Icon,
  Cancel01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Causes", href: "#causes" },
  { name: "Team", href: "#team" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <HugeiconsIcon icon={FavouriteIcon} className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">
            Hope<span className="text-primary">Foundation</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth & Theme */}
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Link href="/auth/login">
            <Button variant="ghost" size="sm" className="rounded-full">
              Sign In
            </Button>
          </Link>
          <Link href="/donate">
            <Button size="sm" className="gap-1.5 rounded-full">
              Donate Now
              <HugeiconsIcon icon={ArrowRight01Icon} className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <HugeiconsIcon
              icon={isMobileMenuOpen ? Cancel01Icon : Menu01Icon}
              className="h-5 w-5"
            />
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out lg:hidden",
          isMobileMenuOpen ? "max-h-[400px]" : "max-h-0"
        )}
      >
        <div className="space-y-1 border-t border-border/40 bg-background px-4 pb-4 pt-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block rounded-lg px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-2 border-t border-border/40 pt-4">
            <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full rounded-full">
                Sign In
              </Button>
            </Link>
            <Link href="/donate" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full gap-1.5 rounded-full">
                Donate Now
                <HugeiconsIcon icon={ArrowRight01Icon} className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
