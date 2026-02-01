"use client"

import { useEffect, useState, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import {
  FavouriteIcon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  Cancel01Icon,
  BankIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { getUserSession } from "@/lib/actions/auth"
import { getUserDonations } from "@/lib/actions/admin"
import { IDonation } from "@/lib/models/User"

const filters = ["All", "Pending", "Confirmed", "Rejected"]

const causesTitles: Record<string, string> = {
  children: "Children's Education",
  hunger: "Fight Hunger",
  healthcare: "Healthcare Access",
  shelter: "Housing & Shelter",
  elderly: "Elderly Care",
  environment: "Environmental",
}

function DonationsContent() {
  const searchParams = useSearchParams()
  const showSuccess = searchParams.get("success") === "true"
  
  const [donations, setDonations] = useState<IDonation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState("All")
  const [successDismissed, setSuccessDismissed] = useState(false)

  useEffect(() => {
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

  const filteredDonations = donations.filter((d) => {
    if (activeFilter === "All") return true
    return d.status.toLowerCase() === activeFilter.toLowerCase()
  })

  const totalDonated = donations
    .filter((d) => d.status === "confirmed")
    .reduce((sum, d) => sum + d.amount, 0)

  const pendingCount = donations.filter((d) => d.status === "pending").length
  const confirmedCount = donations.filter((d) => d.status === "confirmed").length

  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getPaymentMethodLabel = (method: string, cryptoType?: string) => {
    if (method === "crypto" && cryptoType) {
      return cryptoType.toUpperCase()
    }
    if (method === "bank_transfer") return "Bank Transfer"
    return method
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {showSuccess && !successDismissed && (
        <div className="relative flex items-center gap-3 rounded-xl bg-green-500/10 p-4">
          <HugeiconsIcon icon={CheckmarkCircle02Icon} className="h-6 w-6 text-green-600" />
          <div className="flex-1">
            <p className="font-medium text-green-800 dark:text-green-400">
              Donation submitted successfully!
            </p>
            <p className="text-sm text-green-700 dark:text-green-500">
              Your donation is pending confirmation. We&apos;ll notify you once it&apos;s verified.
            </p>
          </div>
          <button
            onClick={() => setSuccessDismissed(true)}
            className="text-green-600 hover:text-green-800"
          >
            <HugeiconsIcon icon={Cancel01Icon} className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-0 shadow-sm ring-1 ring-border/50">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Total Confirmed</p>
            <p className="mt-1 text-3xl font-bold text-foreground">${totalDonated}</p>
            <p className="mt-1 text-xs text-muted-foreground">{confirmedCount} donations</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm ring-1 ring-border/50">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="mt-1 text-3xl font-bold text-yellow-600">{pendingCount}</p>
            <p className="mt-1 text-xs text-muted-foreground">Awaiting verification</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm ring-1 ring-border/50">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Total Donations</p>
            <p className="mt-1 text-3xl font-bold text-foreground">{donations.length}</p>
            <p className="mt-1 text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
      </div>

      {/* Donations List */}
      <Card className="border-0 shadow-sm ring-1 ring-border/50">
        <CardHeader className="flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Donation History</CardTitle>
            <CardDescription>View and track your contributions</CardDescription>
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
          </div>
        </CardHeader>
        <CardContent>
          {filteredDonations.length === 0 ? (
            <div className="py-12 text-center">
              <HugeiconsIcon
                icon={FavouriteIcon}
                className="mx-auto h-12 w-12 text-muted-foreground/50"
              />
              <p className="mt-4 text-muted-foreground">
                {activeFilter === "All"
                  ? "No donations yet. Make your first contribution!"
                  : `No ${activeFilter.toLowerCase()} donations`}
              </p>
              {activeFilter === "All" && (
                <Link href="/donate">
                  <Button className="mt-4">Make a Donation</Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredDonations.map((donation) => (
                <div
                  key={donation._id}
                  className="flex flex-col gap-4 rounded-xl bg-muted/50 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${
                        donation.status === "confirmed"
                          ? "bg-green-500/10"
                          : donation.status === "pending"
                          ? "bg-yellow-500/10"
                          : "bg-red-500/10"
                      }`}
                    >
                      <HugeiconsIcon
                        icon={
                          donation.status === "confirmed"
                            ? CheckmarkCircle02Icon
                            : donation.status === "pending"
                            ? Clock01Icon
                            : Cancel01Icon
                        }
                        className={`h-6 w-6 ${
                          donation.status === "confirmed"
                            ? "text-green-600"
                            : donation.status === "pending"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {causesTitles[donation.cause] || donation.cause}
                      </p>
                      <p className="text-sm text-muted-foreground">{formatDate(donation.createdAt)}</p>
                      <div className="mt-1 flex items-center gap-2">
                        {donation.paymentMethod === "crypto" ? (
                          <Image
                            src={`/assets/crypto/${donation.cryptoType}.svg`}
                            alt={donation.cryptoType || ""}
                            width={16}
                            height={16}
                            className="h-4 w-4"
                          />
                        ) : (
                          <HugeiconsIcon icon={BankIcon} className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="text-xs text-muted-foreground">
                          {getPaymentMethodLabel(donation.paymentMethod, donation.cryptoType)}
                        </span>
                        {donation.isAnonymous && (
                          <span className="rounded bg-muted px-1.5 py-0.5 text-xs">Anonymous</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:text-right">
                    <div>
                      <p className="text-xl font-bold text-foreground">${donation.amount}</p>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                          donation.status === "confirmed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : donation.status === "pending"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                      </span>
                    </div>
                    {donation.paymentProof && (
                      <a
                        href={donation.paymentProof}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline"
                      >
                        View Proof
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function DonationsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      }
    >
      <DonationsContent />
    </Suspense>
  )
}
