"use client"

import { useState, useEffect } from "react"
import {
  Mail01Icon,
  Call02Icon,
  Location01Icon,
  Edit02Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { getUserSession, updateUserProfile } from "@/lib/actions/auth"

type User = {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  bio?: string
  avatar?: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
  })

  useEffect(() => {
    const loadUser = async () => {
      const session = await getUserSession()
      if (session) {
        setUser(session)
        setFormData({
          name: session.name || "",
          email: session.email || "",
          phone: session.phone || "",
          address: session.address || "",
          bio: session.bio || "",
        })
      }
      setIsLoading(false)
    }
    loadUser()
  }, [])

  const handleSave = async () => {
    if (!user) return
    
    setIsSaving(true)
    setMessage({ type: "", text: "" })
    
    const result = await updateUserProfile({
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      bio: formData.bio,
    })
    
    if (result.success) {
      setUser({ ...user, ...formData })
      setMessage({ type: "success", text: "Profile updated successfully!" })
      setIsEditing(false)
    } else {
      setMessage({ type: "error", text: result.error || "Failed to update profile" })
    }
    
    setIsSaving(false)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="space-y-6">
      {message.text && (
        <div
          className={`flex items-center gap-2 rounded-xl p-4 ${
            message.type === "success"
              ? "bg-green-500/10 text-green-600"
              : "bg-destructive/10 text-destructive"
          }`}
        >
          {message.type === "success" && (
            <HugeiconsIcon icon={CheckmarkCircle02Icon} className="h-5 w-5" />
          )}
          {message.text}
        </div>
      )}

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
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Saving...
                </>
              ) : (
                <>
                  <HugeiconsIcon icon={Edit02Icon} className="h-4 w-4" />
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </>
              )}
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
                <p className="rounded-lg bg-muted/50 px-3 py-2 text-foreground">{formData.name || "-"}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email Address</label>
              <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
                <HugeiconsIcon icon={Mail01Icon} className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{formData.email || "-"}</span>
              </div>
              <p className="text-xs text-muted-foreground">Email cannot be changed</p>
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
                    placeholder="Enter phone number"
                    className="flex-1 bg-transparent text-sm focus:outline-none"
                  />
                ) : (
                  <span className="text-foreground">{formData.phone || "Not provided"}</span>
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
                    placeholder="Enter your address"
                    className="flex-1 bg-transparent text-sm focus:outline-none"
                  />
                ) : (
                  <span className="text-foreground">{formData.address || "Not provided"}</span>
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
                placeholder="Write a short bio about yourself..."
                rows={6}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            ) : (
              <p className="rounded-lg bg-muted/50 p-4 text-foreground">
                {formData.bio || "No bio added yet. Click edit to add one."}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Cancel Button when editing */}
      {isEditing && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={() => {
              setIsEditing(false)
              // Reset form data
              if (user) {
                setFormData({
                  name: user.name || "",
                  email: user.email || "",
                  phone: user.phone || "",
                  address: user.address || "",
                  bio: user.bio || "",
                })
              }
            }}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  )
}
