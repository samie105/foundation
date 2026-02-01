"use client"

import { useState, useEffect, Suspense } from "react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import {
  HeartCheckIcon,
  ArrowLeft02Icon,
  ArrowRight02Icon,
  Copy01Icon,
  CheckmarkCircle02Icon,
  Upload04Icon,
  InformationCircleIcon,
  BankIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/layout/navbar"
import { getUserSession } from "@/lib/actions/auth"
import { getPaymentMethods, createDonation } from "@/lib/actions/admin"

const causes = [
  {
    id: "education",
    title: "Education for Children",
    description: "Providing quality education to underprivileged children, giving them the tools to build a brighter future.",
    image: "/assets/asian-beautiful-boy-charity-cheerful-child-childhood-children-color-cute-dress-education-emotion_t20_b6GeGV.jpg",
  },
  {
    id: "food-shelter",
    title: "Food & Shelter",
    description: "Ensuring no family goes hungry by providing nutritious meals and safe shelter to those in need.",
    image: "/assets/image-of-man-child-covered-in-a-blanket.png",
  },
  {
    id: "healthcare",
    title: "Healthcare Support",
    description: "Bringing essential medical care and health services to communities without access to proper healthcare.",
    image: "/assets/women-breast-cancer-support-charity-concept.jpg",
  },
  {
    id: "clean-water",
    title: "Clean Water Initiative",
    description: "Building wells and water purification systems to provide clean, safe drinking water to rural communities.",
    image: "/assets/diverse-team-of-volunteers.jpg",
  },
  {
    id: "women-empowerment",
    title: "Women Empowerment",
    description: "Supporting women through education, skill training, and micro-financing to achieve financial independence.",
    image: "/assets/women-breast-cancer-support-charity-concept.jpg",
  },
  {
    id: "emergency",
    title: "Emergency Relief Fund",
    description: "Rapid response fund for natural disasters and emergencies, providing immediate aid to affected communities.",
    image: "/assets/diverse-team-of-volunteers.jpg",
  },
  {
    id: "elderly-care",
    title: "Elderly Care Program",
    description: "Providing care, support, and companionship to senior citizens who need assistance with daily living.",
    image: "/assets/diverse-team-of-volunteers.jpg",
  },
  {
    id: "mental-health",
    title: "Mental Health Support",
    description: "Providing counseling and mental health resources to communities facing trauma and psychological challenges.",
    image: "/assets/women-breast-cancer-support-charity-concept.jpg",
  },
  {
    id: "animal-welfare",
    title: "Animal Welfare Initiative",
    description: "Rescuing and rehabilitating abandoned animals, providing shelter, medical care, and finding them loving homes.",
    image: "/assets/diverse-team-of-volunteers.jpg",
  },
  {
    id: "disaster-preparedness",
    title: "Disaster Preparedness Training",
    description: "Training communities in disaster preparedness and providing essential emergency supplies and equipment.",
    image: "/assets/diverse-team-of-volunteers.jpg",
  },
  {
    id: "general",
    title: "Where Most Needed",
    description: "Let us allocate your donation where it's needed most. We'll ensure maximum impact across all our programs.",
    image: "/assets/diverse-team-of-volunteers.jpg",
  },
]

const cryptoOptions = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC", icon: "/assets/crypto/bitcoin.svg" },
  { id: "ethereum", name: "Ethereum", symbol: "ETH", icon: "/assets/crypto/ethereum.svg" },
  { id: "usdt", name: "Tether", symbol: "USDT", icon: "/assets/crypto/usdt.svg" },
  { id: "bnb", name: "BNB", symbol: "BNB", icon: "/assets/crypto/bnb.svg" },
  { id: "solana", name: "Solana", symbol: "SOL", icon: "/assets/crypto/solana.svg" },
  { id: "xrp", name: "XRP", symbol: "XRP", icon: "/assets/crypto/xrp.svg" },
]

type CryptoId = "bitcoin" | "ethereum" | "usdt" | "bnb" | "solana" | "xrp"

const predefinedAmounts = [5, 15, 30, 50, 75, 150]

function DonateForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const causeParam = searchParams.get("cause")
  
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null)
  const [paymentMethods, setPaymentMethods] = useState<{
    bankTransfer?: { bankName: string; accountNumber: string; accountName: string; routingNumber?: string }
    crypto?: Partial<Record<CryptoId, { address: string; qrImage?: string }>>
  } | null>(null)

  // Form state
  const [selectedCause, setSelectedCause] = useState<string>("")
  const [amount, setAmount] = useState<number>(0)
  const [customAmount, setCustomAmount] = useState<string>("")
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "crypto">("bank")
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoId | "">("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [proofFile, setProofFile] = useState<File | null>(null)
  const [proofPreview, setProofPreview] = useState<string>("")
  const [copied, setCopied] = useState<string>("")
  const [error, setError] = useState("")

  useEffect(() => {
    const loadData = async () => {
      const [session, methodsResult] = await Promise.all([
        getUserSession(),
        getPaymentMethods(),
      ])
      setUser(session)
      if (methodsResult.success && methodsResult.paymentMethods) {
        setPaymentMethods(methodsResult.paymentMethods)
      }
      
      // Check for cause parameter and auto-select if valid
      if (causeParam) {
        const matchingCause = causes.find(c => c.id === causeParam)
        if (matchingCause) {
          setSelectedCause(causeParam)
          // Auto-proceed to step 2 (amount selection)
          setStep(2)
        }
      }
      
      setIsLoading(false)
    }
    loadData()
  }, [causeParam])

  const handleCopyAddress = (address: string, type: string) => {
    navigator.clipboard.writeText(address)
    setCopied(type)
    setTimeout(() => setCopied(""), 2000)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProofFile(file)
      const reader = new FileReader()
      reader.onload = () => {
        setProofPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    if (!user) {
      router.push("/auth/login?redirect=/donate")
      return
    }

    if (paymentMethod === "crypto" && !proofFile) {
      setError("Please upload payment proof screenshot")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      let proofUrl = ""
      if (proofFile) {
        const formData = new FormData()
        formData.append("file", proofFile)
        formData.append("upload_preset", "ml_default")
        formData.append("folder", "donation_proofs")

        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: "POST", body: formData }
        )
        const uploadData = await uploadRes.json()
        proofUrl = uploadData.secure_url
      }

      const result = await createDonation({
        userId: user.id,
        cause: selectedCause,
        amount: amount || parseFloat(customAmount),
        paymentMethod: paymentMethod === "crypto" ? "crypto" : "bank_transfer",
        cryptoType: paymentMethod === "crypto" && selectedCrypto ? selectedCrypto : undefined,
        paymentProof: proofUrl,
        isAnonymous,
      })

      if (result.success) {
        router.push("/dashboard/donations?success=true")
      } else {
        setError(result.error || "Failed to submit donation")
      }
    } catch {
      setError("Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedCauseData = causes.find((c) => c.id === selectedCause)
  const finalAmount = amount || parseFloat(customAmount) || 0
  const selectedCryptoData = cryptoOptions.find((c) => c.id === selectedCrypto)
  const cryptoDetails = paymentMethods?.crypto?.[selectedCrypto as CryptoId]

  const canProceed = () => {
    if (step === 1) return !!selectedCause
    if (step === 2) return finalAmount > 0
    if (step === 3) {
      if (paymentMethod === "crypto") return !!selectedCrypto && !!proofFile
      return true
    }
    return false
  }

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Make a Donation</h1>
              <p className="text-muted-foreground">Your generosity changes lives</p>
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                    s === step
                      ? "bg-primary text-primary-foreground"
                      : s < step
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s < step ? <HugeiconsIcon icon={CheckmarkCircle02Icon} className="h-4 w-4" /> : s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Step 1: Choose Cause */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-foreground">Choose a Cause</h2>
              <p className="text-muted-foreground">Select the cause you&apos;d like to support</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {causes.map((cause) => (
                <div
                  key={cause.id}
                  onClick={() => setSelectedCause(cause.id)}
                  className={`group relative cursor-pointer overflow-hidden rounded-2xl transition-all hover:shadow-xl ${
                    selectedCause === cause.id
                      ? "ring-4 ring-primary ring-offset-2 ring-offset-background"
                      : "hover:ring-2 hover:ring-primary/50"
                  }`}
                >
                  {/* Background Image */}
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={cause.image}
                      alt={cause.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Dark Overlay with Blur */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 backdrop-blur-[2px]" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-5">
                      <h3 className="mb-2 text-lg font-bold text-white">{cause.title}</h3>
                      <p className="text-sm text-white/80 line-clamp-2">{cause.description}</p>
                      {selectedCause === cause.id && (
                        <div className="mt-3 flex items-center gap-2 text-sm font-medium text-primary">
                          <HugeiconsIcon icon={CheckmarkCircle02Icon} className="h-5 w-5" />
                          Selected
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Amount */}
        {step === 2 && (
          <div className="mx-auto max-w-xl space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-foreground">Choose Amount</h2>
              <p className="text-muted-foreground">Select or enter your monthly donation amount</p>
            </div>

            {selectedCauseData && (
              <div className="relative overflow-hidden rounded-2xl">
                <div className="relative h-24">
                  <Image
                    src={selectedCauseData.image}
                    alt={selectedCauseData.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 backdrop-blur-[2px]" />
                  <div className="absolute inset-0 flex items-center gap-4 p-4">
                    <div>
                      <p className="text-sm text-white/70">Donating to</p>
                      <p className="text-lg font-bold text-white">{selectedCauseData.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-3 gap-3">
              {predefinedAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => {
                    setAmount(amt)
                    setCustomAmount("")
                  }}
                  className={`rounded-xl border-2 py-4 text-lg font-semibold transition-all ${
                    amount === amt && !customAmount
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:border-primary/50"
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-semibold text-muted-foreground">
                $
              </span>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value)
                  setAmount(0)
                }}
                placeholder="Custom amount"
                className="w-full rounded-xl border-2 border-border bg-card py-4 pl-10 pr-4 text-2xl font-semibold text-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-card p-4">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="h-5 w-5 rounded border-border text-primary"
              />
              <div>
                <p className="font-medium text-foreground">Make anonymous</p>
                <p className="text-sm text-muted-foreground">Your name won&apos;t be displayed publicly</p>
              </div>
            </label>

            <div className="flex items-center gap-2 rounded-xl bg-muted/50 p-4">
              <HugeiconsIcon icon={InformationCircleIcon} className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                All donations are monthly recurring contributions
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div className="mx-auto max-w-2xl space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-foreground">Payment Method</h2>
              <p className="text-muted-foreground">Choose how you&apos;d like to complete your donation</p>
            </div>

            {/* Summary Card */}
            {selectedCauseData && (
              <div className="relative overflow-hidden rounded-2xl">
                <div className="relative h-28">
                  <Image
                    src={selectedCauseData.image}
                    alt={selectedCauseData.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50 backdrop-blur-[2px]" />
                  <div className="absolute inset-0 flex items-center justify-between p-5">
                    <div>
                      <p className="text-lg font-bold text-white">{selectedCauseData.title}</p>
                      <p className="text-sm text-white/70">Monthly donation</p>
                    </div>
                    <p className="text-3xl font-bold text-white">${finalAmount}<span className="text-lg text-white/70">/mo</span></p>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Method Selection */}
            <div className="grid gap-4 sm:grid-cols-2">
              <button
                onClick={() => setPaymentMethod("bank")}
                className={`flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${
                  paymentMethod === "bank"
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                  <HugeiconsIcon icon={BankIcon} className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Bank Transfer</p>
                  <p className="text-sm text-muted-foreground">Direct bank deposit</p>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod("crypto")}
                className={`flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${
                  paymentMethod === "crypto"
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10">
                  <Image
                    src="/assets/crypto/bitcoin.svg"
                    alt="Crypto"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Cryptocurrency</p>
                  <p className="text-sm text-muted-foreground">Bitcoin, ETH, USDT & more</p>
                </div>
              </button>
            </div>

            {/* Bank Transfer Details */}
            {paymentMethod === "bank" && paymentMethods?.bankTransfer && (
              <Card>
                <CardContent className="space-y-4 p-6">
                  <h3 className="font-semibold text-foreground">Bank Transfer Details</h3>
                  <p className="text-sm text-muted-foreground">
                    Transfer ${finalAmount} to the following account and keep your receipt
                  </p>

                  <div className="space-y-3 rounded-xl bg-muted/50 p-4">
                    {[
                      { label: "Bank Name", value: paymentMethods.bankTransfer.bankName },
                      { label: "Account Name", value: paymentMethods.bankTransfer.accountName },
                      { label: "Account Number", value: paymentMethods.bankTransfer.accountNumber },
                      ...(paymentMethods.bankTransfer.routingNumber
                        ? [{ label: "Routing Number", value: paymentMethods.bankTransfer.routingNumber }]
                        : []),
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{item.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">{item.value}</span>
                          <button
                            onClick={() => handleCopyAddress(item.value, item.label)}
                            className="rounded p-1 hover:bg-muted"
                          >
                            {copied === item.label ? (
                              <HugeiconsIcon icon={CheckmarkCircle02Icon} className="h-4 w-4 text-green-500" />
                            ) : (
                              <HugeiconsIcon icon={Copy01Icon} className="h-4 w-4 text-muted-foreground" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start gap-2 rounded-lg bg-yellow-500/10 p-3">
                    <HugeiconsIcon
                      icon={InformationCircleIcon}
                      className="mt-0.5 h-5 w-5 text-yellow-600"
                    />
                    <p className="text-sm text-yellow-700 dark:text-yellow-500">
                      After transferring, your donation will be confirmed once we verify the payment
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Crypto Selection */}
            {paymentMethod === "crypto" && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                  {cryptoOptions.map((crypto) => (
                    <button
                      key={crypto.id}
                      onClick={() => setSelectedCrypto(crypto.id as CryptoId)}
                      className={`flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all ${
                        selectedCrypto === crypto.id
                          ? "border-primary bg-primary/5"
                          : "border-border bg-card hover:border-primary/50"
                      }`}
                    >
                      <Image
                        src={crypto.icon}
                        alt={crypto.name}
                        width={32}
                        height={32}
                        className="h-8 w-8"
                      />
                      <span className="text-xs font-medium text-foreground">{crypto.symbol}</span>
                    </button>
                  ))}
                </div>

                {/* Crypto Details */}
                {selectedCrypto && cryptoDetails && (
                  <Card>
                    <CardContent className="space-y-4 p-6">
                      <div className="flex items-center gap-3">
                        <Image
                          src={selectedCryptoData?.icon || ""}
                          alt={selectedCryptoData?.name || ""}
                          width={32}
                          height={32}
                        />
                        <h3 className="font-semibold text-foreground">
                          Send {selectedCryptoData?.name}
                        </h3>
                      </div>

                      {cryptoDetails.qrImage && (
                        <div className="flex justify-center">
                          <Image
                            src={cryptoDetails.qrImage}
                            alt="QR Code"
                            width={180}
                            height={180}
                            className="rounded-xl"
                          />
                        </div>
                      )}

                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Wallet Address</p>
                        <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3">
                          <code className="flex-1 break-all text-sm text-foreground">
                            {cryptoDetails.address}
                          </code>
                          <button
                            onClick={() => handleCopyAddress(cryptoDetails.address, "crypto")}
                            className="rounded p-1 hover:bg-muted"
                          >
                            {copied === "crypto" ? (
                              <HugeiconsIcon icon={CheckmarkCircle02Icon} className="h-5 w-5 text-green-500" />
                            ) : (
                              <HugeiconsIcon icon={Copy01Icon} className="h-5 w-5 text-muted-foreground" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Upload Proof */}
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">
                          Upload Payment Screenshot <span className="text-destructive">*</span>
                        </p>
                        {proofPreview ? (
                          <div className="relative">
                            <Image
                              src={proofPreview}
                              alt="Proof"
                              width={400}
                              height={300}
                              className="mx-auto max-h-48 rounded-xl object-contain"
                            />
                            <button
                              onClick={() => {
                                setProofFile(null)
                                setProofPreview("")
                              }}
                              className="absolute right-2 top-2 rounded-full bg-destructive p-1 text-destructive-foreground"
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border p-8 hover:border-primary/50">
                            <HugeiconsIcon
                              icon={Upload04Icon}
                              className="mb-2 h-8 w-8 text-muted-foreground"
                            />
                            <span className="text-sm text-muted-foreground">
                              Click to upload screenshot
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {error && (
              <div className="rounded-xl bg-destructive/10 p-4 text-center text-destructive">
                {error}
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          {step > 1 ? (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="gap-2"
            >
              <HugeiconsIcon icon={ArrowLeft02Icon} className="h-4 w-4" />
              Back
            </Button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="gap-2"
            >
              Continue
              <HugeiconsIcon icon={ArrowRight02Icon} className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed() || isSubmitting}
              className="gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Processing...
                </>
              ) : (
                <>
                  <HugeiconsIcon icon={HeartCheckIcon} className="h-5 w-5" />
                  Complete Donation
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

export default function DonatePage() {
  return (
    <Suspense fallback={
      <>
        <Navbar />
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </>
    }>
      <DonateForm />
    </Suspense>
  )
}
