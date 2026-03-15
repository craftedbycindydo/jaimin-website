import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { PersonalProjects } from "@/components/personal-projects";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Separator />
        <Skills />
        <Separator />
        <Experience />
        <Separator />
        <Projects />
        <Separator />
        <PersonalProjects />
        <Separator />
        <Contact />
      </main>
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Jaimin Shah. Built with Next.js &amp; shadcn/ui.
      </footer>
    </>
  );
}
