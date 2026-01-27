import Image from "next/image"
import Link from "next/link"
import {
  HandBag01Icon,
  GivePillIcon,
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: HandBag01Icon,
    title: "Start helping them",
    description: "Raising awareness about the charity's mission and cause.",
  },
  {
    icon: GivePillIcon,
    title: "Make Donations",
    description: "Raising awareness about the charity's mission and cause.",
  },
]

const checkItems = [
  "Helped fund 3,265 Project powerful corporate poor.",
  "We give child a gift of a education",
  "We help raise awareness about social Responsibility",
]

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-muted/30 py-20 sm:py-28">
      {/* Decorative dots */}
      <div className="absolute left-12 top-16 h-2 w-2 rounded-full bg-primary/40" />
      <div className="absolute right-1/3 top-12 h-3 w-3 rounded-full bg-primary/30" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
                <span className="h-1 w-8 rounded-full bg-primary" />
                Start Donating Poor People
              </p>
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Helping Each Other Can{" "}
                <span className="text-primary">Make World Better</span>
              </h2>
              <p className="max-w-lg text-base text-muted-foreground sm:text-lg">
                Volunteering offers opportunities to develop new skills and gain valuable experience. 
                This can include leadership, communication, project management, and teamwork skills.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-xl bg-background p-4 shadow-sm ring-1 ring-border/50"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <HugeiconsIcon
                      icon={feature.icon}
                      className="h-6 w-6 text-primary"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Check Items */}
            <div className="space-y-3">
              {checkItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <HugeiconsIcon
                    icon={CheckmarkCircle02Icon}
                    className="h-5 w-5 shrink-0 text-primary"
                  />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link href="/about">
              <Button size="lg" className="h-12 gap-2 rounded-full px-8">
                Learn More About Us
                <HugeiconsIcon icon={ArrowRight01Icon} className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Right Image Section */}
          <div className="relative lg:pl-8">
            <div className="relative mx-auto max-w-md lg:ml-auto">
              {/* Background decorative frame */}
              <div className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl bg-primary/10" />
              
              {/* Main Image */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border-4 border-primary/30">
                <Image
                  src="/assets/diverse-team-of-volunteers.jpg"
                  alt="Volunteers making a difference"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating secondary image */}
              <div className="absolute -left-8 -top-8 h-32 w-28 overflow-hidden rounded-xl border-4 border-background shadow-lg sm:-left-12 sm:h-40 sm:w-36">
                <Image
                  src="/assets/group-of-indian-children-in-a-small-village-near-gwalior-in-the-madhya-pradesh-region-of-india.jpg"
                  alt="Children we help"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Decorative element */}
              <div className="absolute -right-6 top-1/4 h-3 w-3 rounded-full bg-primary" />
              <div className="absolute -right-10 top-1/4 h-0.5 w-6 bg-primary/60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
