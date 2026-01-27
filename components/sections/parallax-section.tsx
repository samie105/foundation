import Image from "next/image"
import Link from "next/link"
import { ArrowRight01Icon, FavouriteIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"

const stats = [
  { value: "15K+", label: "Lives Changed" },
  { value: "$2.5M", label: "Funds Raised" },
  { value: "50+", label: "Communities" },
  { value: "98%", label: "To Programs" },
]

export function ParallaxSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Parallax Background */}
      <div className="absolute inset-0">
        <Image
          src="/assets/diverse-team-of-volunteers.jpg"
          alt="Volunteers making a difference"
          fill
          className="object-cover"
          style={{ objectPosition: "center 30%" }}
        />
        {/* Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
        {/* Additional pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                <HugeiconsIcon icon={FavouriteIcon} className="h-4 w-4 text-primary" />
                Join Our Mission
              </span>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Together We Can{" "}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  End Poverty
                </span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-white/80">
                Every donation, no matter the size, creates ripples of change. Join our community of 
                generous hearts and help us build a world where everyone has access to basic necessities, 
                education, and healthcare.
              </p>
              
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <Link href="/donate">
                  <Button size="lg" className="gap-2 rounded-full px-8 shadow-lg shadow-primary/25">
                    Start Giving
                    <HugeiconsIcon icon={ArrowRight01Icon} className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/causes">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="rounded-full border-2 border-white/30 bg-white/10 px-8 text-white backdrop-blur-sm hover:bg-white/20 hover:border-white/50"
                  >
                    View Causes
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group rounded-2xl bg-white/10 p-6 text-center backdrop-blur-sm transition-all hover:bg-white/20 border border-white/10"
                >
                  <p className="text-3xl font-bold text-white lg:text-4xl">{stat.value}</p>
                  <p className="mt-1 text-sm text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
