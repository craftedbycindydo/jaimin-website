import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type Project = {
  title: string;
  company: string;
  description: string;
  tags: string[];
  href?: string;
};

const PROJECTS: Project[] = [
  {
    title: "Trending Collections",
    company: "Fox Corporation · FSAPP, FSCOM, FOX Nation & FOX Now",
    description:
      "Built the backend powering trending videos and stories collections surfaced on the FOX Sports home page, watch page, and league section fronts. Processed real-time engagement signals to rank and serve short-form video and editorial content, directly driving monetized views and story reads at scale.",
    tags: ["C#", ".NET", "Kafka", "Redis", "S3", "AWS", "Microservices"],
    href: "/projects/trending-collections",
  },
  {
    title: "Implicit Recommendations",
    company: "Fox Corporation",
    description:
      "Developed an implicit recommendation engine that learned from passive user behavior — favorites and clicks — to personalize the FOX Sports home page, power audience targeting for editorial push alerts, and surface suggested content for the newsletter.",
    tags: ["C#", ".NET", "Kafka", "Redis", "DynamoDB", "Databricks", "AWS"],
    href: "/projects/implicit-recommendations",
  },
  {
    title: "Personalized Daily Newsletter",
    company: "Fox Corporation",
    description:
      "Architected the backend infrastructure delivering a personalized daily newsletter to over 1 million FOX Sports fans. Each edition combined a curated Top 10 stories list, individually personalized content recommendations, and trending popular content.",
    tags: ["C#", ".NET", "AWS Lambda", "PostgreSQL", "Kafka", "AWS SES"],
    href: "/projects/personalized-newsletter",
  },
  {
    title: "Automated Alert Service",
    company: "Fox Corporation",
    description:
      "Designed and built an automated alert delivery service that replaced manual editorial workflows at FOX Sports. Delivered personalized news and video push alerts to up to 3M subscribers per alert, with end-to-end delivery in 20–60 seconds.",
    tags: ["C#", ".NET", "AWS Lambda", "AWS SNS", "SQS", "DynamoDB", "Kafka"],
    href: "/projects/automated-alerts",
  },
  {
    title: "Relevance Engine",
    company: "Fox Corporation",
    description:
      "Created an NLP-powered relevance engine that analyzed articles and video content to automatically tag sports entities — teams, players, leagues, events — and enrich content with canonical web links for merchandising and discovery.",
    tags: ["C#", ".NET", "AWS Lambda", "NLP", "GraphQL", "PostgreSQL", "Kafka"],
    href: "/projects/relevance-engine",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
            Selected Work
          </p>
          <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <div
              key={project.title}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
            >
              {/* Top gradient accent line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-4 flex-1">
                  <h3 className="mb-1 font-semibold leading-tight">{project.title}</h3>
                  <p className="mb-3 text-xs font-medium text-primary/70">{project.company}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
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
                    View Case Study
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
