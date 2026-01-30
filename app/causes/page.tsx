"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight01Icon,
  FavouriteIcon,
  UserMultiple02Icon,
  Target01Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

const causes = [
  {
    id: "education",
    title: "Education for Children",
    description: "Providing quality education to underprivileged children, giving them the tools to build a brighter future through learning and skill development.",
    image: "/assets/asian-beautiful-boy-charity-cheerful-child-childhood-children-color-cute-dress-education-emotion_t20_b6GeGV.jpg",
    raised: 4050,
    goal: 6750,
    donors: 31,
    category: "Education",
    featured: true,
  },
  {
    id: "food-shelter",
    title: "Food & Shelter",
    description: "Ensuring no family goes hungry by providing nutritious meals and safe shelter to those in need across communities.",
    image: "/assets/image-of-man-child-covered-in-a-blanket.png",
    raised: 2565,
    goal: 4500,
    donors: 20,
    category: "Basic Needs",
    featured: true,
  },
  {
    id: "healthcare",
    title: "Healthcare Support",
    description: "Bringing essential medical care and health services to communities without access to proper healthcare facilities.",
    image: "/assets/women-breast-cancer-support-charity-concept.jpg",
    raised: 5580,
    goal: 9000,
    donors: 44,
    category: "Healthcare",
    featured: true,
  },
  {
    id: "clean-water",
    title: "Clean Water Initiative",
    description: "Building wells and water purification systems to provide clean, safe drinking water to rural communities.",
    image: "/assets/diverse-team-of-volunteers.jpg",
    raised: 3150,
    goal: 5400,
    donors: 25,
    category: "Environment",
    featured: true,
  },
  {
    id: "women-empowerment",
    title: "Women Empowerment",
    description: "Supporting women through education, skill training, and micro-financing to achieve financial independence.",
    image: "/assets/women-breast-cancer-support-charity-concept.jpg",
    raised: 1665,
    goal: 3600,
    donors: 14,
    category: "Social",
    featured: false,
  },
  {
    id: "emergency",
    title: "Emergency Relief Fund",
    description: "Rapid response fund for natural disasters and emergencies, providing immediate aid to affected communities.",
    image: "/assets/diverse-team-of-volunteers.jpg",
    raised: 4680,
    goal: 7200,
    donors: 56,
    category: "Emergency",
    featured: true,
  },
  {
    id: "elderly-care",
    title: "Elderly Care Program",
    description: "Providing care, support, and companionship to senior citizens who need assistance with daily living.",
    image: "/assets/diverse-team-of-volunteers.jpg",
    raised: 1980,
    goal: 4050,
    donors: 17,
    category: "Healthcare",
    featured: false,
  },
  {
    id: "youth-sports",
    title: "Youth Sports Development",
    description: "Creating opportunities for underprivileged youth to participate in sports and develop teamwork skills.",
    image: "/assets/asian-beautiful-boy-charity-cheerful-child-childhood-children-color-cute-dress-education-emotion_t20_b6GeGV.jpg",
    raised: 1350,
    goal: 3150,
    donors: 12,
    category: "Education",
    featured: false,
  },
  {
    id: "mental-health",
    title: "Mental Health Support",
    description: "Providing counseling and mental health resources to communities facing trauma and psychological challenges.",
    image: "/assets/women-breast-cancer-support-charity-concept.jpg",
    raised: 2520,
    goal: 4950,
    donors: 24,
    category: "Healthcare",
    featured: false,
  },
  {
    id: "animal-welfare",
    title: "Animal Welfare Initiative",
    description: "Rescuing and rehabilitating abandoned animals, providing shelter, medical care, and finding them loving homes.",
    image: "/assets/diverse-team-of-volunteers.jpg",
    raised: 1755,
    goal: 3600,
    donors: 28,
    category: "Environment",
    featured: false,
  },
  {
    id: "disaster-preparedness",
    title: "Disaster Preparedness Training",
    description: "Training communities in disaster preparedness and providing essential emergency supplies and equipment.",
    image: "/assets/diverse-team-of-volunteers.jpg",
    raised: 2880,
    goal: 5850,
    donors: 18,
    category: "Emergency",
    featured: false,
  },
  {
    id: "general",
    title: "Where Most Needed",
    description: "Let us allocate your donation where it's needed most. We'll ensure maximum impact across all our programs.",
    image: "/assets/diverse-team-of-volunteers.jpg",
    raised: 11250,
    goal: 18000,
    donors: 113,
    category: "General",
    featured: true,
  },
]

const categories = ["All", "Education", "Healthcare", "Basic Needs", "Environment", "Social", "Emergency", "General"]

export default function CausesPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCauses = causes.filter((cause) => {
    const matchesCategory = activeCategory === "All" || cause.category === activeCategory
    const matchesSearch = cause.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cause.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <HugeiconsIcon icon={FavouriteIcon} className="h-4 w-4" />
                Make a Difference Today
              </span>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Explore Our <span className="text-primary">Causes</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Every cause represents a story of hope. Choose where your donation can create 
                the most impact and join thousands of others making a difference.
              </p>
              
              {/* Search */}
              <div className="mt-8">
                <div className="relative mx-auto max-w-xl">
                  <input
                    type="text"
                    placeholder="Search causes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-full border border-border bg-background/50 px-6 py-4 pl-6 pr-12 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="border-b border-border/50 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-all ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Causes Grid */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Stats Banner */}
            <div className="mb-12 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-6 text-center">
                <p className="text-3xl font-bold text-primary">$240,000+</p>
                <p className="text-sm text-muted-foreground">Total Raised</p>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-6 text-center">
                <p className="text-3xl font-bold text-primary">2,103</p>
                <p className="text-sm text-muted-foreground">Active Donors</p>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-6 text-center">
                <p className="text-3xl font-bold text-primary">6</p>
                <p className="text-sm text-muted-foreground">Active Causes</p>
              </div>
            </div>

            {/* Causes */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredCauses.map((cause) => {
                const progress = (cause.raised / cause.goal) * 100
                return (
                  <Card
                    key={cause.id}
                    className="group overflow-hidden border-0 shadow-lg ring-1 ring-border/50 transition-all hover:shadow-xl hover:ring-primary/20"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={cause.image}
                        alt={cause.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      {cause.featured && (
                        <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                          Featured
                        </span>
                      )}
                      <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm dark:bg-black/50 dark:text-white">
                        {cause.category}
                      </span>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {cause.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {cause.description}
                      </p>

                      {/* Progress */}
                      <div className="mt-6 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold text-primary">${cause.raised.toLocaleString()}</span>
                          <span className="text-muted-foreground">of ${cause.goal.toLocaleString()}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <HugeiconsIcon icon={UserMultiple02Icon} className="h-3.5 w-3.5" />
                            {cause.donors} donors
                          </span>
                          <span className="flex items-center gap-1">
                            <HugeiconsIcon icon={Target01Icon} className="h-3.5 w-3.5" />
                            {Math.round(progress)}% funded
                          </span>
                        </div>
                      </div>

                      {/* Action */}
                      <Link href={`/donate?cause=${cause.id}`} className="mt-6 block">
                        <Button className="w-full gap-2 rounded-full">
                          Donate Now
                          <HugeiconsIcon icon={ArrowRight01Icon} className="h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {filteredCauses.length === 0 && (
              <div className="py-20 text-center">
                <HugeiconsIcon icon={FavouriteIcon} className="mx-auto h-16 w-16 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">No causes found</h3>
                <p className="mt-2 text-muted-foreground">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border/50 bg-muted/30 py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-12">
              <HugeiconsIcon icon={CheckmarkCircle02Icon} className="mx-auto h-16 w-16 text-primary" />
              <h2 className="mt-6 text-3xl font-bold text-foreground">
                Can&apos;t Decide? Let Us Help
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Donate to our general fund and we&apos;ll ensure your contribution goes where it&apos;s needed most. 
                Every dollar makes a difference.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link href="/donate?cause=general">
                  <Button size="lg" className="gap-2 rounded-full px-8">
                    Donate to General Fund
                    <HugeiconsIcon icon={ArrowRight01Icon} className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#contact">
                  <Button variant="outline" size="lg" className="rounded-full px-8">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
