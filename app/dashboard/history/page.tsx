"use client"

import {
  FavouriteIcon,
  CheckmarkCircle02Icon,
  Mail01Icon,
  CreditCardIcon,
  Settings01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const activities = [
  {
    id: 1,
    type: "donation",
    title: "Donated to Education for Children",
    description: "Your donation of $150 was successfully processed",
    date: "Jan 15, 2026 at 2:30 PM",
    icon: CreditCardIcon,
  },
  {
    id: 2,
    type: "donation",
    title: "Donated to Food & Shelter",
    description: "Your donation of $75 was successfully processed",
    date: "Jan 10, 2026 at 11:15 AM",
    icon: CreditCardIcon,
  },
  {
    id: 3,
    type: "account",
    title: "Email preferences updated",
    description: "You updated your email notification settings",
    date: "Jan 8, 2026 at 4:45 PM",
    icon: Settings01Icon,
  },
  {
    id: 4,
    type: "donation",
    title: "Donated to Healthcare Support",
    description: "Your donation of $200 was successfully processed",
    date: "Jan 5, 2026 at 9:00 AM",
    icon: CreditCardIcon,
  },
  {
    id: 5,
    type: "account",
    title: "Account verified",
    description: "Your email address has been verified",
    date: "Jan 2, 2026 at 3:20 PM",
    icon: CheckmarkCircle02Icon,
  },
  {
    id: 6,
    type: "donation",
    title: "Donated to Clean Water Initiative",
    description: "Your donation of $100 was successfully processed",
    date: "Dec 28, 2025 at 10:30 AM",
    icon: CreditCardIcon,
  },
  {
    id: 7,
    type: "account",
    title: "Newsletter subscription",
    description: "You subscribed to our monthly impact newsletter",
    date: "Dec 25, 2025 at 8:00 AM",
    icon: Mail01Icon,
  },
  {
    id: 8,
    type: "donation",
    title: "Recurring donation set up",
    description: "Monthly $150 donation to Education for Children",
    date: "Dec 15, 2025 at 2:00 PM",
    icon: FavouriteIcon,
  },
]

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm ring-1 ring-border/50">
        <CardHeader>
          <CardTitle>Activity History</CardTitle>
          <CardDescription>A complete log of your account activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 h-full w-0.5 bg-border" />

            {/* Timeline items */}
            <div className="space-y-6">
              {activities.map((activity) => (
                <div key={activity.id} className="relative flex gap-4 pl-4">
                  {/* Timeline dot */}
                  <div
                    className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                      activity.type === "donation"
                        ? "bg-primary/10"
                        : "bg-muted"
                    }`}
                  >
                    <HugeiconsIcon
                      icon={activity.icon}
                      className={`h-5 w-5 ${
                        activity.type === "donation" ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 rounded-lg bg-muted/50 p-4">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <h4 className="font-medium text-foreground">{activity.title}</h4>
                      <span className="text-xs text-muted-foreground">{activity.date}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Load More */}
          <div className="mt-8 text-center">
            <button className="text-sm font-medium text-primary hover:underline">
              Load more activity
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
