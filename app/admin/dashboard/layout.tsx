"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  FavouriteIcon,
  UserMultiple02Icon,
  Settings01Icon,
  Logout01Icon,
  CreditCardIcon,
  Menu01Icon,
  Cancel01Icon,
  MoneyReceiveSquareIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { getAdminSession, logoutAdmin } from "@/lib/actions/auth"
import { cn } from "@/lib/utils"

const sidebarLinks = [
  { name: "Users", href: "/admin/dashboard", icon: UserMultiple02Icon },
  { name: "Donations", href: "/admin/dashboard/donations", icon: MoneyReceiveSquareIcon },
  { name: "Payment Methods", href: "/admin/dashboard/payments", icon: CreditCardIcon },
  { name: "Settings", href: "/admin/dashboard/settings", icon: Settings01Icon },
]

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [admin, setAdmin] = useState<{ id: string; username: string } | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [pathname, setPathname] = useState("")

  useEffect(() => {
    const checkAuth = async () => {
      const session = await getAdminSession()
      if (!session) {
        router.push("/admin/login")
        return
      }
      setAdmin(session)
    }
    checkAuth()
    setPathname(window.location.pathname)
  }, [router])

  const handleLogout = async () => {
    await logoutAdmin()
    router.push("/admin/login")
  }

  if (!admin) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-background shadow-xl transition-transform duration-300 lg:relative lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-border px-4">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <HugeiconsIcon icon={FavouriteIcon} className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">
                Admin <span className="text-primary">Panel</span>
              </span>
            </Link>
            <Button
              variant="ghost"
              size="icon-sm"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            >
              <HugeiconsIcon icon={Cancel01Icon} className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 overflow-y-auto p-4">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                  onClick={() => {
                    setIsSidebarOpen(false)
                    setPathname(link.href)
                  }}
                >
                  <HugeiconsIcon icon={link.icon} className="h-5 w-5" />
                  {link.name}
                </Link>
              )
            })}
          </nav>

          {/* Admin Section */}
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <span className="text-sm font-bold text-primary">
                  {admin.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-foreground">{admin.username}</p>
                <p className="truncate text-xs text-muted-foreground">Administrator</p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="mt-3 w-full justify-start gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={handleLogout}
            >
              <HugeiconsIcon icon={Logout01Icon} className="h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-lg sm:px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <HugeiconsIcon icon={Menu01Icon} className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">Manage users and payments</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}
