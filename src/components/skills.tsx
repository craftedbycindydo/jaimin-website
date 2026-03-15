import { Badge } from "@/components/ui/badge";

type SkillCategory = {
  label: string;
  skills: string[];
};

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    label: "Languages",
    skills: ["Go", "C#", ".NET", "Java", "Python", "JavaScript", "C++"],
  },
  {
    label: "Backend & Architecture",
    skills: ["Microservices", "REST APIs", "GraphQL", "Distributed Systems", "Event-Driven Architecture", "Kafka"],
  },
  {
    label: "Cloud & DevOps",
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "CI/CD", "Terraform"],
  },
  {
    label: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "DynamoDB", "Redis", "NoSQL"],
  },
  {
    label: "Data & ML",
    skills: ["MLflow", "TensorFlow", "Pandas", "Keras", "Recommendation Systems", "Personalization Algorithms"],
  },
  {
    label: "Tools",
    skills: ["Postman", "Git", "Jira", "Swagger / OpenAPI", "Databricks"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
            Technical Expertise
          </p>
          <h2 className="text-3xl font-bold tracking-tight">Skills</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_CATEGORIES.map(({ label, skills }) => (
            <div
              key={label}
              className="group rounded-2xl border border-border/60 bg-card p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {label}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-secondary/60 px-2 py-1 text-xs font-medium text-secondary-foreground transition-colors group-hover:bg-secondary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
