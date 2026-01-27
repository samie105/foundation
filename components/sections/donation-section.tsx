"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const causes = [
  {
    id: 1,
    title: "Education for Children",
    description: "Help provide quality education to underprivileged children across rural communities.",
    image: "/assets/asian-beautiful-boy-charity-cheerful-child-childhood-children-color-cute-dress-education-emotion_t20_b6GeGV.jpg",
    raised: 45000,
    goal: 60000,
    donors: 234,
  },
  {
    id: 2,
    title: "Food & Shelter",
    description: "Provide basic necessities to families affected by natural disasters and poverty.",
    image: "/assets/image-of-man-child-covered-in-a-blanket.png",
    raised: 28000,
    goal: 50000,
    donors: 156,
  },
  {
    id: 3,
    title: "Healthcare Support",
    description: "Fund medical treatments and healthcare services for those who cannot afford them.",
    image: "/assets/women-breast-cancer-support-charity-concept.jpg",
    raised: 72000,
    goal: 100000,
    donors: 412,
  },
  {
    id: 4,
    title: "Clean Water Initiative",
    description: "Bring clean drinking water to communities lacking access to safe water sources.",
    image: "/assets/women-breast-cancer-support-charity-concept.jpg",
    raised: 35000,
    goal: 75000,
    donors: 189,
  },
]

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function DonationSection() {
  return (
    <section id="causes" className="relative overflow-hidden bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
            <span className="h-1 w-8 rounded-full bg-primary" />
            Make A Difference
            <span className="h-1 w-8 rounded-full bg-primary" />
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Our Featured <span className="text-primary">Causes</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Your donation can change lives. Choose a cause that resonates with you and help us make a lasting impact.
          </p>
        </div>

        {/* Causes Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="mt-16 w-full"
        >
          <CarouselContent className="-ml-4">
            {causes.map((cause) => {
              const progress = (cause.raised / cause.goal) * 100

              return (
                <CarouselItem key={cause.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="group h-full overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={cause.image}
                        alt={cause.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
                          {cause.donors} Donors
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4 p-5">
                      <div>
                        <h3 className="text-lg font-semibold text-card-foreground">
                          {cause.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                          {cause.description}
                        </p>
                      </div>

                      {/* Progress with Border */}
                      <div className="rounded-xl border border-border p-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold text-card-foreground">
                            {formatCurrency(cause.raised)}
                          </span>
                          <span className="text-muted-foreground">
                            of {formatCurrency(cause.goal)}
                          </span>
                        </div>
                        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary transition-all duration-500"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          />
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">
                          {Math.round(progress)}% funded
                        </p>
                      </div>

                      {/* CTA */}
                      <Link href={`/donate?cause=${cause.id}`} className="block">
                        <Button className="w-full gap-2 rounded-full">
                          Donate Now
                          <HugeiconsIcon icon={ArrowRight01Icon} className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <div className="mt-8 flex justify-center gap-4">
            <CarouselPrevious className="static h-12 w-12 rounded-full" />
            <CarouselNext className="static h-12 w-12 rounded-full" />
          </div>
        </Carousel>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <Link href="/causes">
            <Button variant="outline" size="lg" className="gap-2 rounded-full">
              View All Causes
              <HugeiconsIcon icon={ArrowRight01Icon} className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
