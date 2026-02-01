"use server"

import { cookies } from "next/headers"
import dbConnect from "@/lib/mongodb"
import Admin from "@/lib/models/Admin"
import User from "@/lib/models/User"

// Admin Authentication
export async function loginAdmin(username: string, password: string) {
  try {
    await dbConnect()
    
    const admin = await Admin.findOne({ username, password })
    
    if (!admin) {
      return { success: false, error: "Invalid credentials" }
    }

    const cookieStore = await cookies()
    cookieStore.set("adminId", admin._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return { success: true, admin: { id: admin._id.toString(), username: admin.username } }
  } catch (error) {
    console.error("Admin login error:", error)
    return { success: false, error: "Login failed" }
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies()
  cookieStore.delete("adminId")
  return { success: true }
}

export async function getAdminSession() {
  try {
    const cookieStore = await cookies()
    const adminId = cookieStore.get("adminId")?.value

    if (!adminId) {
      return null
    }

    await dbConnect()
    const admin = await Admin.findById(adminId).select("-password")

    if (!admin) {
      return null
    }

    return { 
      id: admin._id.toString(), 
      username: admin.username,
      paymentMethods: admin.paymentMethods 
    }
  } catch (error) {
    console.error("Get admin session error:", error)
    return null
  }
}

// User Authentication
export async function registerUser(data: {
  name: string
  email: string
  password: string
  adminId?: string
}) {
  try {
    await dbConnect()

    const existingUser = await User.findOne({ email: data.email })
    if (existingUser) {
      return { success: false, error: "Email already registered" }
    }

    // Get admin ID - use provided one or default to first admin
    let adminId = data.adminId
    if (!adminId) {
      const admin = await Admin.findOne()
      if (admin) {
        adminId = admin._id.toString()
      }
    }

    const user = await User.create({
      name: data.name,
      email: data.email,
      password: data.password,
      adminId: adminId || undefined,
      donations: [],
    })

    const cookieStore = await cookies()
    cookieStore.set("userId", user._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    })

    return { 
      success: true, 
      user: { 
        id: user._id.toString(), 
        name: user.name, 
        email: user.email,
        avatar: user.avatar 
      } 
    }
  } catch (error) {
    console.error("Register error:", error)
    return { success: false, error: "Registration failed" }
  }
}

export async function loginUser(email: string, password: string) {
  try {
    await dbConnect()

    const user = await User.findOne({ email, password })

    if (!user) {
      return { success: false, error: "Invalid credentials" }
    }

    const cookieStore = await cookies()
    cookieStore.set("userId", user._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    })

    return { 
      success: true, 
      user: { 
        id: user._id.toString(), 
        name: user.name, 
        email: user.email,
        avatar: user.avatar 
      } 
    }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, error: "Login failed" }
  }
}

export async function logoutUser() {
  const cookieStore = await cookies()
  cookieStore.delete("userId")
  return { success: true }
}

export async function getUserSession() {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value

    if (!userId) {
      return null
    }

    await dbConnect()
    const user = await User.findById(userId).select("-password").populate("adminId", "paymentMethods")

    if (!user) {
      return null
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      bio: user.bio,
      avatar: user.avatar,
      adminId: user.adminId,
      donations: user.donations,
    }
  } catch (error) {
    console.error("Get user session error:", error)
    return null
  }
}

export async function updateUserProfile(data: {
  name?: string
  email?: string
  phone?: string
  address?: string
  bio?: string
}) {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value

    if (!userId) {
      return { success: false, error: "Not authenticated" }
    }

    await dbConnect()
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: data },
      { new: true }
    ).select("-password")

    if (!user) {
      return { success: false, error: "User not found" }
    }

    return { success: true, user }
  } catch (error) {
    console.error("Update profile error:", error)
    return { success: false, error: "Update failed" }
  }
}
