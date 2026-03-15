import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";
import { Linkedin, Mail, Phone } from "lucide-react";

const CONTACT_LINKS = [
  {
    label: "Email",
    href: "mailto:shahj7.research@gmail.com",
    icon: Mail,
    display: "shahj7.research@gmail.com",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/shahj7",
    icon: Linkedin,
    display: "linkedin.com/in/shahj7",
  },
  {
    label: "Phone",
    href: "tel:+19378389641",
    icon: Phone,
    display: "+1 (937) 838-9641",
  },
] as const;

export function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        {/* Centered content block */}
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card px-8 py-16 text-center sm:px-16">
          {/* Glow blob */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
              Get in Touch
            </p>
            <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Let&apos;s work together
            </h2>
            <p className="mx-auto mb-10 max-w-md text-muted-foreground">
              I&apos;m actively looking for new opportunities. Whether you have a
              role in mind or just want to connect, my inbox is always open.
            </p>

            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:flex-wrap">
              {CONTACT_LINKS.map(({ label, href, icon: Icon, display }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") || href.startsWith("tel") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "gap-2 border-border/60 hover:border-primary/60 hover:text-primary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {display}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
