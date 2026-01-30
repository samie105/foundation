"use client"

import { useState, useEffect } from "react"
import {
  Mail01Icon,
  Call02Icon,
  Location01Icon,
  Edit02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

type User = {
  id: string
  name: string
  email: string
  avatar: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "+1 (555) 123-4567",
    address: "123 Hope Street, NY 10001, USA",
    bio: "Passionate about making a difference in the world through charitable giving and volunteer work.",
  })

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
      setFormData((prev) => ({
        ...prev,
        name: parsedUser.name,
        email: parsedUser.email,
      }))
    }
  }, [])

  const handleSave = () => {
    if (user) {
      const updatedUser = { ...user, name: formData.name, email: formData.email }
      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUser(updatedUser)
    }
    setIsEditing(false)
  }

  if (!user) return null

  return (
    <div className="space-y-6">
      {/* Profile Details */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-0 shadow-sm ring-1 ring-border/50">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </div>
            <Button
              variant={isEditing ? "default" : "outline"}
              className="gap-2"
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            >
              <HugeiconsIcon icon={Edit02Icon} className="h-4 w-4" />
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              ) : (
                <p className="rounded-lg bg-muted/50 px-3 py-2 text-foreground">{formData.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email Address</label>
              <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
                <HugeiconsIcon icon={Mail01Icon} className="h-4 w-4 text-muted-foreground" />
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="flex-1 bg-transparent text-sm focus:outline-none"
                  />
                ) : (
                  <span className="text-foreground">{formData.email}</span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Phone Number</label>
              <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
                <HugeiconsIcon icon={Call02Icon} className="h-4 w-4 text-muted-foreground" />
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="flex-1 bg-transparent text-sm focus:outline-none"
                  />
                ) : (
                  <span className="text-foreground">{formData.phone}</span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Address</label>
              <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
                <HugeiconsIcon icon={Location01Icon} className="h-4 w-4 text-muted-foreground" />
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="flex-1 bg-transparent text-sm focus:outline-none"
                  />
                ) : (
                  <span className="text-foreground">{formData.address}</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm ring-1 ring-border/50">
          <CardHeader>
            <CardTitle>Bio</CardTitle>
            <CardDescription>Tell others about yourself</CardDescription>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={5}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            ) : (
              <p className="rounded-lg bg-muted/50 px-3 py-2 text-muted-foreground">
                {formData.bio}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
