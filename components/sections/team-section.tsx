import Image from "next/image"
import Link from "next/link"
import { 
  Linkedin01Icon, 
  NewTwitterIcon, 
  Facebook01Icon,
  FavouriteIcon 
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"

const teamMembers = [
  {
    id: 1,
    name: "Poly Matzinger",
    role: "Founder & CEO",
    image: "/assets/team-members/poly-matzinger.png",
    social: {
      linkedin: "#",
      twitter: "#",
      facebook: "#",
    },
  },
  {
    id: 2,
    name: "Andren Willium",
    role: "Program Director",
    image: "/assets/team-members/andren-willium.png",
    social: {
      linkedin: "#",
      twitter: "#",
      facebook: "#",
    },
  },
  {
    id: 3,
    name: "Thomas Stewart",
    role: "Operations Manager",
    image: "/assets/team-members/thomas-stewart.png",
    social: {
      linkedin: "#",
      twitter: "#",
      facebook: "#",
    },
  },
  {
    id: 4,
    name: "Douglas DeCosta",
    role: "Community Lead",
    image: "/assets/team-members/Douglas-DeCosta.png",
    social: {
      linkedin: "#",
      twitter: "#",
      facebook: "#",
    },
  },
]

export function TeamSection() {
  return (
    <section id="team" className="relative overflow-hidden bg-background py-20 sm:py-28">
      {/* Decorative Heart */}
      <div className="absolute right-8 top-16 opacity-20 lg:right-20">
        <HugeiconsIcon icon={FavouriteIcon} className="h-32 w-32 text-primary lg:h-40 lg:w-40" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
            Supporting Our Cause Together
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Meet Our Dedicated
            <br />
            <span className="text-primary">Team Members</span>
          </h2>
          
          {/* Decorative divider */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="h-0.5 w-12 rounded-full bg-primary/40" />
            <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 21C12 21 6 15.5 6 10.5C6 7.46 8.69 5 12 5C15.31 5 18 7.46 18 10.5C18 15.5 12 21 12 21Z" />
              <path d="M12 8V12" />
            </svg>
            <span className="h-0.5 w-12 rounded-full bg-primary/40" />
          </div>
        </div>

        {/* Team Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="group relative overflow-hidden rounded-2xl bg-muted/50"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                {/* Social Links - appear on hover */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <Link href={member.social.linkedin}>
                    <Button variant="secondary" size="icon-sm" className="rounded-full bg-background/90 hover:bg-primary hover:text-primary-foreground">
                      <HugeiconsIcon icon={Linkedin01Icon} className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={member.social.twitter}>
                    <Button variant="secondary" size="icon-sm" className="rounded-full bg-background/90 hover:bg-primary hover:text-primary-foreground">
                      <HugeiconsIcon icon={NewTwitterIcon} className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={member.social.facebook}>
                    <Button variant="secondary" size="icon-sm" className="rounded-full bg-background/90 hover:bg-primary hover:text-primary-foreground">
                      <HugeiconsIcon icon={Facebook01Icon} className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 text-center">
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="mt-1 text-sm text-primary">{member.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Want to join our mission?{" "}
            <Link href="/auth/register" className="font-semibold text-primary hover:underline">
              Become a volunteer →
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
