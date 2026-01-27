import Image from "next/image"
import Link from "next/link"
import { ArrowRight01Icon, UserMultiple02Icon, Target01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const causes = [
  {
    id: "education",
    title: "Education for Children",
    description: "Providing quality education to underprivileged children, building brighter futures.",
    image: "/assets/asian-beautiful-boy-charity-cheerful-child-childhood-children-color-cute-dress-education-emotion_t20_b6GeGV.jpg",
    raised: 45000,
    goal: 75000,
    donors: 342,
  },
  {
    id: "healthcare",
    title: "Healthcare Support",
    description: "Bringing essential medical care to communities without proper healthcare access.",
    image: "/assets/women-breast-cancer-support-charity-concept.jpg",
    raised: 62000,
    goal: 100000,
    donors: 489,
  },
  {
    id: "food-shelter",
    title: "Food & Shelter",
    description: "Ensuring no family goes hungry with nutritious meals and safe shelter.",
    image: "/assets/image-of-man-child-covered-in-a-blanket.png",
    raised: 28500,
    goal: 50000,
    donors: 215,
  },
]

export function FeaturedCausesSection() {
  return (
    <section id="causes" className="relative overflow-hidden bg-muted/30 py-20 dark:bg-muted/10">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(120,119,198,0.1),transparent_50%)]" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Our Causes
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Featured <span className="text-primary">Campaigns</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Support these urgent causes and make a lasting impact in communities around the world.
          </p>
        </div>

        {/* Causes Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {causes.map((cause) => {
            const progress = (cause.raised / cause.goal) * 100
            return (
              <Card
                key={cause.id}
                className="group overflow-hidden border-0 bg-background shadow-lg ring-1 ring-border/50 transition-all duration-300 hover:shadow-xl hover:ring-primary/30"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={cause.image}
                    alt={cause.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-white/90">
                      <div className="flex items-center gap-1 rounded-full bg-black/30 px-2 py-1 text-xs backdrop-blur-sm">
                        <HugeiconsIcon icon={UserMultiple02Icon} className="h-3 w-3" />
                        {cause.donors} donors
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                    {cause.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {cause.description}
                  </p>

                  {/* Progress */}
                  <div className="mt-5 space-y-3">
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-primary/80"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <span className="font-bold text-primary">${cause.raised.toLocaleString()}</span>
                        <span className="text-muted-foreground"> raised</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <HugeiconsIcon icon={Target01Icon} className="h-4 w-4" />
                        {Math.round(progress)}%
                      </div>
                    </div>
                  </div>

                  {/* Action */}
                  <Link href={`/donate?cause=${cause.id}`} className="mt-5 block">
                    <Button className="w-full gap-2 rounded-full" variant="outline">
                      Donate Now
                      <HugeiconsIcon icon={ArrowRight01Icon} className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link href="/causes">
            <Button size="lg" variant="outline" className="gap-2 rounded-full px-8">
              View All Causes
              <HugeiconsIcon icon={ArrowRight01Icon} className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
