"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  CreditCardIcon,
  ChartLineData02Icon,
  FavouriteIcon,
  ArrowRight01Icon,
  CalendarCheckOut01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const statsCards = [
  {
    title: "Total Donated",
    value: "$221",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: CreditCardIcon,
  },
  {
    title: "Causes Supported",
    value: "8",
    change: "+2 this month",
    changeType: "positive" as const,
    icon: FavouriteIcon,
  },
]

const recentDonations = [
  { id: 1, cause: "Education for Children", amount: 14, date: "Jan 15, 2026", status: "completed" },
  { id: 2, cause: "Food & Shelter", amount: 7, date: "Jan 10, 2026", status: "completed" },
  { id: 3, cause: "Healthcare Support", amount: 18, date: "Jan 5, 2026", status: "completed" },
  { id: 4, cause: "Clean Water Initiative", amount: 9, date: "Dec 28, 2025", status: "completed" },
]

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, index) => (
          <Card key={index} className="border-0 shadow-sm ring-1 ring-border/50">
            <CardContent className="flex items-start justify-between p-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p
                  className={`text-xs ${
                    stat.changeType === "positive"
                      ? "text-green-600 dark:text-green-400"
                      : "text-muted-foreground"
                  }`}
                >
                  {stat.change}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <HugeiconsIcon icon={stat.icon} className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6">
        {/* Recent Donations */}
        <Card className="border-0 shadow-sm ring-1 ring-border/50">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Donations</CardTitle>
              <CardDescription>Your latest contribution activity</CardDescription>
            </div>
            <Link href="/dashboard/donations">
              <Button variant="ghost" size="sm" className="gap-1">
                View All
                <HugeiconsIcon icon={ArrowRight01Icon} className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDonations.map((donation) => (
                <div
                  key={donation.id}
                  className="flex items-center justify-between rounded-lg bg-muted/50 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <HugeiconsIcon icon={FavouriteIcon} className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{donation.cause}</p>
                      <p className="text-xs text-muted-foreground">{donation.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">${donation.amount}</p>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      {donation.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-sm ring-1 ring-border/50">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks you might want to do</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/donate">
              <Button className="h-auto w-full flex-col gap-2 py-6">
                <HugeiconsIcon icon={CreditCardIcon} className="h-6 w-6" />
                <span>Make a Donation</span>
              </Button>
            </Link>
            <Link href="/causes">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 py-6">
                <HugeiconsIcon icon={FavouriteIcon} className="h-6 w-6" />
                <span>Browse Causes</span>
              </Button>
            </Link>
            <Link href="/dashboard/donations">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 py-6">
                <HugeiconsIcon icon={CalendarCheckOut01Icon} className="h-6 w-6" />
                <span>Set Recurring</span>
              </Button>
            </Link>
            <Link href="/dashboard/profile">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 py-6">
                <HugeiconsIcon icon={ChartLineData02Icon} className="h-6 w-6" />
                <span>Share Impact</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
