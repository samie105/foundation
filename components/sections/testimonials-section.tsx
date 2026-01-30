"use client"

import Image from "next/image"
import {
  StarIcon,
  QuoteDownIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const testimonials = [
  {
    id: 1,
    name: "Farhat MR",
    role: "CEO of Charitia",
    image: "/assets/team-members/Douglas-DeCosta.png",
    content:
      "Lorem ipsum dolor sit amet consectetur. Ut tellus nulla su spendisse aliquam. Risus rutrum tellus eget ultrices pretium nisi amet facilisis.",
    rating: 5,
  },
  {
    id: 2,
    name: "Mr. Gold Smith",
    role: "Volunteer",
    image: "/assets/team-members/andren-willium.png",
    content:
      "Lorem ipsum dolor sit amet consectetur. Ut tellus nulla su spendisse aliquam. Risus rutrum tellus eget ultrices pretium nisi amet facilisis.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "Regular Donor",
    image: "/assets/team-members/poly-matzinger.png",
    content:
      "The transparency and impact of this foundation is remarkable. I've seen firsthand how my contributions have helped children get education.",
    rating: 5,
  },
  {
    id: 4,
    name: "Thomas Stewart",
    role: "Community Leader",
    image: "/assets/team-members/thomas-stewart.png",
    content:
      "Working with Hope Foundation has been life-changing. Their dedication to helping communities is truly inspiring and impactful.",
    rating: 5,
  },
]

const reviewerAvatars = [
  "/assets/team-members/Douglas-DeCosta.png",
  "/assets/team-members/andren-willium.png",
  "/assets/team-members/poly-matzinger.png",
  "/assets/team-members/thomas-stewart.png",
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative overflow-hidden bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div className="space-y-4">
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
              Supporting Our Cause Together
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              What People Say
              <br />
              <span className="text-primary">About Us</span>
            </h2>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-4xl font-bold text-foreground">300+</p>
              <p className="text-sm text-muted-foreground">Active Reviews</p>
            </div>
            <div className="flex -space-x-3">
              {reviewerAvatars.map((avatar, index) => (
                <div
                  key={index}
                  className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-background"
                >
                  <Image src={avatar} alt="Reviewer" fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="mt-12 w-full"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2">
                <div className="relative h-full rounded-2xl border border-border bg-card p-6 shadow-sm">
                  {/* Quote Icon */}
                  <div className="absolute right-6 top-6">
                    <HugeiconsIcon
                      icon={QuoteDownIcon}
                      className="h-10 w-10 text-primary/20"
                    />
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-primary/20">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-primary">{testimonial.role}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <p className="mt-6 text-muted-foreground">{testimonial.content}</p>

                  {/* Rating */}
                  <div className="mt-6 flex items-center gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <HugeiconsIcon
                        key={i}
                        icon={StarIcon}
                        className="h-5 w-5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-8 flex justify-center gap-4">
            <CarouselPrevious className="static h-12 w-12 rounded-full" />
            <CarouselNext className="static h-12 w-12 rounded-full" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
