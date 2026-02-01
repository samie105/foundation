import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export default async function AdminPage() {
  const cookieStore = await cookies()
  const adminId = cookieStore.get("adminId")?.value

  if (adminId) {
    redirect("/admin/dashboard")
  } else {
    redirect("/admin/login")
  }
}
