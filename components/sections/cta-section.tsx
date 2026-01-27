import Link from "next/link"
import Image from "next/image"
import { ArrowRight01Icon, FavouriteIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-foreground py-20 sm:py-28 dark:bg-muted/50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full border-[40px] border-primary" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full border-[40px] border-primary" />
      </div>

      {/* Floating Images */}
      <div className="absolute left-10 top-1/2 hidden -translate-y-1/2 lg:block">
        <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-primary/30">
          <Image
            src="/assets/poor-village-children.jpg"
            alt="Children we help"
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="absolute right-10 top-1/2 hidden -translate-y-1/2 lg:block">
        <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-primary/30">
          <Image
            src="/assets/diverse-team-of-volunteers.jpg"
            alt="Our volunteers"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
          <HugeiconsIcon icon={FavouriteIcon} className="h-8 w-8 text-primary" />
        </div>

        <h2 className="mt-6 text-3xl font-bold tracking-tight text-background dark:text-foreground sm:text-4xl lg:text-5xl">
          Ready to Make a Difference?
        </h2>
        <p className="mt-4 text-lg text-background/70 dark:text-muted-foreground">
          Join thousands of generous donors who are helping us transform lives and build
          stronger communities. Every donation, no matter the size, creates lasting change.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/donate">
            <Button
              size="lg"
              className="h-14 gap-2 rounded-full px-8 text-base"
            >
              Donate Now
              <HugeiconsIcon icon={ArrowRight01Icon} className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button
              variant="outline"
              size="lg"
              className="h-14 gap-2 rounded-full border-primary/50 bg-transparent px-8 text-base text-background hover:bg-primary/10 hover:text-background dark:border-border dark:text-foreground dark:hover:bg-muted"
            >
              Become a Volunteer
            </Button>
          </Link>
        </div>

        <p className="mt-8 text-sm text-background/50 dark:text-muted-foreground">
          100% of your donation goes directly to our programs. We&apos;re committed to
          transparency and accountability.
        </p>
      </div>
    </section>
  )
}
