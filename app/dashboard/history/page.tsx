"use client"

import { useState } from "react"
import {
  FavouriteIcon,
  CheckmarkCircle02Icon,
  Mail01Icon,
  CreditCardIcon,
  Settings01Icon,
  FilterIcon,
  Calendar01Icon,
  ArrowDown01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const activities = [
  {
    id: 1,
    type: "donation",
    title: "Donated to Education for Children",
    description: "Your donation of $150 was successfully processed",
    amount: 150,
    date: "Jan 15, 2026",
    time: "2:30 PM",
    icon: CreditCardIcon,
    status: "completed",
  },
  {
    id: 2,
    type: "donation",
    title: "Donated to Food & Shelter",
    description: "Your donation of $75 was successfully processed",
    amount: 75,
    date: "Jan 10, 2026",
    time: "11:15 AM",
    icon: CreditCardIcon,
    status: "completed",
  },
  {
    id: 3,
    type: "account",
    title: "Email preferences updated",
    description: "You updated your email notification settings",
    date: "Jan 8, 2026",
    time: "4:45 PM",
    icon: Settings01Icon,
    status: "completed",
  },
  {
    id: 4,
    type: "donation",
    title: "Donated to Healthcare Support",
    description: "Your donation of $200 was successfully processed",
    amount: 200,
    date: "Jan 5, 2026",
    time: "9:00 AM",
    icon: CreditCardIcon,
    status: "completed",
  },
  {
    id: 5,
    type: "account",
    title: "Account verified",
    description: "Your email address has been verified",
    date: "Jan 2, 2026",
    time: "3:20 PM",
    icon: CheckmarkCircle02Icon,
    status: "completed",
  },
  {
    id: 6,
    type: "donation",
    title: "Donated to Clean Water Initiative",
    description: "Your donation of $100 was successfully processed",
    amount: 100,
    date: "Dec 28, 2025",
    time: "10:30 AM",
    icon: CreditCardIcon,
    status: "completed",
  },
  {
    id: 7,
    type: "account",
    title: "Newsletter subscription",
    description: "You subscribed to our monthly impact newsletter",
    date: "Dec 25, 2025",
    time: "8:00 AM",
    icon: Mail01Icon,
    status: "completed",
  },
  {
    id: 8,
    type: "recurring",
    title: "Recurring donation set up",
    description: "Monthly $150 donation to Education for Children",
    amount: 150,
    date: "Dec 15, 2025",
    time: "2:00 PM",
    icon: FavouriteIcon,
    status: "active",
  },
]

const filters = ["All", "Donations", "Account"]

// Group activities by month
function groupByMonth(items: typeof activities) {
  const groups: { [key: string]: typeof activities } = {}
  items.forEach((activity) => {
    const monthYear = activity.date.includes("Dec") 
      ? "December 2025" 
      : "January 2026"
    if (!groups[monthYear]) {
      groups[monthYear] = []
    }
    groups[monthYear].push(activity)
  })
  return groups
}

export default function HistoryPage() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [visibleCount, setVisibleCount] = useState(6)

  const filteredActivities = activities.filter((activity) => {
    if (activeFilter === "All") return true
    if (activeFilter === "Donations") return activity.type === "donation" || activity.type === "recurring"
    if (activeFilter === "Account") return activity.type === "account"
    return true
  })

  const visibleActivities = filteredActivities.slice(0, visibleCount)
  const groupedActivities = groupByMonth(visibleActivities)

  const totalDonated = activities
    .filter((a) => a.type === "donation")
    .reduce((sum, a) => sum + (a.amount || 0), 0)

  return (
    <div className="space-y-6">
      {/* Stats Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-0 bg-gradient-to-br from-primary/10 to-primary/5 shadow-sm ring-1 ring-border/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                <HugeiconsIcon icon={CreditCardIcon} className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Donated</p>
                <p className="text-2xl font-bold text-foreground">${totalDonated}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm ring-1 ring-border/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
                <HugeiconsIcon icon={CheckmarkCircle02Icon} className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed Actions</p>
                <p className="text-2xl font-bold text-foreground">{activities.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm ring-1 ring-border/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10">
                <HugeiconsIcon icon={FavouriteIcon} className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Recurring</p>
                <p className="text-2xl font-bold text-foreground">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline Card */}
      <Card className="border-0 shadow-sm ring-1 ring-border/50">
        <CardHeader className="flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon icon={Calendar01Icon} className="h-5 w-5 text-primary" />
              Activity Timeline
            </CardTitle>
            <CardDescription>A chronological view of all your activities</CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter)}
                className="rounded-full"
              >
                {filter}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="pb-8">
          {Object.entries(groupedActivities).map(([month, monthActivities]) => (
            <div key={month} className="mb-8 last:mb-0">
              {/* Month Header */}
              <div className="mb-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <span className="rounded-full bg-muted px-4 py-1.5 text-sm font-semibold text-foreground">
                  {month}
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              {/* Timeline */}
              <div className="relative ml-4 border-l-2 border-border/70 pl-8">
                {monthActivities.map((activity) => (
                  <div key={activity.id} className="relative pb-8 last:pb-0">
                    {/* Timeline dot */}
                    <div
                      className={`absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full border-2 border-background ${
                        activity.type === "donation"
                          ? "bg-primary"
                          : activity.type === "recurring"
                          ? "bg-purple-500"
                          : "bg-muted-foreground"
                      }`}
                    >
                      <HugeiconsIcon
                        icon={activity.icon}
                        className="h-3 w-3 text-white"
                      />
                    </div>

                    {/* Content Card */}
                    <div className="group rounded-xl border border-border/50 bg-muted/30 p-4 transition-all hover:border-primary/30 hover:bg-muted/50">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-foreground">
                              {activity.title}
                            </h4>
                            {activity.status === "active" && (
                              <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                                Active
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {activity.description}
                          </p>
                          <p className="mt-2 text-xs text-muted-foreground/70">
                            {activity.date} at {activity.time}
                          </p>
                        </div>
                        {activity.amount && (
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-lg font-bold ${
                                activity.type === "recurring" ? "text-purple-500" : "text-primary"
                              }`}
                            >
                              ${activity.amount}
                            </span>
                            {activity.type === "recurring" && (
                              <span className="text-xs text-muted-foreground">/mo</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredActivities.length === 0 && (
            <div className="py-16 text-center">
              <HugeiconsIcon icon={FilterIcon} className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-muted-foreground">No activities found with this filter</p>
            </div>
          )}

          {/* Load More */}
          {visibleCount < filteredActivities.length && (
            <div className="mt-8 text-center">
              <Button
                variant="outline"
                className="gap-2 rounded-full"
                onClick={() => setVisibleCount((prev) => prev + 4)}
              >
                <HugeiconsIcon icon={ArrowDown01Icon} className="h-4 w-4" />
                Load More Activities
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
