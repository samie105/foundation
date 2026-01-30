"use client"

import { useEffect, useState, useRef } from "react"
import {
  UserMultiple02Icon,
  Comment01Icon,
  Award01Icon,
  SmileIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

const stats = [
  {
    icon: UserMultiple02Icon,
    value: 90,
    suffix: "+",
    label: "Team Members",
  },
  {
    icon: Comment01Icon,
    value: 150,
    suffix: "+",
    label: "Client's Review",
  },
  {
    icon: Award01Icon,
    value: 30,
    suffix: "+",
    label: "Winning Awards",
  },
  {
    icon: SmileIcon,
    value: 240,
    suffix: "+",
    label: "Happy Clients",
  },
]

function useCountAnimation(end: number, duration: number = 2000, startCounting: boolean = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!startCounting) return

    let startTime: number | null = null
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, startCounting])

  return count
}

function StatItem({ 
  icon: Icon, 
  value, 
  suffix, 
  label, 
  startCounting 
}: { 
  icon: typeof UserMultiple02Icon
  value: number
  suffix: string
  label: string
  startCounting: boolean 
}) {
  const count = useCountAnimation(value, 2000, startCounting)

  return (
    <div className="flex items-center gap-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <HugeiconsIcon icon={Icon} className="h-7 w-7 text-primary" />
      </div>
      <div>
        <p className="text-3xl font-bold text-foreground sm:text-4xl">
          {count}
          <span className="text-primary">{suffix}</span>
        </p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  )
}

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card px-6 py-12 shadow-sm sm:px-12 sm:py-16">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <StatItem
                key={index}
                icon={stat.icon}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                startCounting={isVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
