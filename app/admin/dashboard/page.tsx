"use client"

import { useEffect, useState, useCallback } from "react"
import {
  UserMultiple02Icon,
  Delete02Icon,
  CheckmarkCircle02Icon,
  Cancel01Icon,
  Clock01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { getAdminUsers, updateDonationStatus, deleteUser } from "@/lib/actions/admin"
import { IDonation } from "@/lib/models/User"

interface User {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  avatar?: string
  donations: IDonation[]
  createdAt: Date | string
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const fetchUsers = useCallback(async () => {
    const result = await getAdminUsers()
    if (result.success && result.users) {
      setUsers(result.users as User[])
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleUpdateDonationStatus = async (
    userId: string,
    donationId: string,
    status: "pending" | "confirmed" | "rejected"
  ) => {
    const result = await updateDonationStatus(userId, donationId, status)
    if (result.success) {
      fetchUsers()
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return
    const result = await deleteUser(userId)
    if (result.success) {
      setSelectedUser(null)
      fetchUsers()
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
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-0 shadow-sm ring-1 ring-border/50">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <HugeiconsIcon icon={UserMultiple02Icon} className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{users.length}</p>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm ring-1 ring-border/50">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
              <HugeiconsIcon icon={CheckmarkCircle02Icon} className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {users.reduce((acc, user) => acc + user.donations.filter(d => d.status === "confirmed").length, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Confirmed Donations</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm ring-1 ring-border/50">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10">
              <HugeiconsIcon icon={Clock01Icon} className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {users.reduce((acc, user) => acc + user.donations.filter(d => d.status === "pending").length, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Pending Donations</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Users List */}
        <Card className="border-0 shadow-sm ring-1 ring-border/50">
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>All registered users</CardDescription>
          </CardHeader>
          <CardContent>
            {users.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No users yet</p>
            ) : (
              <div className="space-y-3">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className={`flex items-center justify-between rounded-lg p-3 cursor-pointer transition-colors ${
                      selectedUser?.id === user.id
                        ? "bg-primary/10 ring-1 ring-primary/30"
                        : "bg-muted/50 hover:bg-muted"
                    }`}
                    onClick={() => setSelectedUser(user)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-sm font-bold text-primary">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">
                        {user.donations.length} donations
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ${user.donations.reduce((acc, d) => acc + d.amount, 0)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* User Details */}
        <Card className="border-0 shadow-sm ring-1 ring-border/50">
          <CardHeader>
            <CardTitle>User Details</CardTitle>
            <CardDescription>
              {selectedUser ? `Viewing ${selectedUser.name}` : "Select a user to view details"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedUser ? (
              <div className="space-y-6">
                {/* User Info */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Name</span>
                    <span className="text-sm font-medium text-foreground">{selectedUser.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Email</span>
                    <span className="text-sm font-medium text-foreground">{selectedUser.email}</span>
                  </div>
                  {selectedUser.phone && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Phone</span>
                      <span className="text-sm font-medium text-foreground">{selectedUser.phone}</span>
                    </div>
                  )}
                  {selectedUser.address && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Address</span>
                      <span className="text-sm font-medium text-foreground">{selectedUser.address}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Joined</span>
                    <span className="text-sm font-medium text-foreground">
                      {new Date(selectedUser.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Donations */}
                <div>
                  <h4 className="mb-3 font-medium text-foreground">Donations</h4>
                  {selectedUser.donations.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No donations yet</p>
                  ) : (
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {selectedUser.donations.map((donation) => (
                        <div
                          key={donation._id}
                          className="rounded-lg bg-muted/50 p-3 space-y-2"
                        >
                          <div className="flex justify-between">
                            <span className="font-medium text-foreground">{donation.cause}</span>
                            <span className="font-bold text-primary">${donation.amount}/mo</span>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>
                              {donation.paymentMethod === "crypto"
                                ? `${donation.cryptoType?.toUpperCase()}`
                                : "Bank Transfer"}
                            </span>
                            <span>{new Date(donation.createdAt).toLocaleDateString()}</span>
                          </div>
                          {donation.paymentProof && (
                            <a
                              href={donation.paymentProof}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary hover:underline"
                            >
                              View Payment Proof
                            </a>
                          )}
                          <div className="flex gap-2 pt-2">
                            <Button
                              size="sm"
                              variant={donation.status === "confirmed" ? "default" : "outline"}
                              className="flex-1 h-8 text-xs"
                              onClick={() =>
                                donation._id && handleUpdateDonationStatus(selectedUser.id, donation._id, "confirmed")
                              }
                              disabled={!donation._id}
                            >
                              <HugeiconsIcon icon={CheckmarkCircle02Icon} className="h-3 w-3 mr-1" />
                              Confirm
                            </Button>
                            <Button
                              size="sm"
                              variant={donation.status === "rejected" ? "destructive" : "outline"}
                              className="flex-1 h-8 text-xs"
                              onClick={() =>
                                donation._id && handleUpdateDonationStatus(selectedUser.id, donation._id, "rejected")
                              }
                              disabled={!donation._id}
                            >
                              <HugeiconsIcon icon={Cancel01Icon} className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Delete User */}
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => handleDeleteUser(selectedUser.id)}
                >
                  <HugeiconsIcon icon={Delete02Icon} className="h-4 w-4 mr-2" />
                  Delete User
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <HugeiconsIcon icon={UserMultiple02Icon} className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="mt-4 text-muted-foreground">Select a user to view their details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
