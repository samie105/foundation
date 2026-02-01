import dbConnect from "./mongodb"
import Admin from "./models/Admin"

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

export async function seedAdmin() {
  try {
    await dbConnect()
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: adminData.username })
    
    if (existingAdmin) {
      console.log("Admin already exists, updating payment methods...")
      existingAdmin.paymentMethods = adminData.paymentMethods
      await existingAdmin.save()
      console.log("Admin payment methods updated successfully!")
      return { success: true, admin: existingAdmin, updated: true }
    }
    
    // Create new admin
    const admin = await Admin.create(adminData)
    console.log("Admin seeded successfully!")
    console.log("Username:", admin.username)
    console.log("Admin ID:", admin._id.toString())
    
    return { success: true, admin, updated: false }
  } catch (error) {
    console.error("Seed error:", error)
    return { success: false, error }
  }
}

// Run if called directly
if (require.main === module) {
  seedAdmin().then((result) => {
    if (result.success) {
      console.log("\n✅ Seed completed successfully!")
    } else {
      console.log("\n❌ Seed failed!")
    }
    process.exit(result.success ? 0 : 1)
  })
}
