import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { DonationSection } from "@/components/sections/donation-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { TeamSection } from "@/components/sections/team-section"
import { StatsSection } from "@/components/sections/stats-section"
import { CTASection } from "@/components/sections/cta-section"
import { ParallaxSection } from "@/components/sections/parallax-section"
import { FeaturedCausesSection } from "@/components/sections/featured-causes-section"
import { HowItWorksSection } from "@/components/sections/how-it-works-section"
import { PartnersSection } from "@/components/sections/partners-section"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <PartnersSection />
        <AboutSection />
        <FeaturedCausesSection />
        <HowItWorksSection />
        <ParallaxSection />
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