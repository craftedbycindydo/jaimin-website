import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

const NAV_LINKS = [
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
] as const;

export function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/50">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <a
          href="/"
          className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-sm font-bold tracking-tight text-transparent"
        >
          Jaimin Shah
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
            >
              {label}
            </a>
          ))}
          <a
            href="/#contact"
            className={cn(buttonVariants({ size: "sm" }), "ml-3")}
          >
            Hire Me
          </a>
        </nav>

        {/* Mobile nav */}
        <Sheet>
          <SheetTrigger
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "md:hidden"
            )}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 border-border/50 bg-background/95 backdrop-blur-xl">
            <div className="mb-8 mt-2">
              <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-sm font-bold text-transparent">
                Jaimin Shah
              </span>
            </div>
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
                >
                  {label}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
