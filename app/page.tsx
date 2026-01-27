import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { DonationSection } from "@/components/sections/donation-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { TeamSection } from "@/components/sections/team-section"
import { StatsSection } from "@/components/sections/stats-section"
import { CTASection } from "@/components/sections/cta-section"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <DonationSection />
        <StatsSection />
        <TestimonialsSection />
        <TeamSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}