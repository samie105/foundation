import mongoose, { Schema, Document, Model } from "mongoose"

export interface IDonation {
  _id?: string
  cause: string
  amount: number
  paymentMethod: "bank_transfer" | "crypto"
  cryptoType?: "bitcoin" | "ethereum" | "usdt" | "bnb" | "solana" | "xrp"
  paymentProof?: string // Cloudinary URL for crypto screenshots
  status: "pending" | "confirmed" | "rejected"
  isAnonymous: boolean
  createdAt: Date
}

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId
  name: string
  email: string
  password: string
  phone?: string
  address?: string
  bio?: string
  avatar?: string
  adminId: mongoose.Types.ObjectId // Links user to admin
  donations: IDonation[]
  createdAt: Date
  updatedAt: Date
}

const DonationSchema = new Schema<IDonation>(
  {
    cause: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["bank_transfer", "crypto"], required: true },
    cryptoType: { 
      type: String, 
      enum: ["bitcoin", "ethereum", "usdt", "bnb", "solana", "xrp"],
    },
    paymentProof: String,
    status: { 
      type: String, 
      enum: ["pending", "confirmed", "rejected"], 
      default: "pending" 
    },
    isAnonymous: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  }
)

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: String,
    address: String,
    bio: String,
    avatar: {
      type: String,
      default: "/assets/team-members/1.jpg",
    },
    adminId: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    donations: [DonationSchema],
  },
  {
    timestamps: true,
  }
)

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema)

export default User
