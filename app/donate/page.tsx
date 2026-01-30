"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import {
  CreditCardIcon,
  CheckmarkCircle02Icon,
  ArrowRight01Icon,
  FavouriteIcon,
  UserMultiple02Icon,
  ShieldIcon,
  Target01Icon,
  MailIcon,
  UserIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

const causes = [
  { 
    id: "education", 
    name: "Education for Children", 
    description: "Help provide quality education to underprivileged children",
    image: "/assets/asian-beautiful-boy-charity-cheerful-child-childhood-children-color-cute-dress-education-emotion_t20_b6GeGV.jpg",
    raised: 4050,
    goal: 6750,
    donors: 31,
    category: "Education"
  },
  { 
    id: "food-shelter", 
    name: "Food & Shelter", 
    description: "Provide meals and safe housing for homeless families",
    image: "/assets/image-of-man-child-covered-in-a-blanket.png",
    raised: 2565,
    goal: 4500,
    donors: 20,
    category: "Basic Needs"
  },
  { 
    id: "healthcare", 
    name: "Healthcare Support", 
    description: "Fund medical treatments for those who can't afford it",
    image: "/assets/women-breast-cancer-support-charity-concept.jpg",
    raised: 5580,
    goal: 9000,
    donors: 44,
    category: "Healthcare"
  },
  { 
    id: "clean-water", 
    name: "Clean Water Initiative", 
    description: "Build wells and water systems in rural communities",
    image: "/assets/diverse-team-of-volunteers.jpg",
    raised: 3150,
    goal: 5400,
    donors: 25,
    category: "Environment"
  },
  { 
    id: "women-empowerment", 
    name: "Women Empowerment", 
    description: "Support women through education and micro-financing",
    image: "/assets/women-breast-cancer-support-charity-concept.jpg",
    raised: 1665,
    goal: 3600,
    donors: 14,
    category: "Social"
  },
  { 
    id: "emergency", 
    name: "Emergency Relief Fund", 
    description: "Rapid response for disasters and emergencies",
    image: "/assets/diverse-team-of-volunteers.jpg",
    raised: 4680,
    goal: 7200,
    donors: 56,
    category: "Emergency"
  },
  { 
    id: "elderly-care", 
    name: "Elderly Care Program", 
    description: "Provide care and companionship for senior citizens",
    image: "/assets/diverse-team-of-volunteers.jpg",
    raised: 1980,
    goal: 4050,
    donors: 17,
    category: "Healthcare"
  },
  { 
    id: "general", 
    name: "Where Most Needed", 
    description: "Let us allocate your donation where it's needed most",
    image: "/assets/diverse-team-of-volunteers.jpg",
    raised: 11250,
    goal: 18000,
    donors: 113,
    category: "General"
  },
]

const amounts = [25, 50, 100, 250, 500, 1000]

const paymentMethods = [
  { id: "card", name: "Credit/Debit Card", icon: CreditCardIcon, description: "Visa, Mastercard, Amex" },
  { id: "paypal", name: "PayPal", icon: CreditCardIcon, description: "Fast & secure" },
  { id: "bank", name: "Bank Transfer", icon: CreditCardIcon, description: "Direct transfer" },
]

const impactExamples = [
  { amount: 25, impact: "Provides school supplies for 1 child for a month" },
  { amount: 50, impact: "Feeds a family of 4 for a week" },
  { amount: 100, impact: "Funds a medical checkup for 5 people" },
  { amount: 250, impact: "Provides clean water for a village for a month" },
  { amount: 500, impact: "Supports a child's education for 3 months" },
  { amount: 1000, impact: "Builds a water well in a rural community" },
]

function DonateContent() {
  const searchParams = useSearchParams()
  const causeFromUrl = searchParams.get("cause")
  
  const [step, setStep] = useState(1)
  const [selectedCause, setSelectedCause] = useState(causeFromUrl || "general")
  const [amount, setAmount] = useState(100)
  const [customAmount, setCustomAmount] = useState("")
  const [isRecurring, setIsRecurring] = useState(false)
  const [recurringFrequency, setRecurringFrequency] = useState<"monthly" | "quarterly" | "yearly">("monthly")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState("card")
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [cardInfo, setCardInfo] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  })
  const [dedicationType, setDedicationType] = useState<"none" | "honor" | "memory">("none")
  const [dedicationName, setDedicationName] = useState("")

  useEffect(() => {
    if (causeFromUrl && causes.find(c => c.id === causeFromUrl)) {
      setSelectedCause(causeFromUrl)
    }
  }, [causeFromUrl])

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
    await new Promise((resolve) => setTimeout(resolve, 2500))
    setIsProcessing(false)
    setIsComplete(true)
  }

  const finalAmount = customAmount ? parseInt(customAmount) || 0 : amount
  const selectedCauseData = causes.find((c) => c.id === selectedCause)
  const currentImpact = impactExamples.find(i => i.amount <= finalAmount)

  // Success Screen
  if (isComplete) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-b from-green-50 to-background dark:from-green-950/20 dark:to-background">
          <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-2xl flex-col items-center justify-center px-4 py-16">
            {/* Success Animation */}
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-green-400/30" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg shadow-green-500/30">
                <HugeiconsIcon icon={CheckmarkCircle02Icon} className="h-12 w-12 text-white" />
              </div>
            </div>

            <h1 className="mt-8 text-center text-3xl font-bold text-foreground sm:text-4xl">
              Thank You for Your Generosity!
            </h1>
            <p className="mt-4 max-w-md text-center text-lg text-muted-foreground">
              Your donation of <span className="font-bold text-primary">${finalAmount}</span> to{" "}
              <span className="font-semibold">{selectedCauseData?.name}</span> has been received.
            </p>

            {/* Donation Summary Card */}
            <Card className="mt-8 w-full max-w-md border-0 shadow-xl ring-1 ring-border/50">
              <CardContent className="p-6">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Donation Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-semibold">${finalAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cause</span>
                    <span className="font-semibold">{selectedCauseData?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-semibold">{isRecurring ? `Recurring (${recurringFrequency})` : "One-time"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Receipt #</span>
                    <span className="font-mono text-sm">HF-{Date.now().toString().slice(-8)}</span>
                  </div>
                </div>
                <div className="mt-6 rounded-lg bg-primary/5 p-4">
                  <p className="text-sm text-muted-foreground">
                    A confirmation email with your tax-deductible receipt has been sent to{" "}
                    <span className="font-medium text-foreground">{donorInfo.email}</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Impact Message */}
            <div className="mt-8 rounded-2xl bg-primary/10 p-6 text-center">
              <HugeiconsIcon icon={FavouriteIcon} className="mx-auto h-8 w-8 text-primary" />
              <p className="mt-3 text-sm text-muted-foreground">
                Your contribution helps us continue our mission of creating positive change.
                Together, we&apos;ve impacted over <span className="font-bold text-primary">485,000 lives</span>.
              </p>
            </div>

            {/* Actions */}
            <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row">
              <Link href="/dashboard" className="flex-1">
                <Button className="w-full gap-2 rounded-full" size="lg">
                  View Dashboard
                  <HugeiconsIcon icon={ArrowRight01Icon} className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full rounded-full" size="lg">
                  Return Home
                </Button>
              </Link>
            </div>

            {/* Share */}
            <p className="mt-8 text-center text-sm text-muted-foreground">
              Share your generosity and inspire others to give
            </p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-muted/30 dark:bg-background">
        {/* Hero Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background py-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <HugeiconsIcon icon={ArrowRight01Icon} className="h-4 w-4 rotate-180" />
              Back to Home
            </Link>
            <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  Make a <span className="text-primary">Donation</span>
                </h1>
                <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
                  Every donation creates ripples of change. Join thousands of generous hearts making a difference.
                </p>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <HugeiconsIcon icon={ShieldIcon} className="h-5 w-5 text-green-500" />
                  <span className="text-muted-foreground">Secure & Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <HugeiconsIcon icon={ShieldIcon} className="h-5 w-5 text-green-500" />
                  <span className="text-muted-foreground">Tax Deductible</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="mx-auto flex max-w-2xl items-center justify-between">
              {[
                { num: 1, label: "Choose Cause" },
                { num: 2, label: "Select Amount" },
                { num: 3, label: "Payment" },
              ].map((s, idx) => (
                <div key={s.num} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full border-2 text-lg font-semibold transition-all ${
                        step >= s.num
                          ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                          : "border-border bg-background text-muted-foreground"
                      }`}
                    >
                      {step > s.num ? (
                        <HugeiconsIcon icon={CheckmarkCircle02Icon} className="h-6 w-6" />
                      ) : (
                        s.num
                      )}
                    </div>
                    <span className={`mt-2 text-xs font-medium ${step >= s.num ? "text-primary" : "text-muted-foreground"}`}>
                      {s.label}
                    </span>
                  </div>
                  {idx < 2 && (
                    <div
                      className={`mx-4 hidden h-1 w-24 rounded-full sm:block lg:w-32 ${
                        step > s.num ? "bg-primary" : "bg-border"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-xl ring-1 ring-border/50">
                <CardContent className="p-6 sm:p-8">
                  {/* Step 1: Select Cause */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">Choose a Cause</h2>
                        <p className="mt-1 text-muted-foreground">
                          Select where you&apos;d like your donation to make an impact
                        </p>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        {causes.map((cause) => {
                          const progress = (cause.raised / cause.goal) * 100
                          return (
                            <button
                              key={cause.id}
                              onClick={() => setSelectedCause(cause.id)}
                              className={`group relative overflow-hidden rounded-2xl border-2 p-0 text-left transition-all duration-300 ${
                                selectedCause === cause.id
                                  ? "border-primary ring-4 ring-primary/20"
                                  : "border-border hover:border-primary/50 hover:shadow-lg"
                              }`}
                            >
                              <div className="relative aspect-[16/9] overflow-hidden">
                                <Image
                                  src={cause.image}
                                  alt={cause.name}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                
                                {/* Category Badge */}
                                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-sm dark:bg-black/50 dark:text-white">
                                  {cause.category}
                                </span>

                                {/* Selection Indicator */}
                                {selectedCause === cause.id && (
                                  <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-primary shadow-lg">
                                    <HugeiconsIcon icon={CheckmarkCircle02Icon} className="h-5 w-5 text-primary-foreground" />
                                  </div>
                                )}

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                  <h3 className="font-bold text-white">{cause.name}</h3>
                                  <p className="mt-1 line-clamp-1 text-xs text-white/80">{cause.description}</p>
                                  
                                  {/* Progress Bar */}
                                  <div className="mt-3">
                                    <div className="h-1.5 overflow-hidden rounded-full bg-white/30">
                                      <div
                                        className="h-full rounded-full bg-primary transition-all"
                                        style={{ width: `${Math.min(progress, 100)}%` }}
                                      />
                                    </div>
                                    <div className="mt-1.5 flex items-center justify-between text-xs">
                                      <span className="font-medium text-white">${cause.raised.toLocaleString()} raised</span>
                                      <span className="text-white/70 flex items-center gap-1">
                                        <HugeiconsIcon icon={UserMultiple02Icon} className="h-3 w-3" />
                                        {cause.donors}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </button>
                          )
                        })}
                      </div>

                      <Button 
                        className="w-full gap-2 rounded-full" 
                        size="lg" 
                        onClick={() => setStep(2)}
                      >
                        Continue
                        <HugeiconsIcon icon={ArrowRight01Icon} className="h-5 w-5" />
                      </Button>
                    </div>
                  )}

                  {/* Step 2: Select Amount */}
                  {step === 2 && (
                    <div className="space-y-8">
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">Select Amount</h2>
                        <p className="mt-1 text-muted-foreground">
                          Choose a preset amount or enter a custom value
                        </p>
                      </div>

                      {/* Donation Type Toggle */}
                      <div className="flex rounded-xl bg-muted/50 p-1">
                        <button
                          onClick={() => setIsRecurring(false)}
                          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                            !isRecurring
                              ? "bg-background text-foreground shadow-sm"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <HugeiconsIcon icon={FavouriteIcon} className="h-4 w-4" />
                          One-time
                        </button>
                        <button
                          onClick={() => setIsRecurring(true)}
                          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                            isRecurring
                              ? "bg-background text-foreground shadow-sm"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <HugeiconsIcon icon={Target01Icon} className="h-4 w-4" />
                          Monthly
                        </button>
                      </div>

                      {/* Amount Grid */}
                      <div className="grid grid-cols-3 gap-3">
                        {amounts.map((a) => (
                          <button
                            key={a}
                            onClick={() => handleAmountSelect(a)}
                            className={`relative rounded-xl border-2 py-5 text-center transition-all ${
                              amount === a && !customAmount
                                ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                                : "border-border bg-background hover:border-primary/50 hover:bg-muted/50"
                            }`}
                          >
                            <span className={`text-2xl font-bold ${amount === a && !customAmount ? "text-primary" : "text-foreground"}`}>
                              ${a}
                            </span>
                            {amount === a && !customAmount && (
                              <div className="absolute -right-2 -top-2">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                                  <HugeiconsIcon icon={CheckmarkCircle02Icon} className="h-4 w-4 text-primary-foreground" />
                                </div>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>

                      {/* Custom Amount */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Custom Amount</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-semibold text-muted-foreground">
                            $
                          </span>
                          <input
                            type="number"
                            placeholder="Enter amount"
                            value={customAmount}
                            onChange={(e) => handleCustomAmount(e.target.value)}
                            className="w-full rounded-xl border-2 border-border bg-background py-4 pl-10 pr-4 text-xl font-semibold transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                      </div>

                      {/* Impact Preview */}
                      {currentImpact && finalAmount > 0 && (
                        <div className="rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 p-4">
                          <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20">
                              <HugeiconsIcon icon={Target01Icon} className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">Your Impact</p>
                              <p className="text-sm text-muted-foreground">{currentImpact.impact}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Recurring Options */}
                      {isRecurring && (
                        <div className="space-y-3">
                          <label className="text-sm font-medium text-foreground">Donation Frequency</label>
                          <div className="flex gap-3">
                            {(["monthly", "quarterly", "yearly"] as const).map((freq) => (
                              <button
                                key={freq}
                                onClick={() => setRecurringFrequency(freq)}
                                className={`flex-1 rounded-lg border-2 py-3 text-sm font-medium capitalize transition-all ${
                                  recurringFrequency === freq
                                    ? "border-primary bg-primary/5 text-primary"
                                    : "border-border text-muted-foreground hover:border-primary/50"
                                }`}
                              >
                                {freq}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Dedication Option */}
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-foreground">Dedicate This Donation (Optional)</label>
                        <div className="flex gap-2">
                          {[
                            { value: "none", label: "No Dedication" },
                            { value: "honor", label: "In Honor Of" },
                            { value: "memory", label: "In Memory Of" },
                          ].map((option) => (
                            <button
                              key={option.value}
                              onClick={() => setDedicationType(option.value as typeof dedicationType)}
                              className={`flex-1 rounded-lg border-2 py-2.5 text-sm font-medium transition-all ${
                                dedicationType === option.value
                                  ? "border-primary bg-primary/5 text-primary"
                                  : "border-border text-muted-foreground hover:border-primary/50"
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                        {dedicationType !== "none" && (
                          <input
                            type="text"
                            placeholder={`Enter name (${dedicationType === "honor" ? "in honor of" : "in memory of"})`}
                            value={dedicationName}
                            onChange={(e) => setDedicationName(e.target.value)}
                            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        )}
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button variant="outline" className="flex-1 rounded-full" size="lg" onClick={() => setStep(1)}>
                          <HugeiconsIcon icon={ArrowRight01Icon} className="mr-2 h-4 w-4 rotate-180" />
                          Back
                        </Button>
                        <Button
                          className="flex-1 gap-2 rounded-full"
                          size="lg"
                          onClick={() => setStep(3)}
                          disabled={finalAmount < 1}
                        >
                          Continue
                          <HugeiconsIcon icon={ArrowRight01Icon} className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Payment */}
                  {step === 3 && (
                    <div className="space-y-8">
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">Complete Your Donation</h2>
                        <p className="mt-1 text-muted-foreground">
                          Enter your payment details securely
                        </p>
                      </div>

                      {/* Donor Info */}
                      <div className="space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                          Your Information
                        </h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Full Name *</label>
                            <input
                              type="text"
                              placeholder="John Doe"
                              value={donorInfo.name}
                              onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                              disabled={isAnonymous}
                              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Email Address *</label>
                            <input
                              type="email"
                              placeholder="john@example.com"
                              value={donorInfo.email}
                              onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Phone Number (Optional)</label>
                          <input
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={donorInfo.phone}
                            onChange={(e) => setDonorInfo({ ...donorInfo, phone: e.target.value })}
                            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            id="anonymous"
                            checked={isAnonymous}
                            onChange={(e) => setIsAnonymous(e.target.checked)}
                            className="h-5 w-5 rounded border-input accent-primary"
                          />
                          <label htmlFor="anonymous" className="text-sm text-muted-foreground">
                            Make my donation anonymous
                          </label>
                        </div>
                      </div>

                      {/* Payment Method */}
                      <div className="space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                          Payment Method
                        </h3>
                        <div className="grid gap-3 sm:grid-cols-3">
                          {paymentMethods.map((method) => (
                            <button
                              key={method.id}
                              onClick={() => setSelectedPayment(method.id)}
                              className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                                selectedPayment === method.id
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/50"
                              }`}
                            >
                              <HugeiconsIcon icon={method.icon} className={`h-6 w-6 ${selectedPayment === method.id ? "text-primary" : "text-muted-foreground"}`} />
                              <span className={`text-sm font-medium ${selectedPayment === method.id ? "text-primary" : "text-foreground"}`}>
                                {method.name}
                              </span>
                              <span className="text-xs text-muted-foreground">{method.description}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Card Details */}
                      {selectedPayment === "card" && (
                        <div className="space-y-4">
                          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                            Card Details
                          </h3>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-foreground">Card Number</label>
                              <div className="relative">
                                <input
                                  type="text"
                                  placeholder="1234 5678 9012 3456"
                                  value={cardInfo.number}
                                  onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                                  className="w-full rounded-lg border border-input bg-background px-4 py-3 pr-12 text-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                                <HugeiconsIcon icon={CreditCardIcon} className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                              </div>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Expiry Date</label>
                                <input
                                  type="text"
                                  placeholder="MM/YY"
                                  value={cardInfo.expiry}
                                  onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">CVC</label>
                                <input
                                  type="text"
                                  placeholder="123"
                                  value={cardInfo.cvc}
                                  onChange={(e) => setCardInfo({ ...cardInfo, cvc: e.target.value })}
                                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-foreground">Name on Card</label>
                              <input
                                type="text"
                                placeholder="JOHN DOE"
                                value={cardInfo.name}
                                onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
                                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm uppercase transition-colors placeholder:text-muted-foreground placeholder:normal-case focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Message */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Message (Optional)</label>
                        <textarea
                          placeholder="Leave a message of support..."
                          rows={3}
                          value={donorInfo.message}
                          onChange={(e) => setDonorInfo({ ...donorInfo, message: e.target.value })}
                          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>

                      {/* Security Notice */}
                      <div className="flex items-center justify-center gap-4 rounded-lg bg-muted/50 p-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <HugeiconsIcon icon={ShieldIcon} className="h-4 w-4 text-green-500" />
                          <span>256-bit SSL Encryption</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <HugeiconsIcon icon={ShieldIcon} className="h-4 w-4 text-green-500" />
                          <span>Powered by Stripe</span>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button variant="outline" className="flex-1 rounded-full" size="lg" onClick={() => setStep(2)}>
                          <HugeiconsIcon icon={ArrowRight01Icon} className="mr-2 h-4 w-4 rotate-180" />
                          Back
                        </Button>
                        <Button
                          className="flex-1 gap-2 rounded-full"
                          size="lg"
                          onClick={handleSubmit}
                          disabled={isProcessing || !donorInfo.email || !donorInfo.name}
                        >
                          {isProcessing ? (
                            <>
                              <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <HugeiconsIcon icon={ShieldIcon} className="h-4 w-4" />
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

            {/* Sidebar Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Donation Summary */}
                <Card className="border-0 shadow-xl ring-1 ring-border/50">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-lg font-bold text-foreground">Donation Summary</h3>
                    
                    {/* Selected Cause */}
                    {selectedCauseData && (
                      <div className="mb-4 overflow-hidden rounded-xl">
                        <div className="relative aspect-video">
                          <Image
                            src={selectedCauseData.image}
                            alt={selectedCauseData.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3">
                            <p className="font-semibold text-white">{selectedCauseData.name}</p>
                            <p className="text-xs text-white/80">{selectedCauseData.category}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-3 border-t border-border pt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Donation Amount</span>
                        <span className="font-semibold">${finalAmount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Type</span>
                        <span className="font-semibold">
                          {isRecurring ? `Recurring (${recurringFrequency})` : "One-time"}
                        </span>
                      </div>
                      {dedicationType !== "none" && dedicationName && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Dedication</span>
                          <span className="font-semibold text-right text-xs">
                            {dedicationType === "honor" ? "In Honor Of" : "In Memory Of"}<br />
                            {dedicationName}
                          </span>
                        </div>
                      )}
                      <div className="border-t border-border pt-3">
                        <div className="flex justify-between">
                          <span className="font-semibold text-foreground">Total</span>
                          <span className="text-2xl font-bold text-primary">${finalAmount}</span>
                        </div>
                        {isRecurring && (
                          <p className="mt-1 text-right text-xs text-muted-foreground">
                            Billed {recurringFrequency}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Trust Badges */}
                <Card className="border-0 bg-muted/50 shadow-sm">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                          <HugeiconsIcon icon={ShieldIcon} className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">100% Secure</p>
                          <p className="text-xs text-muted-foreground">Your data is protected</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                          <HugeiconsIcon icon={CheckmarkCircle02Icon} className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Tax Deductible</p>
                          <p className="text-xs text-muted-foreground">Receipt sent instantly</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                          <HugeiconsIcon icon={FavouriteIcon} className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">98% to Programs</p>
                          <p className="text-xs text-muted-foreground">Maximizing your impact</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Donors */}
                <Card className="border-0 shadow-sm ring-1 ring-border/50">
                  <CardContent className="p-4">
                    <h4 className="mb-3 text-sm font-semibold text-foreground">Recent Donors</h4>
                    <div className="space-y-2">
                      {[
                        { name: "Sarah M.", amount: 100, time: "2 min ago" },
                        { name: "Anonymous", amount: 250, time: "5 min ago" },
                        { name: "John D.", amount: 50, time: "12 min ago" },
                      ].map((donor, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                              {donor.name.charAt(0)}
                            </div>
                            <span className="text-muted-foreground">{donor.name}</span>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-foreground">${donor.amount}</p>
                            <p className="text-xs text-muted-foreground">{donor.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function DonatePage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    }>
      <DonateContent />
    </Suspense>
  )
}
