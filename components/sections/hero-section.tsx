import Image from "next/image"
import Link from "next/link"
import { ArrowRight01Icon, InformationCircleIcon, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"

const highlights = [
  "Helped fund 3,265 projects for underprivileged communities",
  "We give children the gift of education",
  "We help raise awareness of human social responsibility",
]

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/herosection-image-boy-on-the-right-with-hands-out.jpg"
          alt="Child reaching out for help"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="max-w-2xl">
          {/* Content */}
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Start Donating To Poor People
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Helping Each Other Can{" "}
              <span className="text-primary">Make World Better</span>
            </h1>
            <p className="max-w-lg text-lg text-white/80">
              Volunteering offers opportunities to develop new skills and gain valuable experience. 
              This can include leadership, communication, project management, and teamwork skills.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/donate">
              <Button size="lg" className="h-12 gap-2 rounded-full px-8 text-base">
                Donate Now
                <HugeiconsIcon icon={ArrowRight01Icon} className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="#about">
              <Button 
                variant="outline" 
                size="lg" 
                className="h-12 gap-2 rounded-full border-2 border-white/40 bg-white/10 px-8 text-base text-white backdrop-blur-sm hover:border-white/60 hover:bg-white/20 dark:border-white/30 dark:bg-white/5 dark:hover:border-white/50 dark:hover:bg-white/10"
              >
                <HugeiconsIcon icon={InformationCircleIcon} className="h-5 w-5" />
                Learn More
              </Button>
            </Link>
          </div>

          {/* Highlights List */}
          <div className="mt-12 space-y-3">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-center gap-3">
                <HugeiconsIcon
                  icon={CheckmarkCircle02Icon}
                  className="h-5 w-5 shrink-0 text-primary"
                />
                <span className="text-sm text-white/70">{highlight}</span>
              </div>
            ))}
          </div>

          {/* Floating Stats */}
          <div className="mt-12 flex flex-wrap gap-6">
            <div className="rounded-2xl bg-white/10 px-6 py-4 backdrop-blur-sm">
              <p className="text-3xl font-bold text-white">3,265</p>
              <p className="text-sm text-white/60">Projects Funded</p>
            </div>
            <div className="rounded-2xl bg-white/10 px-6 py-4 backdrop-blur-sm">
              <p className="text-3xl font-bold text-white">485+</p>
              <p className="text-sm text-white/60">Lives Impacted</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
