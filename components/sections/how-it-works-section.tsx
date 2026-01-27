import {
  Target01Icon,
  Search01Icon,
  CreditCardIcon,
  HeartCheckIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

const steps = [
  {
    step: "01",
    title: "Choose a Cause",
    description: "Browse through our verified causes and select one that resonates with your values.",
    icon: Search01Icon,
    color: "bg-blue-500",
  },
  {
    step: "02",
    title: "Set Your Amount",
    description: "Decide how much you'd like to give. Every contribution, big or small, matters.",
    icon: Target01Icon,
    color: "bg-green-500",
  },
  {
    step: "03",
    title: "Secure Payment",
    description: "Complete your donation securely through our trusted payment partners.",
    icon: CreditCardIcon,
    color: "bg-purple-500",
  },
  {
    step: "04",
    title: "See Your Impact",
    description: "Track how your donation is making a difference in real people's lives.",
    icon: HeartCheckIcon,
    color: "bg-primary",
  },
]

export function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Simple Process
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Making a difference is easy. Follow these simple steps to start your giving journey.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-16">
          {/* Connection line - desktop */}
          <div className="absolute left-0 right-0 top-24 hidden h-0.5 bg-gradient-to-r from-transparent via-border to-transparent lg:block" />
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="group relative">
                {/* Step card */}
                <div className="relative rounded-2xl border border-border/50 bg-background p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
                  {/* Step number badge */}
                  <div className="absolute -top-4 left-6">
                    <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${step.color} text-sm font-bold text-white shadow-lg`}>
                      {step.step}
                    </span>
                  </div>
                  
                  {/* Icon */}
                  <div className="mt-4 mb-4">
                    <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl ${step.color}/10`}>
                      <HugeiconsIcon icon={step.icon} className={`h-7 w-7 ${step.color.replace("bg-", "text-")}`} />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow connector - mobile */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center py-4 lg:hidden">
                    <div className="h-8 w-0.5 bg-border" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
