import Image from "next/image";

type Role = {
  company: string;
  title: string;
  period: string;
  bullets: string[];
  logo?: string;
};

type Education = {
  degree: string;
  school: string;
  gpa?: string;
  graduated?: string;
};

const ROLES: Role[] = [
  {
    company: "Fox Corporation",
    title: "Software Engineer II",
    period: "Sep 2021 – Present",
    logo: "/logos/fox.png",
    bullets: [
      "Architected backend microservices powering content discovery for FOX Sports, FOX Nation, and FOX Now, directly impacting user engagement and retention.",
      "Developed high-throughput APIs to surface real-time popular sports content by processing live engagement and behavioral signals.",
      "Engineered implicit recommendation services that generate personalized content feeds using real-time user data and ML model integration.",
      "Designed and scaled backend infrastructure for real-time notifications, delivering live game updates to millions of concurrent users.",
      "Built the backend systems for the FOX Sports Newsletter platform, enabling automated, personalized sports content delivery.",
      "Implemented robust CI/CD pipelines and improved system monitoring, significantly increasing deployment frequency and reliability.",
      "Partnered with ML and Product teams to transition complex recommendation models from research to production-ready APIs.",
    ],
  },
  {
    company: "University of Dayton",
    title: "Research Assistant",
    period: "Nov 2019 – Sep 2021",
    logo: "/logos/udayton.png",
    bullets: [
      "Developed image denoising algorithms using CNNs, achieving significant improvements in clarity.",
      "Evaluated model performance using multiple metrics across diverse datasets.",
    ],
  },
  {
    company: "University of Dayton",
    title: "Teaching Assistant",
    period: "May 2020 – Dec 2020",
    logo: "/logos/udayton.png",
    bullets: [
      "Mentored students in algorithms, data structures, and core programming fundamentals.",
      "Designed curriculum materials including quizzes and complex programming assignments.",
    ],
  },
  {
    company: "Synergetics IT",
    title: "Software Developer Intern",
    period: "Jan 2019 – Mar 2019",
    bullets: [
      "Developed and maintained the company database for existing and potential clientele using SQL and Snowflake.",
    ],
  },
];

const COURSEWORK = ["Data Structures", "Algorithm Design", "Deep Learning", "Data Visualization", "Artificial Intelligence", "Machine Learning", "Image Processing", "Computational Physics", "Data Communications"];

const EDUCATION: Education[] = [
  {
    degree: "Master of Science in Computer Science",
    school: "University of Dayton",
    gpa: "3.88 / 4.0",
    graduated: "May 2021",
  },
  {
    degree: "Bachelor of Technology in Computer Science",
    school: "Vellore Institute of Technology",
    gpa: "7.12 / 10.0",
    graduated: "May 2019",
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
            Work History
          </p>
          <h2 className="text-3xl font-bold tracking-tight">Experience</h2>
        </div>

        {/* Timeline */}
        <div className="relative flex flex-col gap-10 pl-6 before:absolute before:left-0 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-border/60">
          {ROLES.map((role) => (
            <div
              key={`${role.company}-${role.title}`}
              className="relative flex flex-col gap-3"
            >
              {/* Timeline dot */}
              <span className="absolute -left-[25px] top-1.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-primary bg-background" />

              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-3">
                  {role.logo && (
                    <Image
                      src={role.logo}
                      alt={role.company}
                      width={40}
                      height={40}
                      className="rounded-lg object-contain"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold leading-tight">{role.title}</h3>
                    <p className="text-sm font-medium text-primary/80">{role.company}</p>
                  </div>
                </div>
                <span className="mt-0.5 shrink-0 rounded-full border border-border/60 bg-muted/40 px-2.5 py-0.5 text-xs text-muted-foreground">
                  {role.period}
                </span>
              </div>

              <ul className="ml-1 flex flex-col gap-1.5">
                {role.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-border" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="mt-16">
          <div className="mb-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
              Academic Background
            </p>
            <h2 className="text-3xl font-bold tracking-tight">Education</h2>
          </div>
          <div className="relative flex flex-col gap-6 pl-6 before:absolute before:left-0 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-border/60">
            {EDUCATION.map((edu) => (
              <div key={edu.degree} className="relative">
                <span className="absolute -left-[25px] top-1.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-primary bg-background" />
                <p className="font-semibold">{edu.degree}</p>
                <p className="text-sm font-medium text-primary/80">{edu.school}</p>
                <div className="flex flex-wrap items-center gap-2 mt-0.5">
                  {edu.graduated && <p className="text-xs text-muted-foreground">Graduated: {edu.graduated}</p>}
                  {edu.gpa && <p className="text-xs text-muted-foreground">· GPA: {edu.gpa}</p>}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Coursework</p>
            <div className="flex flex-wrap gap-1.5">
              {COURSEWORK.map((course) => (
                <span
                  key={course}
                  className="rounded-full border border-border/60 bg-secondary/60 px-2.5 py-0.5 text-xs text-muted-foreground"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
