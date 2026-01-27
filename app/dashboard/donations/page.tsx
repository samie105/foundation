"use client"

import { useState } from "react"
import {
  FilterIcon,
  Download01Icon,
  FavouriteIcon,
  CheckmarkCircle02Icon,
  Clock01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const donations = [
  { id: 1, cause: "Education for Children", amount: 150, date: "Jan 15, 2026", status: "completed", method: "Credit Card" },
  { id: 2, cause: "Food & Shelter", amount: 75, date: "Jan 10, 2026", status: "completed", method: "PayPal" },
  { id: 3, cause: "Healthcare Support", amount: 200, date: "Jan 5, 2026", status: "completed", method: "Credit Card" },
  { id: 4, cause: "Clean Water Initiative", amount: 100, date: "Dec 28, 2025", status: "completed", method: "Bank Transfer" },
  { id: 5, cause: "Education for Children", amount: 150, date: "Dec 15, 2025", status: "completed", method: "Credit Card" },
  { id: 6, cause: "Emergency Relief Fund", amount: 300, date: "Dec 1, 2025", status: "completed", method: "PayPal" },
  { id: 7, cause: "Women Empowerment", amount: 125, date: "Nov 20, 2025", status: "completed", method: "Credit Card" },
  { id: 8, cause: "Healthcare Support", amount: 250, date: "Nov 10, 2025", status: "pending", method: "Bank Transfer" },
]

const filters = ["All", "Completed", "Pending", "Recurring"]

export default function DonationsPage() {
  const [activeFilter, setActiveFilter] = useState("All")

  const filteredDonations = donations.filter((d) => {
    if (activeFilter === "All") return true
    return d.status.toLowerCase() === activeFilter.toLowerCase()
  })

  const totalDonated = donations
    .filter((d) => d.status === "completed")
    .reduce((sum, d) => sum + d.amount, 0)

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-0 shadow-sm ring-1 ring-border/50">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Total Donated</p>
            <p className="mt-1 text-3xl font-bold text-foreground">${totalDonated}</p>
            <p className="mt-1 text-xs text-muted-foreground">{donations.length} donations</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm ring-1 ring-border/50">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">This Month</p>
            <p className="mt-1 text-3xl font-bold text-foreground">$425</p>
            <p className="mt-1 text-xs text-green-600 dark:text-green-400">+15% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm ring-1 ring-border/50">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Average Donation</p>
            <p className="mt-1 text-3xl font-bold text-foreground">
              ${Math.round(totalDonated / donations.filter((d) => d.status === "completed").length)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Per transaction</p>
          </CardContent>
        </Card>
      </div>

      {/* Donations List */}
      <Card className="border-0 shadow-sm ring-1 ring-border/50">
        <CardHeader className="flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Donation History</CardTitle>
            <CardDescription>View and manage your contributions</CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            ))}
            <Button variant="outline" size="sm" className="gap-1">
              <HugeiconsIcon icon={Download01Icon} className="h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredDonations.map((donation) => (
              <div
                key={donation.id}
                className="flex flex-col gap-4 rounded-xl bg-muted/50 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <HugeiconsIcon icon={FavouriteIcon} className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{donation.cause}</p>
                    <p className="text-sm text-muted-foreground">
                      {donation.date} • {donation.method}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                      donation.status === "completed"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                  >
                    <HugeiconsIcon
                      icon={donation.status === "completed" ? CheckmarkCircle02Icon : Clock01Icon}
                      className="h-3.5 w-3.5"
                    />
                    {donation.status}
                  </span>
                  <p className="text-lg font-semibold text-foreground">${donation.amount}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredDonations.length === 0 && (
            <div className="py-12 text-center">
              <HugeiconsIcon icon={FilterIcon} className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">No donations found with this filter</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
