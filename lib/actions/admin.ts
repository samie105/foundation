"use server"

import { cookies } from "next/headers"
import dbConnect from "@/lib/mongodb"
import Admin from "@/lib/models/Admin"
import User, { IDonation } from "@/lib/models/User"

// Get all users for an admin
export async function getAdminUsers() {
  try {
    const cookieStore = await cookies()
    const adminId = cookieStore.get("adminId")?.value

    if (!adminId) {
      return { success: false, error: "Not authenticated" }
    }

    await dbConnect()
    const users = await User.find({ adminId }).select("-password").sort({ createdAt: -1 }).lean()

    return { 
      success: true, 
      users: users.map(user => ({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        avatar: user.avatar,
        donations: user.donations?.map((d: any) => ({
          ...d,
          _id: d._id?.toString(),
          createdAt: d.createdAt instanceof Date ? d.createdAt.toISOString() : d.createdAt,
        })),
        createdAt: user.createdAt instanceof Date ? user.createdAt.toISOString() : user.createdAt,
      }))
    }
  } catch (error) {
    console.error("Get admin users error:", error)
    return { success: false, error: "Failed to fetch users" }
  }
}

// Update admin payment methods
export async function updateAdminPaymentMethods(paymentMethods: {
  bankTransfer?: {
    bankName: string
    accountNumber: string
    accountName: string
    routingNumber?: string
  }
  crypto?: {
    bitcoin?: { address: string; qrImage?: string }
    ethereum?: { address: string; qrImage?: string }
    usdt?: { address: string; qrImage?: string }
    bnb?: { address: string; qrImage?: string }
    solana?: { address: string; qrImage?: string }
    xrp?: { address: string; qrImage?: string }
  }
}) {
  try {
    const cookieStore = await cookies()
    const adminId = cookieStore.get("adminId")?.value

    if (!adminId) {
      return { success: false, error: "Not authenticated" }
    }

    await dbConnect()
    const admin = await Admin.findByIdAndUpdate(
      adminId,
      { $set: { paymentMethods } },
      { new: true }
    ).select("-password")

    if (!admin) {
      return { success: false, error: "Admin not found" }
    }

    return { success: true, paymentMethods: admin.paymentMethods }
  } catch (error) {
    console.error("Update payment methods error:", error)
    return { success: false, error: "Update failed" }
  }
}

// Update user donation status (admin only)
export async function updateDonationStatus(
  userId: string,
  donationId: string,
  status: "pending" | "confirmed" | "rejected"
) {
  try {
    const cookieStore = await cookies()
    const adminId = cookieStore.get("adminId")?.value

    if (!adminId) {
      return { success: false, error: "Not authenticated" }
    }

    await dbConnect()
    const user = await User.findOneAndUpdate(
      { 
        _id: userId, 
        adminId,
        "donations._id": donationId 
      },
      { $set: { "donations.$.status": status } },
      { new: true }
    )

    if (!user) {
      return { success: false, error: "User or donation not found" }
    }

    return { success: true }
  } catch (error) {
    console.error("Update donation status error:", error)
    return { success: false, error: "Update failed" }
  }
}

// Delete user (admin only)
export async function deleteUser(userId: string) {
  try {
    const cookieStore = await cookies()
    const adminId = cookieStore.get("adminId")?.value

    if (!adminId) {
      return { success: false, error: "Not authenticated" }
    }

    await dbConnect()
    const user = await User.findOneAndDelete({ _id: userId, adminId })

    if (!user) {
      return { success: false, error: "User not found" }
    }

    return { success: true }
  } catch (error) {
    console.error("Delete user error:", error)
    return { success: false, error: "Delete failed" }
  }
}

// Get admin payment methods (for donation page)
export async function getPaymentMethods(adminId?: string) {
  try {
    await dbConnect()
    
    // If no adminId provided, get the first admin (for demo purposes)
    // In production, you'd want to pass the specific adminId
    let admin
    if (adminId) {
      admin = await Admin.findById(adminId).select("paymentMethods")
    } else {
      admin = await Admin.findOne().select("paymentMethods")
    }

    if (!admin) {
      return { success: false, error: "Admin not found" }
    }

    return { success: true, paymentMethods: admin.paymentMethods }
  } catch (error) {
    console.error("Get payment methods error:", error)
    return { success: false, error: "Failed to fetch payment methods" }
  }
}

// Create donation
export async function createDonation(data: {
  userId?: string
  cause: string
  amount: number
  paymentMethod: "bank_transfer" | "crypto"
  cryptoType?: "bitcoin" | "ethereum" | "usdt" | "bnb" | "solana" | "xrp"
  paymentProof?: string
  isAnonymous?: boolean
}) {
  try {
    const cookieStore = await cookies()
    const sessionUserId = data.userId || cookieStore.get("userId")?.value

    if (!sessionUserId && !data.isAnonymous) {
      return { success: false, error: "Please sign in to donate or donate anonymously" }
    }

    await dbConnect()

    const donation: IDonation = {
      cause: data.cause,
      amount: data.amount,
      paymentMethod: data.paymentMethod,
      cryptoType: data.cryptoType,
      paymentProof: data.paymentProof,
      status: "pending",
      isAnonymous: data.isAnonymous || false,
      createdAt: new Date(),
    }

    if (sessionUserId) {
      const user = await User.findByIdAndUpdate(
        sessionUserId,
        { $push: { donations: donation } },
        { new: true }
      )

      if (!user) {
        return { success: false, error: "User not found" }
      }
    }

    return { success: true, donation }
  } catch (error) {
    console.error("Create donation error:", error)
    return { success: false, error: "Donation failed" }
  }
}

// Get user donations
export async function getUserDonations(userId?: string) {
  try {
    const cookieStore = await cookies()
    const sessionUserId = userId || cookieStore.get("userId")?.value

    if (!sessionUserId) {
      return { success: false, error: "Not authenticated" }
    }

    await dbConnect()
    const user = await User.findById(sessionUserId).select("donations").lean()

    if (!user) {
      return { success: false, error: "User not found" }
    }

    return { 
      success: true, 
      donations: user.donations?.map((d: any) => ({
        ...d,
        _id: d._id?.toString(),
        createdAt: d.createdAt instanceof Date ? d.createdAt.toISOString() : d.createdAt,
      })) || []
    }
  } catch (error) {
    console.error("Get donations error:", error)
    return { success: false, error: "Failed to fetch donations" }
  }
}

// Create initial admin (for setup)
export async function createAdmin(username: string, password: string) {
  try {
    await dbConnect()

    const existingAdmin = await Admin.findOne({ username })
    if (existingAdmin) {
      return { success: false, error: "Admin already exists" }
    }

    const admin = await Admin.create({
      username,
      password,
      paymentMethods: {},
    })

    return { success: true, adminId: admin._id.toString() }
  } catch (error) {
    console.error("Create admin error:", error)
    return { success: false, error: "Failed to create admin" }
  }
}

// Update admin credentials
export async function updateAdminCredentials(data: {
  username: string
  currentPassword?: string
  newPassword?: string
}) {
  try {
    const cookieStore = await cookies()
    const adminId = cookieStore.get("adminId")?.value

    if (!adminId) {
      return { success: false, error: "Not authenticated" }
    }

    await dbConnect()
    const admin = await Admin.findById(adminId)

    if (!admin) {
      return { success: false, error: "Admin not found" }
    }

    // If changing password, verify current password
    if (data.newPassword) {
      if (!data.currentPassword) {
        return { success: false, error: "Current password is required" }
      }
      if (admin.password !== data.currentPassword) {
        return { success: false, error: "Current password is incorrect" }
      }
      admin.password = data.newPassword
    }

    // Update username
    if (data.username && data.username !== admin.username) {
      // Check if username is already taken
      const existingAdmin = await Admin.findOne({ username: data.username })
      if (existingAdmin) {
        return { success: false, error: "Username already taken" }
      }
      admin.username = data.username
    }

    await admin.save()

    return { success: true }
  } catch (error) {
    console.error("Update admin credentials error:", error)
    return { success: false, error: "Failed to update credentials" }
  }
}
