import mongoose, { Schema, Document, Model } from "mongoose"

export interface IAdmin extends Document {
  _id: mongoose.Types.ObjectId
  username: string
  password: string
  paymentMethods: {
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
  }
  createdAt: Date
  updatedAt: Date
}

const AdminSchema = new Schema<IAdmin>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    paymentMethods: {
      bankTransfer: {
        bankName: String,
        accountNumber: String,
        accountName: String,
        routingNumber: String,
      },
      crypto: {
        bitcoin: { address: String, qrImage: String },
        ethereum: { address: String, qrImage: String },
        usdt: { address: String, qrImage: String },
        bnb: { address: String, qrImage: String },
        solana: { address: String, qrImage: String },
        xrp: { address: String, qrImage: String },
      },
    },
  },
  {
    timestamps: true,
  }
)

const Admin: Model<IAdmin> = mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema)

export default Admin
