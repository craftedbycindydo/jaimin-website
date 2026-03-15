import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";
import { Download, Linkedin, Mail, MapPin } from "lucide-react";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute left-1/4 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute right-1/4 top-2/3 h-[300px] w-[300px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-6 pb-16 pt-28">
        <div className="flex flex-col gap-8 md:max-w-3xl">

          {/* Status badge */}
          <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-border/60 bg-muted/40 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Open to new opportunities
          </div>

          {/* Name */}
          <div className="flex flex-col gap-2">
            <h1 className="text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
              <span className="bg-gradient-to-br from-foreground via-foreground/90 to-foreground/50 bg-clip-text text-transparent">
                Jaimin
              </span>
              <br />
              <span className="bg-gradient-to-br from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
                Shah
              </span>
            </h1>
          </div>

          {/* Role */}
          <p className="text-xl font-medium text-muted-foreground md:text-2xl">
            Software Engineer{" "}
            <span className="text-foreground/40">·</span>{" "}
            Backend &amp; Platform Systems
          </p>

          {/* Bio */}
          <p className="max-w-xl leading-relaxed text-muted-foreground">
            4+ years building scalable backend systems and personalization
            platforms at FOX Corporation — powering content delivery for
            millions of users across microservices, real-time event pipelines,
            and ML-driven recommendation engines.
          </p>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground/70">
            <MapPin className="h-3.5 w-3.5" />
            Cincinnati, OH &mdash; Open to relocation across the US
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a href="#experience" className={cn(buttonVariants({ size: "lg" }))}>
              View Experience
            </a>
            <a
              href="#contact"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Get in Touch
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              <Download className="mr-2 h-4 w-4" />
              Resume
            </a>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4 pt-1">
            <a
              href="https://linkedin.com/in/shahj7"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex items-center gap-1.5 text-sm text-muted-foreground/60 transition-colors hover:text-primary"
            >
              <Linkedin className="h-4 w-4" />
              <span>shahj7</span>
            </a>
            <span className="text-border">·</span>
            <a
              href="mailto:shahj7.research@gmail.com"
              aria-label="Email"
              className="flex items-center gap-1.5 text-sm text-muted-foreground/60 transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4" />
              <span>shahj7.research@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
