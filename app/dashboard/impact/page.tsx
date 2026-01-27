"use client"

import {
  UserMultiple02Icon,
  Book02Icon,
  Stethoscope02Icon,
  Home01Icon,
  DropletIcon,
  HeartCheckIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const impactMetrics = [
  { label: "Children Educated", value: 12, icon: Book02Icon, description: "Through school programs" },
  { label: "Meals Provided", value: 450, icon: Home01Icon, description: "To hungry families" },
  { label: "Medical Checkups", value: 23, icon: Stethoscope02Icon, description: "Free healthcare" },
  { label: "Clean Water Access", value: 156, icon: DropletIcon, description: "People served" },
  { label: "Lives Impacted", value: 485, icon: HeartCheckIcon, description: "Direct beneficiaries" },
  { label: "Communities Reached", value: 8, icon: UserMultiple02Icon, description: "Across regions" },
]

const monthlyImpact = [
  { month: "Aug", value: 35 },
  { month: "Sep", value: 42 },
  { month: "Oct", value: 58 },
  { month: "Nov", value: 65 },
  { month: "Dec", value: 78 },
  { month: "Jan", value: 94 },
]

const causeBreakdown = [
  { cause: "Education", percentage: 35, color: "bg-blue-500" },
  { cause: "Healthcare", percentage: 25, color: "bg-green-500" },
  { cause: "Food & Shelter", percentage: 20, color: "bg-yellow-500" },
  { cause: "Clean Water", percentage: 12, color: "bg-cyan-500" },
  { cause: "Others", percentage: 8, color: "bg-purple-500" },
]

export default function ImpactPage() {
  const maxValue = Math.max(...monthlyImpact.map((m) => m.value))

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="rounded-2xl bg-primary/10 p-6 dark:bg-primary/5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Your Impact Report</h2>
            <p className="text-muted-foreground">
              See how your contributions are making a difference
            </p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-4xl font-bold text-primary">485+</p>
            <p className="text-sm text-muted-foreground">Total Lives Impacted</p>
          </div>
        </div>
      </div>

      {/* Impact Metrics Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {impactMetrics.map((metric, index) => (
          <Card key={index} className="border-0 shadow-sm ring-1 ring-border/50">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <HugeiconsIcon icon={metric.icon} className="h-7 w-7 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                <p className="font-medium text-foreground">{metric.label}</p>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Impact Over Time */}
        <Card className="border-0 shadow-sm ring-1 ring-border/50">
          <CardHeader>
            <CardTitle>Impact Growth</CardTitle>
            <CardDescription>Your impact score over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-48 items-end gap-2">
              {monthlyImpact.map((month, index) => (
                <div key={index} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-lg bg-primary transition-all hover:bg-primary/80"
                    style={{ height: `${(month.value / maxValue) * 100}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{month.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cause Breakdown */}
        <Card className="border-0 shadow-sm ring-1 ring-border/50">
          <CardHeader>
            <CardTitle>Donation Breakdown</CardTitle>
            <CardDescription>Where your donations go</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {causeBreakdown.map((cause, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{cause.cause}</span>
                  <span className="font-medium text-foreground">{cause.percentage}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${cause.color}`}
                    style={{ width: `${cause.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Thank You Message */}
      <Card className="border-0 bg-gradient-to-r from-primary/10 to-primary/5 shadow-sm ring-1 ring-border/50">
        <CardContent className="p-8 text-center">
          <HugeiconsIcon icon={HeartCheckIcon} className="mx-auto h-16 w-16 text-primary" />
          <h3 className="mt-4 text-xl font-bold text-foreground">Thank You for Your Generosity!</h3>
          <p className="mx-auto mt-2 max-w-md text-muted-foreground">
            Your donations have directly contributed to improving lives across multiple communities.
            Every contribution, no matter the size, creates a ripple effect of positive change.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
