"use client"

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import {
  MoneyReceiveSquareIcon,
  CheckmarkCircle02Icon,
  Cancel01Icon,
  Clock01Icon,
  FilterIcon,
  Search01Icon,
  EyeIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { getAdminUsers, updateDonationStatus } from "@/lib/actions/admin"
import { IDonation } from "@/lib/models/User"

interface DonationWithUser extends IDonation {
  userName: string
  userEmail: string
  userId: string
}

export default function AdminDonationsPage() {
  const [donations, setDonations] = useState<DonationWithUser[]>([])
  const [filteredDonations, setFilteredDonations] = useState<DonationWithUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "rejected">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProof, setSelectedProof] = useState<string | null>(null)

  const fetchDonations = useCallback(async () => {
    const result = await getAdminUsers()
    if (result.success && result.users) {
      const allDonations: DonationWithUser[] = []
      result.users.forEach((user: { id: string; name: string; email: string; donations: IDonation[] }) => {
        user.donations.forEach((donation) => {
          allDonations.push({
            ...donation,
            userName: user.name,
            userEmail: user.email,
            userId: user.id,
          })
        })
      })
      // Sort by date, newest first
      allDonations.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      setDonations(allDonations)
      setFilteredDonations(allDonations)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchDonations()
  }, [fetchDonations])

  useEffect(() => {
    let filtered = donations
    
    // Filter by status
    if (filter !== "all") {
      filtered = filtered.filter((d) => d.status === filter)
    }
    
    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (d) =>
          d.userName.toLowerCase().includes(query) ||
          d.userEmail.toLowerCase().includes(query) ||
          d.cause.toLowerCase().includes(query)
      )
    }
    
    setFilteredDonations(filtered)
  }, [donations, filter, searchQuery])

  const handleUpdateStatus = async (
    userId: string,
    donationId: string,
    status: "pending" | "confirmed" | "rejected"
  ) => {
    const result = await updateDonationStatus(userId, donationId, status)
    if (result.success) {
      fetchDonations()
    }
  }

  const totalAmount = donations.reduce((acc, d) => acc + d.amount, 0)
  const confirmedAmount = donations
    .filter((d) => d.status === "confirmed")
    .reduce((acc, d) => acc + d.amount, 0)
  const pendingAmount = donations
    .filter((d) => d.status === "pending")
    .reduce((acc, d) => acc + d.amount, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/10 text-green-600"
      case "rejected":
        return "bg-red-500/10 text-red-600"
      default:
        return "bg-yellow-500/10 text-yellow-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return CheckmarkCircle02Icon
      case "rejected":
        return Cancel01Icon
      default:
        return Clock01Icon
    }
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
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card className="border-0 shadow-sm ring-1 ring-border/50">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <HugeiconsIcon icon={MoneyReceiveSquareIcon} className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">${totalAmount}</p>
              <p className="text-sm text-muted-foreground">Total Donations</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm ring-1 ring-border/50">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
              <HugeiconsIcon icon={CheckmarkCircle02Icon} className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">${confirmedAmount}</p>
              <p className="text-sm text-muted-foreground">Confirmed</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm ring-1 ring-border/50">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10">
              <HugeiconsIcon icon={Clock01Icon} className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">${pendingAmount}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm ring-1 ring-border/50">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
              <HugeiconsIcon icon={MoneyReceiveSquareIcon} className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{donations.length}</p>
              <p className="text-sm text-muted-foreground">Total Count</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm ring-1 ring-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <HugeiconsIcon
                icon={Search01Icon}
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search by name, email, or cause..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={FilterIcon} className="h-4 w-4 text-muted-foreground" />
              <div className="flex gap-1">
                {(["all", "pending", "confirmed", "rejected"] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                      filter === status
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Donations List */}
      <Card className="border-0 shadow-sm ring-1 ring-border/50">
        <CardHeader>
          <CardTitle>All Donations</CardTitle>
          <CardDescription>
            {filteredDonations.length} donation{filteredDonations.length !== 1 ? "s" : ""} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredDonations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <HugeiconsIcon icon={MoneyReceiveSquareIcon} className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="mt-4 text-muted-foreground">No donations found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredDonations.map((donation, index) => (
                <div
                  key={donation._id || index}
                  className="rounded-xl border border-border p-4 transition-colors hover:bg-muted/30"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    {/* User & Cause Info */}
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-lg font-bold text-primary">
                          {donation.userName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{donation.userName}</p>
                        <p className="text-sm text-muted-foreground">{donation.userEmail}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            {donation.cause}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {donation.paymentMethod === "crypto"
                              ? donation.cryptoType?.toUpperCase()
                              : "Bank Transfer"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Amount & Status */}
                    <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                      <p className="text-2xl font-bold text-primary">${donation.amount}<span className="text-sm text-muted-foreground">/mo</span></p>
                      <div className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(donation.status)}`}>
                        <HugeiconsIcon icon={getStatusIcon(donation.status)} className="h-3 w-3" />
                        {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
                    <span className="text-xs text-muted-foreground">
                      {new Date(donation.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    
                    <div className="ml-auto flex items-center gap-2">
                      {donation.paymentProof && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 gap-1 text-xs"
                          onClick={() => setSelectedProof(donation.paymentProof || null)}
                        >
                          <HugeiconsIcon icon={EyeIcon} className="h-3 w-3" />
                          View Proof
                        </Button>
                      )}
                      
                      {donation.status !== "confirmed" && (
                        <Button
                          size="sm"
                          className="h-8 gap-1 text-xs bg-green-600 hover:bg-green-700"
                          onClick={() =>
                            donation._id && handleUpdateStatus(donation.userId, donation._id, "confirmed")
                          }
                          disabled={!donation._id}
                        >
                          <HugeiconsIcon icon={CheckmarkCircle02Icon} className="h-3 w-3" />
                          Confirm
                        </Button>
                      )}
                      
                      {donation.status !== "rejected" && (
                        <Button
                          size="sm"
                          variant="destructive"
                          className="h-8 gap-1 text-xs"
                          onClick={() =>
                            donation._id && handleUpdateStatus(donation.userId, donation._id, "rejected")
                          }
                          disabled={!donation._id}
                        >
                          <HugeiconsIcon icon={Cancel01Icon} className="h-3 w-3" />
                          Reject
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Proof Modal */}
      {selectedProof && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedProof(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-2xl overflow-auto rounded-2xl bg-background p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon-sm"
              className="absolute right-2 top-2 z-10"
              onClick={() => setSelectedProof(null)}
            >
              <HugeiconsIcon icon={Cancel01Icon} className="h-5 w-5" />
            </Button>
            <Image
              src={selectedProof}
              alt="Payment Proof"
              width={600}
              height={800}
              className="rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  )
}
