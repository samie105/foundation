"use client"

import Link from "next/link"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import {
  FavouriteIcon,
  Location01Icon,
  Call02Icon,
  Mail01Icon,
  ArrowRight01Icon,
  Linkedin01Icon,
  NewTwitterIcon,
  Facebook01Icon,
  InstagramIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "#team" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "Contact Us", href: "#contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
  causes: [
    { name: "Education", href: "/causes/education" },
    { name: "Healthcare", href: "/causes/healthcare" },
    { name: "Food & Shelter", href: "/causes/food-shelter" },
    { name: "Environment", href: "/causes/environment" },
  ],
}

const socialLinks = [
  { icon: Facebook01Icon, href: "#", label: "Facebook" },
  { icon: NewTwitterIcon, href: "#", label: "Twitter" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: Linkedin01Icon, href: "#", label: "LinkedIn" },
]

const sponsors = [
  "/assets/sponsor-carousel/one.png",
  "/assets/sponsor-carousel/two.png",
  "/assets/sponsor-carousel/three.png",
  "/assets/sponsor-carousel/four.png",
  "/assets/sponsor-carousel/one.png",
  "/assets/sponsor-carousel/two.png",
]

export function Footer() {
  return (
    <footer id="contact" className="bg-foreground text-background dark:bg-card dark:text-card-foreground">
      {/* Sponsors Carousel */}
      <div className="border-b border-background/10 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-6 text-center text-sm font-medium uppercase tracking-wider text-background/50 dark:text-muted-foreground">
            Trusted by Our Partners
          </p>
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 2500,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-8">
              {sponsors.map((sponsor, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/2 pl-8 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                >
                  <div className="flex h-16 items-center justify-center opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0">
                    <div className="relative h-12 w-36">
                      <Image
                        src={sponsor}
                        alt={`Sponsor ${index + 1}`}
                        fill
                        className="object-contain invert dark:invert-0"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4 lg:gap-8">
          {/* Brand Column */}
          <div className="space-y-6 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <HugeiconsIcon icon={FavouriteIcon} className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">
                Hope<span className="text-primary">Foundation</span>
              </span>
            </Link>
            <p className="text-sm text-background/70 dark:text-muted-foreground">
              Empowering communities and transforming lives through compassion, 
              education, and sustainable development initiatives worldwide.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <HugeiconsIcon icon={Location01Icon} className="h-5 w-5 text-primary" />
                <span className="text-background/70 dark:text-muted-foreground">
                  123 Hope Street, NY 10001, USA
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <HugeiconsIcon icon={Call02Icon} className="h-5 w-5 text-primary" />
                <span className="text-background/70 dark:text-muted-foreground">
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <HugeiconsIcon icon={Mail01Icon} className="h-5 w-5 text-primary" />
                <span className="text-background/70 dark:text-muted-foreground">
                  info@hopefoundation.org
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <Link key={index} href={social.href} aria-label={social.label}>
                  <Button variant="ghost" size="icon-sm" className="rounded-full bg-background/10 hover:bg-primary hover:text-primary-foreground dark:bg-muted">
                    <HugeiconsIcon icon={social.icon} className="h-4 w-4" />
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Company</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/70 transition-colors hover:text-primary dark:text-muted-foreground"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Support</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/70 transition-colors hover:text-primary dark:text-muted-foreground"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Causes</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.causes.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/70 transition-colors hover:text-primary dark:text-muted-foreground"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Stay Updated</h3>
            <p className="mt-4 text-sm text-background/70 dark:text-muted-foreground">
              Subscribe to our newsletter for updates on our causes and how you can help.
            </p>
            <form className="mt-4 space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-full border border-background/20 bg-background/10 px-4 py-2.5 text-sm placeholder:text-background/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-border dark:bg-muted dark:placeholder:text-muted-foreground"
              />
              <Button className="w-full gap-2 rounded-full">
                Subscribe
                <HugeiconsIcon icon={ArrowRight01Icon} className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-background/60 dark:text-muted-foreground">
              © {new Date().getFullYear()} Hope Foundation. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-background/60 dark:text-muted-foreground">
              <Link href="/privacy" className="hover:text-primary">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-primary">
                Terms
              </Link>
              <Link href="/cookies" className="hover:text-primary">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
