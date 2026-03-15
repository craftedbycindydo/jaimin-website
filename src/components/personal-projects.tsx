import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type PersonalProject = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  href?: string;
};

const ACADEMIC_PROJECTS: PersonalProject[] = [
  {
    title: "Underwater Document Recognition",
    category: "Research · Spring 2021",
    description:
      "Designed a framework applying OCR (pytesseract) to degraded underwater documents. Built image quality assessment and comparison metrics using NLM, low-pass and high-pass filtering. Benchmarked using MSE, PSNR, and SSIM, and analyzed results with Tableau.",
    tags: ["Python", "Matlab", "pytesseract", "OpenCV", "Tableau"],
    href: "/projects/underwater-document-recognition",
  },
  {
    title: "Real-Time Attendance Marker",
    category: "Project · Spring 2021",
    description:
      "Implemented a face recognition system using OpenCV to automatically mark student attendance in online classes. Used eigenfaces and Local Binary Patterns (LBP) trained on a preprocessed dataset, storing attendance records in MongoDB with 82% prediction accuracy.",
    tags: ["Python", "OpenCV", "MongoDB", "Eigenfaces", "LBP"],
    href: "/projects/real-time-attendance-marker",
  },
  {
    title: "Library Management System",
    category: "Project · Spring 2020",
    description:
      "Built a full-stack web application for checking book availability, withdrawals, and deposits. Deployed on multiple GCP instances using monolithic Docker containers with a network load balancer.",
    tags: ["Node.js", "MySQL", "Express.js", "Docker", "GCP"],
    href: "/projects/library-management-system",
  },
];

const MINI_PROJECTS: PersonalProject[] = [
  {
    title: "Twitter Crawler",
    category: "Mini Project · Fall 2020",
    description:
      "Built a real-time Twitter data pipeline using twitter4j and tweepy to process tweet streams delivered in JSON. Performed real-time data analysis using Twitter REST APIs in both Java and Python.",
    tags: ["Python", "Java", "tweepy", "twitter4j", "REST APIs"],
    href: "/projects/twitter-crawler",
  },
  {
    title: "MapReduce PageRank",
    category: "Mini Project · Spring 2020",
    description:
      "Implemented the PageRank algorithm using Hadoop MapReduce to compute the relative importance of web pages. Applied parallel and distributed processing techniques across a Hadoop cluster.",
    tags: ["Java", "Hadoop", "MapReduce", "Distributed Systems"],
    href: "/projects/mapreduce-pagerank",
  },
  {
    title: "Speech-to-Text Assistant",
    category: "Mini Project · Fall 2019",
    description:
      "Created a voice-driven FAQ assistant using Google NLP and WIT.ai APIs. Applied intent classification and entity extraction to parse spoken queries and return contextual answers.",
    tags: ["Python", "Google NLP", "WIT.ai", "NLP", "Intent Classification"],
    href: "/projects/speech-to-text-assistant",
  },
];

function ProjectCard({ project }: { project: PersonalProject }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex-1">
          <h3 className="mb-1 font-semibold leading-tight">{project.title}</h3>
          <p className="mb-3 text-xs font-medium text-primary/70">{project.category}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border/60 bg-secondary/60 px-2 py-0.5 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        {project.href && (
          <a
            href={project.href}
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "mt-4 w-fit gap-1.5 px-0 text-primary hover:bg-transparent hover:text-primary/70"
            )}
          >
            View Project
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        )}
      </div>
    </div>
  );
}

export function PersonalProjects() {
  return (
    <section id="personal-projects" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        {/* Academic Projects */}
        <div className="mb-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
            Academic Work
          </p>
          <h2 className="text-3xl font-bold tracking-tight">Academic Projects</h2>
        </div>
        <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ACADEMIC_PROJECTS.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>

        {/* Mini Projects */}
        <div className="mb-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
            Explorations
          </p>
          <h2 className="text-3xl font-bold tracking-tight">Mini Projects</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MINI_PROJECTS.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
