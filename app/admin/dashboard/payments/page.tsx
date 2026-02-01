"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {
  CreditCardIcon,
  CheckmarkCircle02Icon,
  Upload04Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { getAdminSession } from "@/lib/actions/auth"
import { updateAdminPaymentMethods } from "@/lib/actions/admin"

const cryptoOptions = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC", icon: "/assets/crypto/bitcoin.svg" },
  { id: "ethereum", name: "Ethereum", symbol: "ETH", icon: "/assets/crypto/ethereum.svg" },
  { id: "usdt", name: "Tether", symbol: "USDT", icon: "/assets/crypto/usdt.svg" },
  { id: "bnb", name: "BNB", symbol: "BNB", icon: "/assets/crypto/bnb.svg" },
  { id: "solana", name: "Solana", symbol: "SOL", icon: "/assets/crypto/solana.svg" },
  { id: "xrp", name: "XRP", symbol: "XRP", icon: "/assets/crypto/xrp.svg" },
]

type CryptoId = "bitcoin" | "ethereum" | "usdt" | "bnb" | "solana" | "xrp"

export default function AdminPaymentsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })
  const [bankTransfer, setBankTransfer] = useState({
    bankName: "",
    accountNumber: "",
    accountName: "",
    routingNumber: "",
  })
  const [crypto, setCrypto] = useState<Record<CryptoId, { address: string; qrImage: string }>>({
    bitcoin: { address: "", qrImage: "" },
    ethereum: { address: "", qrImage: "" },
    usdt: { address: "", qrImage: "" },
    bnb: { address: "", qrImage: "" },
    solana: { address: "", qrImage: "" },
    xrp: { address: "", qrImage: "" },
  })

  useEffect(() => {
    const loadPaymentMethods = async () => {
      const session = await getAdminSession()
      if (session?.paymentMethods) {
        if (session.paymentMethods.bankTransfer) {
          setBankTransfer({
            bankName: session.paymentMethods.bankTransfer.bankName || "",
            accountNumber: session.paymentMethods.bankTransfer.accountNumber || "",
            accountName: session.paymentMethods.bankTransfer.accountName || "",
            routingNumber: session.paymentMethods.bankTransfer.routingNumber || "",
          })
        }
        if (session.paymentMethods.crypto) {
          const cryptoData = session.paymentMethods.crypto
          setCrypto({
            bitcoin: { address: cryptoData.bitcoin?.address || "", qrImage: cryptoData.bitcoin?.qrImage || "" },
            ethereum: { address: cryptoData.ethereum?.address || "", qrImage: cryptoData.ethereum?.qrImage || "" },
            usdt: { address: cryptoData.usdt?.address || "", qrImage: cryptoData.usdt?.qrImage || "" },
            bnb: { address: cryptoData.bnb?.address || "", qrImage: cryptoData.bnb?.qrImage || "" },
            solana: { address: cryptoData.solana?.address || "", qrImage: cryptoData.solana?.qrImage || "" },
            xrp: { address: cryptoData.xrp?.address || "", qrImage: cryptoData.xrp?.qrImage || "" },
          })
        }
      }
      setIsLoading(false)
    }
    loadPaymentMethods()
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    setMessage({ type: "", text: "" })

    const result = await updateAdminPaymentMethods({
      bankTransfer,
      crypto,
    })

    if (result.success) {
      setMessage({ type: "success", text: "Payment methods updated successfully!" })
    } else {
      setMessage({ type: "error", text: result.error || "Failed to update" })
    }

    setIsSaving(false)
  }

  const handleQRUpload = async (cryptoId: CryptoId, file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "ml_default")

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      )
      const data = await res.json()
      if (data.secure_url) {
        setCrypto((prev) => ({
          ...prev,
          [cryptoId]: { ...prev[cryptoId], qrImage: data.secure_url },
        }))
      }
    } catch (error) {
      console.error("Upload error:", error)
    }
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

      {/* Bank Transfer */}
      <Card className="border-0 shadow-sm ring-1 ring-border/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <HugeiconsIcon icon={CreditCardIcon} className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Bank Transfer</CardTitle>
              <CardDescription>Configure bank transfer details</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Bank Name</label>
              <input
                type="text"
                value={bankTransfer.bankName}
                onChange={(e) => setBankTransfer({ ...bankTransfer, bankName: e.target.value })}
                placeholder="e.g., Chase Bank"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Account Name</label>
              <input
                type="text"
                value={bankTransfer.accountName}
                onChange={(e) => setBankTransfer({ ...bankTransfer, accountName: e.target.value })}
                placeholder="e.g., Hope Foundation Inc."
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Account Number</label>
              <input
                type="text"
                value={bankTransfer.accountNumber}
                onChange={(e) => setBankTransfer({ ...bankTransfer, accountNumber: e.target.value })}
                placeholder="e.g., 1234567890"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Routing Number (Optional)</label>
              <input
                type="text"
                value={bankTransfer.routingNumber}
                onChange={(e) => setBankTransfer({ ...bankTransfer, routingNumber: e.target.value })}
                placeholder="e.g., 021000021"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Crypto Wallets */}
      <Card className="border-0 shadow-sm ring-1 ring-border/50">
        <CardHeader>
          <CardTitle>Cryptocurrency Wallets</CardTitle>
          <CardDescription>Add wallet addresses and QR codes for each cryptocurrency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cryptoOptions.map((option) => (
              <div
                key={option.id}
                className="rounded-xl border border-border p-4 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Image
                      src={option.icon}
                      alt={option.name}
                      width={24}
                      height={24}
                      className="h-6 w-6"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{option.name}</p>
                    <p className="text-xs text-muted-foreground">{option.symbol}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">Wallet Address</label>
                  <input
                    type="text"
                    value={crypto[option.id as CryptoId].address}
                    onChange={(e) =>
                      setCrypto((prev) => ({
                        ...prev,
                        [option.id]: { ...prev[option.id as CryptoId], address: e.target.value },
                      }))
                    }
                    placeholder="Enter wallet address"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">QR Code</label>
                  {crypto[option.id as CryptoId].qrImage ? (
                    <div className="relative">
                      <Image
                        src={crypto[option.id as CryptoId].qrImage}
                        alt={`${option.name} QR Code`}
                        width={150}
                        height={150}
                        className="mx-auto rounded-lg"
                      />
                      <button
                        onClick={() =>
                          setCrypto((prev) => ({
                            ...prev,
                            [option.id]: { ...prev[option.id as CryptoId], qrImage: "" },
                          }))
                        }
                        className="absolute top-1 right-1 rounded-full bg-destructive p-1 text-destructive-foreground"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-4 hover:border-primary/50">
                      <HugeiconsIcon icon={Upload04Icon} className="h-6 w-6 text-muted-foreground" />
                      <span className="mt-2 text-xs text-muted-foreground">Upload QR Code</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleQRUpload(option.id as CryptoId, file)
                        }}
                      />
                    </label>
                  )}
                </div>
              </div>
            ))}
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
              Save Payment Methods
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
