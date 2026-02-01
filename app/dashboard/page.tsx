"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  CreditCardIcon,
  FavouriteIcon,
  ArrowRight01Icon,
  CalendarCheckOut01Icon,
  Clock01Icon,
  UserIcon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { getUserSession } from "@/lib/actions/auth"
import { getUserDonations } from "@/lib/actions/admin"
import { IDonation } from "@/lib/models/User"

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  const [donations, setDonations] = useState<IDonation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    const loadDonations = async () => {
      const session = await getUserSession()
      if (session?.id) {
        const result = await getUserDonations(session.id)
        if (result.donations) {
          setDonations(result.donations)
        }
      }
      setIsLoading(false)
    }
    loadDonations()
  }, [])

  if (!mounted) return null

  const totalDonated = donations
    .filter((d) => d.status === "confirmed")
    .reduce((sum, d) => sum + d.amount, 0)

  const causesSupported = new Set(
    donations.filter((d) => d.status === "confirmed").map((d) => d.cause)
  ).size

  const pendingDonations = donations.filter((d) => d.status === "pending").length
  const confirmedDonations = donations.filter((d) => d.status === "confirmed").length

  const recentDonations = donations.slice(0, 4)

  const statsCards = [
    {
      title: "Total Donated",
      value: `$${totalDonated}`,
      subtitle: `${confirmedDonations} confirmed`,
      icon: CreditCardIcon,
    },
    {
      title: "Causes Supported",
      value: String(causesSupported),
      subtitle: "Unique causes",
      icon: FavouriteIcon,
    },
    {
      title: "Pending Donations",
      value: String(pendingDonations),
      subtitle: "Awaiting confirmation",
      icon: Clock01Icon,
    },
    {
      title: "Total Contributions",
      value: String(donations.length),
      subtitle: "All time",
      icon: CheckmarkCircle02Icon,
    },
  ]

  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getCauseTitle = (causeId: string) => {
    const titles: Record<string, string> = {
      children: "Children's Education",
      hunger: "Fight Hunger",
      healthcare: "Healthcare Access",
      shelter: "Housing & Shelter",
      elderly: "Elderly Care",
      environment: "Environmental",
    }
    return titles[causeId] || causeId
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
                <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <HugeiconsIcon icon={stat.icon} className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : recentDonations.length === 0 ? (
            <div className="py-8 text-center">
              <HugeiconsIcon icon={FavouriteIcon} className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-2 text-sm text-muted-foreground">No donations yet</p>
              <Link href="/donate">
                <Button className="mt-4" size="sm">
                  Make Your First Donation
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentDonations.map((donation) => (
                <div
                  key={donation._id}
                  className="flex items-center justify-between rounded-lg bg-muted/50 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <HugeiconsIcon icon={FavouriteIcon} className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{getCauseTitle(donation.cause)}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(donation.createdAt)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">${donation.amount}</p>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        donation.status === "confirmed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : donation.status === "pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {donation.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

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
                <span>View Donations</span>
              </Button>
            </Link>
            <Link href="/dashboard/profile">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 py-6">
                <HugeiconsIcon icon={UserIcon} className="h-6 w-6" />
                <span>Edit Profile</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
