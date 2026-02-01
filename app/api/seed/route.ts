import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Admin from "@/lib/models/Admin"

const adminData = {
  username: "admin.eric@secure.encryption",
  password: "AdminEric99$ecure@nodemailer.encrypted",
  paymentMethods: {
    bankTransfer: {
      bankName: "Chase Bank",
      accountNumber: "4829103847291038",
      accountName: "Hope Foundation International",
      routingNumber: "021000021",
    },
    crypto: {
      bitcoin: {
        address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
        qrImage: "",
      },
      ethereum: {
        address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
        qrImage: "",
      },
      usdt: {
        address: "TKFYqBHHvuaxC8FLNV3GhvPFFP8yGLx9JM",
        qrImage: "",
      },
      bnb: {
        address: "bnb1grpf0955h0ykzq3ar5nmum7y6gdfl6lxfn46h2",
        qrImage: "",
      },
      solana: {
        address: "DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK",
        qrImage: "",
      },
      xrp: {
        address: "rN7n3473SaZBCG4dFL83w7a1RXtXtbk2D9",
        qrImage: "",
      },
    },
  },
}

export async function GET() {
  try {
    await dbConnect()
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: adminData.username })
    
    if (existingAdmin) {
      // Update payment methods
      existingAdmin.paymentMethods = adminData.paymentMethods
      await existingAdmin.save()
      return NextResponse.json({ 
        success: true, 
        message: "Admin already exists, payment methods updated",
        adminId: existingAdmin._id.toString()
      })
    }
    
    // Create new admin
    const admin = await Admin.create(adminData)
    
    return NextResponse.json({ 
      success: true, 
      message: "Admin seeded successfully",
      adminId: admin._id.toString()
    })
  } catch (error) {
    console.error("Seed error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to seed database" },
      { status: 500 }
    )
  }
}
