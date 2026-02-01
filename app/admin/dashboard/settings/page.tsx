"use client"

import { useEffect, useState } from "react"
import {
  Settings01Icon,
  UserIcon,
  LockPasswordIcon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { getAdminSession } from "@/lib/actions/auth"
import { updateAdminCredentials } from "@/lib/actions/admin"

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })
  const [admin, setAdmin] = useState<{ id: string; username: string } | null>(null)
  const [formData, setFormData] = useState({
    username: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  useEffect(() => {
    const loadAdmin = async () => {
      const session = await getAdminSession()
      if (session) {
        setAdmin(session)
        setFormData((prev) => ({ ...prev, username: session.username }))
      }
      setIsLoading(false)
    }
    loadAdmin()
  }, [])

  const handleSave = async () => {
    setMessage({ type: "", text: "" })

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match" })
      return
    }

    if (formData.newPassword && !formData.currentPassword) {
      setMessage({ type: "error", text: "Current password is required to change password" })
      return
    }

    setIsSaving(true)

    const result = await updateAdminCredentials({
      username: formData.username,
      currentPassword: formData.currentPassword || undefined,
      newPassword: formData.newPassword || undefined,
    })

    if (result.success) {
      setMessage({ type: "success", text: "Settings updated successfully!" })
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }))
    } else {
      setMessage({ type: "error", text: result.error || "Failed to update settings" })
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

  return (
    <div className="space-y-6">
      {message.text && (
        <div
          className={`rounded-lg p-4 ${
            message.type === "success"
              ? "bg-green-500/10 text-green-600"
              : "bg-destructive/10 text-destructive"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Admin Info */}
      <Card className="border-0 shadow-sm ring-1 ring-border/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <HugeiconsIcon icon={Settings01Icon} className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Admin Settings</CardTitle>
              <CardDescription>Manage your admin account</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 rounded-xl bg-muted/50 p-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <HugeiconsIcon icon={UserIcon} className="h-7 w-7 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{admin?.username}</p>
              <p className="text-sm text-muted-foreground">Administrator</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Update Username */}
      <Card className="border-0 shadow-sm ring-1 ring-border/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
              <HugeiconsIcon icon={UserIcon} className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <CardTitle>Username</CardTitle>
              <CardDescription>Update your admin username</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Admin Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="Enter username"
              className="w-full max-w-md rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </CardContent>
      </Card>

      {/* Update Password */}
      <Card className="border-0 shadow-sm ring-1 ring-border/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
              <HugeiconsIcon icon={LockPasswordIcon} className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your admin password</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-3">
            <HugeiconsIcon icon={InformationCircleIcon} className="h-5 w-5 text-muted-foreground mt-0.5" />
            <p className="text-sm text-muted-foreground">
              Leave password fields empty if you don&apos;t want to change your password
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Current Password</label>
              <input
                type="password"
                value={formData.currentPassword}
                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                placeholder="Enter current password"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">New Password</label>
              <input
                type="password"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                placeholder="Enter new password"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Confirm New Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Confirm new password"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving} size="lg" className="gap-2">
          {isSaving ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Saving...
            </>
          ) : (
            <>
              <HugeiconsIcon icon={CheckmarkCircle02Icon} className="h-5 w-5" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
