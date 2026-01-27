import Image from "next/image"

const partners = [
  { name: "Partner 1", logo: "/assets/sponsor-carousel/Frame.svg" },
  { name: "Partner 2", logo: "/assets/sponsor-carousel/Frame-1.svg" },
  { name: "Partner 3", logo: "/assets/sponsor-carousel/Frame-2.svg" },
  { name: "Partner 4", logo: "/assets/sponsor-carousel/Frame-3.svg" },
  { name: "Partner 5", logo: "/assets/sponsor-carousel/Frame-4.svg" },
  { name: "Partner 6", logo: "/assets/sponsor-carousel/Frame-5.svg" },
]

export function PartnersSection() {
  return (
    <section className="border-y border-border/50 bg-muted/20 py-16 dark:bg-muted/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Trusted by Leading Organizations
          </p>
          <h3 className="mt-2 text-xl font-semibold text-foreground">
            Our Partners & Supporters
          </h3>
        </div>

        {/* Logos */}
        <div className="mt-10 grid grid-cols-2 items-center gap-8 sm:grid-cols-3 md:grid-cols-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={40}
                className="h-10 w-auto object-contain dark:invert"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
