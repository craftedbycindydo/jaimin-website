import type { Metadata } from "next";
import { ProjectLayout } from "@/components/project-layout";

export const metadata: Metadata = {
  title: "Personalized Daily Newsletter — Jaimin Shah",
  description:
    "Personalized daily newsletter delivered to 1M+ FOX Sports fans, powered by the Trending and Implicit Recommendations engines.",
};

const SYSTEM_ARCH = `
graph TB
    subgraph Scheduler["Scheduler"]
        EB["Amazon EventBridge\\n(daily cron)"]
    end

    subgraph NewsletterService["Newsletter Service (Lambda · 50k req/min)"]
        NL["Newsletter Orchestrator\\n(C# .NET)"]
    end

    subgraph UpstreamAPIs["Upstream APIs"]
        TREND["Trending Collections API\\n(Top 10 Stories)"]
        RECS["Implicit Recommendations API\\n(User Favorites & Personalized Content)"]
    end

    subgraph Assembly["Content Assembly"]
        TPL["Template Engine\\nTop 10 + Personalized + Popular"]
        PG["PostgreSQL\\nSubscriber list & preferences"]
    end

    subgraph Delivery["Delivery"]
        SES["AWS SES\\n1M+ subscribers"]
        USER["FOX Sports Fans"]
    end

    EB -->|"trigger daily send"| NL
    NL -->|"GET /trending?window=24h&limit=10"| TREND
    TREND -->|"top 10 stories"| NL
    NL -->|"GET /recommendations?userId=X"| RECS
    RECS -->|"personalized content"| NL
    NL --> PG
    PG -->|"subscriber segments"| NL
    NL --> TPL
    TPL -->|"rendered newsletter per user"| SES
    SES -->|"email delivery"| USER
`;

const SEQUENCE = `
sequenceDiagram
    participant EB as EventBridge (cron)
    participant NL as Newsletter Lambda
    participant TR as Trending API
    participant RC as Recommendations API
    participant PG as PostgreSQL
    participant SES as AWS SES
    participant FAN as FOX Sports Fan

    EB->>NL: trigger daily newsletter job

    Note over NL,TR: Fetch Shared Content
    NL->>TR: GET /trending?window=24h&limit=10
    TR-->>NL: Top 10 trending stories

    Note over NL,PG: Load Subscriber Segments
    NL->>PG: fetch active subscriber list
    PG-->>NL: 1M+ subscriber records

    loop For each subscriber segment
        NL->>RC: GET /recommendations?userId=X
        RC-->>NL: personalized content (favorites + popular)
        NL->>NL: assemble newsletter\\n(Top 10 + personalized + popular)
    end

    Note over NL,FAN: Bulk Delivery
    NL->>SES: send batch (personalized per user)
    SES-->>FAN: email delivered
`;

export default function PersonalizedNewsletterPage() {
  return (
    <ProjectLayout
      title="Personalized Daily Newsletter"
      company="Fox Corporation"
      period="Sep 2021 – Mar 2026"
      summary="A daily newsletter engine delivering personalized editions to over 1 million FOX Sports fans. Each issue is assembled in real time by orchestrating two internal APIs — the Trending Collections engine for the Top 10 stories and the Implicit Recommendations engine for each subscriber's personalized content — then delivered via AWS SES to drive repeat traffic back to the FOX Sports app and site."
      stats={[
        { label: "Subscribers", value: "1M+", sub: "daily recipients" },
        { label: "Throughput", value: "50k", sub: "requests / min · Lambda" },
        { label: "Content Sources", value: "2", sub: "Trending + Implicit Recs" },
        { label: "Sections per Email", value: "3", sub: "Top 10 · Personalized · Popular" },
      ]}
      overview={[
        "The FOX Sports daily newsletter is not a single blast — it is a individually assembled edition per subscriber, composed at send time from live data across two production APIs. This architecture meant every fan received a newsletter that reflected both the day's biggest sports stories and their own personal interests, without any manual editorial curation.",
        "The Top 10 section is sourced directly from the Trending Collections API, querying the 24-hour trending window to surface the most-engaged stories of the day. This ensures the curated section is always current and reflects real audience behavior rather than editorial judgment.",
        "The personalized section pulls from the Implicit Recommendations API, which uses each subscriber's favorites and click history to return content tuned to their preferred teams, leagues, and athletes. The popular content section rounds out the newsletter with broadly trending material for discovery.",
        "The newsletter service itself is a C# .NET Lambda function triggered daily by Amazon EventBridge. It loads subscriber records from PostgreSQL, fans out recommendation requests per subscriber segment, assembles each personalized email from a shared template, and hands off the full batch to AWS SES for delivery at scale.",
        "By tying repeat traffic generation directly into the same personalization layer powering the app, the newsletter became an extension of the product experience rather than a separate editorial channel — keeping fans engaged between sessions.",
      ]}
      diagrams={[
        {
          title: "System Architecture",
          description:
            "EventBridge triggers the Newsletter Lambda daily. It calls the Trending API for the shared Top 10, then the Recommendations API per subscriber, assembles personalized templates, and delivers via AWS SES.",
          chart: SYSTEM_ARCH,
        },
        {
          title: "Orchestration Flow",
          description:
            "Sequence showing how the newsletter Lambda coordinates between the Trending and Recommendations APIs, assembles per-subscriber content, and dispatches the full batch to SES.",
          chart: SEQUENCE,
        },
      ]}
      evolution={{
        title: "How the Newsletter Evolved",
        items: [
          {
            phase: "Single Static Blast",
            detail:
              "Early iterations sent a single non-personalized digest to all subscribers. Content was the same for every recipient — a manually curated list of stories with no user-level customization.",
          },
          {
            phase: "Trending-Powered Top 10",
            detail:
              "The first algorithmic improvement replaced manual curation with the Trending Collections API. The Top 10 became data-driven, refreshed every send window with real engagement signals.",
          },
          {
            phase: "Personalized Content via Implicit Recommendations",
            detail:
              "Integration with the Implicit Recommendations engine introduced per-subscriber personalization. Each fan now receives a newsletter tailored to their favorite teams, leagues, and athletes — assembled dynamically at send time from live recommendation data.",
          },
        ],
      }}
      challenges={[
        "Orchestrating two high-throughput upstream APIs (Trending + Recommendations) within a single Lambda invocation without hitting rate limits or inflating cold-start latency.",
        "Assembling 1M+ individually personalized emails efficiently — solved by batching recommendation calls by subscriber segment rather than making per-user API calls.",
        "Keeping newsletter content fresh relative to send time, particularly for the Top 10 section where breaking sports news can shift rankings within minutes of a scheduled send.",
        "Ensuring delivery reliability at scale through AWS SES with bounce and complaint handling feeding back into the PostgreSQL subscriber list to maintain list hygiene.",
      ]}
      tags={[
        "C#",
        ".NET",
        "AWS Lambda",
        "Amazon EventBridge",
        "AWS SES",
        "PostgreSQL",
        "Kafka",
        "Microservices",
        "REST APIs",
      ]}
    />
  );
}
