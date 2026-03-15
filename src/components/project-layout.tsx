import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { DiagramWrapper } from "@/components/diagram-wrapper";

export type Stat = {
  label: string;
  value: string;
  sub?: string;
};

export type DiagramSection = {
  title: string;
  description: string;
  chart: string;
};

export type ProjectLayoutProps = {
  title: string;
  company: string;
  period: string;
  summary: string;
  stats?: Stat[];
  overview: string[];
  diagrams: DiagramSection[];
  evolution?: {
    title: string;
    items: { phase: string; detail: string }[];
  };
  challenges?: string[];
  tags: string[];
};

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-6">
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
        {eyebrow}
      </p>
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
    </div>
  );
}

export function ProjectLayout({
  title,
  company,
  period,
  summary,
  stats,
  overview,
  diagrams,
  evolution,
  challenges,
  tags,
}: ProjectLayoutProps) {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      {/* Back */}
      <a
        href="/#projects"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "mb-8 -ml-2 gap-1.5 text-muted-foreground hover:text-foreground"
        )}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Portfolio
      </a>

      {/* Header */}
      <div className="mb-10 flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-border/60 bg-secondary/60 px-3 py-0.5 text-xs font-medium text-muted-foreground">
            {company}
          </span>
          <span className="rounded-full border border-border/60 bg-secondary/60 px-3 py-0.5 text-xs font-medium text-muted-foreground">
            {period}
          </span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">{summary}</p>
      </div>

      {/* Stats */}
      {stats && stats.length > 0 && (
        <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="group flex flex-col gap-1 rounded-2xl border border-border/60 bg-card px-5 py-5 transition-colors hover:border-primary/40"
            >
              <span className="text-2xl font-bold tracking-tight text-foreground">
                {s.value}
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {s.label}
              </span>
              {s.sub && (
                <span className="text-xs text-muted-foreground/70">{s.sub}</span>
              )}
            </div>
          ))}
        </div>
      )}

      {stats && stats.length > 0 && <Separator className="mb-12 opacity-40" />}

      {/* Overview */}
      <section className="mb-12">
        <SectionHeader eyebrow="Background" title="Overview" />
        <div className="flex flex-col gap-3">
          {overview.map((para, i) => (
            <p key={i} className="leading-relaxed text-muted-foreground">
              {para}
            </p>
          ))}
        </div>
      </section>

      <Separator className="mb-12 opacity-40" />

      {/* Diagrams */}
      {diagrams.map((d, i) => (
        <section key={i} className="mb-12">
          <SectionHeader eyebrow="Architecture" title={d.title} />
          <p className="mb-6 text-muted-foreground">{d.description}</p>
          <div className="overflow-x-auto rounded-2xl border border-border/60 bg-muted/20 p-6">
            <DiagramWrapper chart={d.chart} />
          </div>
        </section>
      ))}

      {/* Evolution */}
      {evolution && (
        <>
          <Separator className="mb-12 opacity-40" />
          <section className="mb-12">
            <SectionHeader eyebrow="Progression" title={evolution.title} />
            <ol className="relative flex flex-col gap-8 pl-6 before:absolute before:left-0 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-border/60">
              {evolution.items.map(({ phase, detail }) => (
                <li key={phase} className="relative">
                  <span className="absolute -left-[25px] top-1.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-primary bg-background" />
                  <p className="font-semibold">{phase}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
                </li>
              ))}
            </ol>
          </section>
        </>
      )}

      {/* Challenges */}
      {challenges && challenges.length > 0 && (
        <>
          <Separator className="mb-12 opacity-40" />
          <section className="mb-12">
            <SectionHeader eyebrow="Learnings" title="Engineering Challenges" />
            <ul className="flex flex-col gap-2.5">
              {challenges.map((c) => (
                <li key={c} className="flex gap-2.5 text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                  {c}
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      <Separator className="mb-10 opacity-40" />

      {/* Stack */}
      <section>
        <SectionHeader eyebrow="Tools & Technologies" title="Tech Stack" />
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border/60 bg-secondary/60 px-3 py-1 text-sm text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
