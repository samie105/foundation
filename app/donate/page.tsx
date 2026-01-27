"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  CreditCardIcon,
  CheckmarkCircle02Icon,
  ArrowLeft01Icon,
  ShieldCheck,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

const causes = [
  { id: "1", name: "Education for Children", image: "/assets/asian-beautiful-boy-charity-cheerful-child-childhood-children-color-cute-dress-education-emotion_t20_b6GeGV.jpg" },
  { id: "2", name: "Food & Shelter", image: "/assets/image-of-man-child-covered-in-a-blanket.png" },
  { id: "3", name: "Healthcare Support", image: "/assets/women-breast-cancer-support-charity-concept.jpg" },
  { id: "general", name: "Where Most Needed", image: "/assets/diverse-team-of-volunteers.jpg" },
]

const amounts = [25, 50, 100, 250, 500, 1000]

export default function DonatePage() {
  const [step, setStep] = useState(1)
  const [selectedCause, setSelectedCause] = useState("general")
  const [amount, setAmount] = useState(100)
  const [customAmount, setCustomAmount] = useState("")
  const [isRecurring, setIsRecurring] = useState(false)
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleAmountSelect = (value: number) => {
    setAmount(value)
    setCustomAmount("")
  }

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value)
    if (value) {
      setAmount(parseInt(value) || 0)
    }
  }

  const handleSubmit = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setIsComplete(true)
  }

  const finalAmount = customAmount ? parseInt(customAmount) || 0 : amount
  const selectedCauseData = causes.find((c) => c.id === selectedCause)

  if (isComplete) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-muted/30 px-4 py-12">
          <Card className="max-w-md border-0 text-center shadow-xl ring-1 ring-border/50">
            <CardContent className="p-8">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <HugeiconsIcon icon={CheckmarkCircle02Icon} className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="mt-6 text-2xl font-bold text-foreground">Thank You!</h2>
              <p className="mt-2 text-muted-foreground">
                Your donation of <span className="font-semibold text-primary">${finalAmount}</span> has
                been successfully processed.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                A confirmation email has been sent to your inbox. Your generosity will help make a
                real difference in people&apos;s lives.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <Link href="/dashboard">
                  <Button className="w-full rounded-full">View in Dashboard</Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full rounded-full">
                    Return Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)] bg-muted/30 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <Link
              href="/"
              className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              Make a <span className="text-primary">Donation</span>
            </h1>
            <p className="mt-2 text-muted-foreground">
              Your contribution helps us create lasting change
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8 flex items-center justify-center gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                    step >= s
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`h-0.5 w-12 rounded-full transition-colors ${
                      step > s ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <Card className="border-0 shadow-xl ring-1 ring-border/50">
            <CardContent className="p-6 sm:p-8">
              {/* Step 1: Select Cause */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <CardTitle>Choose a Cause</CardTitle>
                    <CardDescription>
                      Select where you&apos;d like your donation to go
                    </CardDescription>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {causes.map((cause) => (
                      <button
                        key={cause.id}
                        onClick={() => setSelectedCause(cause.id)}
                        className={`relative overflow-hidden rounded-xl border-2 p-1 text-left transition-all ${
                          selectedCause === cause.id
                            ? "border-primary ring-2 ring-primary/20"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                          <Image
                            src={cause.image}
                            alt={cause.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3">
                            <p className="font-semibold text-white">{cause.name}</p>
                          </div>
                        </div>
                        {selectedCause === cause.id && (
                          <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                            <HugeiconsIcon
                              icon={CheckmarkCircle02Icon}
                              className="h-4 w-4 text-primary-foreground"
                            />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  <Button className="w-full rounded-full" size="lg" onClick={() => setStep(2)}>
                    Continue
                  </Button>
                </div>
              )}

              {/* Step 2: Select Amount */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <CardTitle>Select Amount</CardTitle>
                    <CardDescription>
                      Choose or enter your donation amount
                    </CardDescription>
                  </div>

                  {/* Amount Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    {amounts.map((a) => (
                      <button
                        key={a}
                        onClick={() => handleAmountSelect(a)}
                        className={`rounded-xl border-2 py-4 text-center font-semibold transition-all ${
                          amount === a && !customAmount
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        ${a}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Or enter a custom amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                        $
                      </span>
                      <input
                        type="number"
                        placeholder="Enter amount"
                        value={customAmount}
                        onChange={(e) => handleCustomAmount(e.target.value)}
                        className="w-full rounded-xl border border-input bg-background py-3 pl-8 pr-4 text-lg focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  {/* Recurring Option */}
                  <div className="flex items-center justify-between rounded-xl bg-muted/50 p-4">
                    <div>
                      <p className="font-medium text-foreground">Make this a monthly donation</p>
                      <p className="text-sm text-muted-foreground">
                        Help us plan for the future
                      </p>
                    </div>
                    <button
                      onClick={() => setIsRecurring(!isRecurring)}
                      className={`relative h-6 w-11 rounded-full transition-colors ${
                        isRecurring ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                          isRecurring ? "left-6" : "left-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 rounded-full" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button
                      className="flex-1 rounded-full"
                      onClick={() => setStep(3)}
                      disabled={finalAmount < 1}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <CardTitle>Complete Your Donation</CardTitle>
                    <CardDescription>Enter your information</CardDescription>
                  </div>

                  {/* Summary */}
                  <div className="rounded-xl bg-primary/5 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                          <Image
                            src={selectedCauseData?.image || ""}
                            alt={selectedCauseData?.name || ""}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {selectedCauseData?.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {isRecurring ? "Monthly donation" : "One-time donation"}
                          </p>
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-primary">${finalAmount}</p>
                    </div>
                  </div>

                  {/* Donor Info */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Full Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={donorInfo.name}
                        onChange={(e) =>
                          setDonorInfo({ ...donorInfo, name: e.target.value })
                        }
                        disabled={isAnonymous}
                        className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Email Address</label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={donorInfo.email}
                        onChange={(e) =>
                          setDonorInfo({ ...donorInfo, email: e.target.value })
                        }
                        className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Message (Optional)
                      </label>
                      <textarea
                        placeholder="Leave a message of support..."
                        rows={3}
                        value={donorInfo.message}
                        onChange={(e) =>
                          setDonorInfo({ ...donorInfo, message: e.target.value })
                        }
                        className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  {/* Anonymous Option */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="h-4 w-4 rounded border-input accent-primary"
                    />
                    <label htmlFor="anonymous" className="text-sm text-muted-foreground">
                      Make my donation anonymous
                    </label>
                  </div>

                  {/* Security Badge */}
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <HugeiconsIcon icon={ShieldCheck} className="h-4 w-4" />
                    <span>Secure payment powered by Stripe</span>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 rounded-full" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button
                      className="flex-1 gap-2 rounded-full"
                      onClick={handleSubmit}
                      disabled={isProcessing || !donorInfo.email}
                    >
                      {isProcessing ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <HugeiconsIcon icon={CreditCardIcon} className="h-4 w-4" />
                          Donate ${finalAmount}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}
