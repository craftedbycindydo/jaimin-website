import type { Metadata } from "next";
import { ProjectLayout } from "@/components/project-layout";

export const metadata: Metadata = {
  title: "Trending Collections — Jaimin Shah",
  description:
    "Real-time trending video and story collections powering FOX Sports, FOX Nation, and FOX Now.",
};

const SYSTEM_ARCH = `
graph TB
    subgraph Clients["Client Applications"]
        FSAPP["FOX Sports App (FSAPP)"]
        FSCOM["FOX Sports .com (FSCOM)"]
        FN["FOX Nation"]
        FNOW["FOX Now"]
    end

    subgraph Events["Event Ingestion"]
        K["Kafka\\nuser-events topic"]
    end

    subgraph Processing["Event Processing"]
        EC["Event Consumer\\n(C# .NET Service)"]
        AG["Count Aggregator\\n4h · 8h · 12h · 24h · 3d · 7d · 30d · 1y"]
    end

    subgraph Storage["Storage Layer"]
        R["Redis\\nwindowed counts + rankings"]
        S3["S3\\npersistent score store"]
    end

    subgraph ServingV1["Serving — Phase 1 (EC2)"]
        EC2["EC2 C# .NET API\\n~20k req/min"]
    end

    subgraph ServingV2["Serving — Phase 2 (Lambda)"]
        CF["CloudFront CDN"]
        LB["AWS Lambda\\n~50k req/min"]
    end

    FSAPP -->|"clips_started, clips_completed\\nstory_read, live_stream_started\\nlive_stream_completed"| K
    FSCOM -->|user events| K
    FN -->|user events| K
    FNOW -->|user events| K
    K --> EC
    EC --> AG
    AG -->|"increment windowed counts"| R
    AG -->|"persist scores"| S3
    R --> EC2
    CF --> LB
    LB --> R
    FSAPP -->|"GET /trending?window=24h"| CF
    FSCOM -->|"GET /trending?window=24h"| CF
    FN -->|"GET /trending?window=24h"| CF
    FNOW -->|"GET /trending?window=24h"| CF
`;

const SEQUENCE = `
sequenceDiagram
    participant U as User (FSAPP / FSCOM / FOX Nation / FOX Now)
    participant CF as CloudFront
    participant L as Lambda API
    participant R as Redis
    participant S3 as S3
    participant K as Kafka
    participant EC as Event Consumer (C# .NET)

    Note over U,EC: Event Ingestion Path
    U->>K: clips_started / story_read / live_stream_started (etc.)
    K->>EC: consume event
    EC->>R: ZINCRBY trending:{window} score contentId
    EC->>S3: persist raw count (all windows)

    Note over U,R: Serving Path
    U->>CF: GET /trending?window=24h&surface=home
    CF->>L: cache miss → forward request
    L->>R: ZREVRANGE trending:24h 0 19
    alt Cache hit
        R-->>L: top 20 content IDs + scores
    else Cache miss / cold start
        L->>S3: query scores by window
        S3-->>L: ranked content IDs
        L->>R: seed cache, TTL 60s
    end
    L-->>CF: ranked collections payload
    CF-->>U: JSON (CDN cached)
`;

export default function TrendingCollectionsPage() {
  return (
    <ProjectLayout
      title="Trending Collections"
      company="Fox Corporation · FSAPP & FSCOM"
      period="Sep 2021 – Mar 2026"
      summary="Real-time, multi-window trending engine that ranked videos and stories by engagement signals and served curated collections across FOX Sports, FOX Nation, and FOX Now — directly driving monetized short-form video views and story reads across the entire FOX digital portfolio."
      stats={[
        { label: "Peak Throughput (v1)", value: "20k", sub: "requests / min · EC2" },
        { label: "Peak Throughput (v2)", value: "50k", sub: "requests / min · Lambda" },
        { label: "Time Windows", value: "8", sub: "4h → 1 year" },
        { label: "Event Types", value: "5", sub: "video, story & stream events" },
      ]}
      overview={[
        "FOX Sports surfaces trending content collections prominently on the home page, watch page, and league section fronts across four properties: the FOX Sports mobile app (FSAPP), FOX Sports .com (FSCOM), FOX Nation, and FOX Now. Each collection is a ranked list of videos and stories calculated from real user engagement — not editorial picks — making the feed feel fresh and relevant at any moment.",
        "The engine ingests five distinct event types: clips_started, clips_completed, story_read, live_stream_started, and live_stream_completed. Each event increments a time-windowed score for the associated content item. Eight configurable time windows (4 hours through 1 year) let different surfaces display trending data at the right granularity — breaking news uses short windows while evergreen league pages use longer ones.",
        "Scores are stored as sorted sets in Redis for sub-millisecond ranked reads, with S3 as the persistent backing store for all windowed score history. A C# .NET event consumer processes the Kafka stream, aggregates counts, and keeps both stores in sync.",
        "The initial EC2-based C# .NET API served up to 20,000 requests per minute. After a full infrastructure overhaul — migrating the serving layer to AWS Lambda behind CloudFront — throughput capacity more than doubled to 50,000 requests per minute with improved scaling elasticity and reduced operational overhead.",
      ]}
      diagrams={[
        {
          title: "System Architecture",
          description:
            "End-to-end flow from user event emission through Kafka ingestion, multi-window aggregation into Redis and S3, and dual-path serving via the original EC2 API and the overhauled Lambda + CloudFront stack.",
          chart: SYSTEM_ARCH,
        },
        {
          title: "Request Flow",
          description:
            "Sequence showing the parallel event ingestion path (left) and the read path from a client request through CloudFront, Lambda, and Redis with an S3 fallback.",
          chart: SEQUENCE,
        },
      ]}
      evolution={{
        title: "Infrastructure Evolution",
        items: [
          {
            phase: "Phase 1 — EC2 Deployment",
            detail:
              "Initial rollout ran a C# .NET API on EC2 instances behind a load balancer. Handled up to 20,000 requests per minute with manual scaling policies. Redis sorted sets provided low-latency rankings; S3 persisted all windowed score history.",
          },
          {
            phase: "Phase 2 — Lambda + CloudFront Overhaul",
            detail:
              "The serving layer was replatformed onto AWS Lambda to eliminate idle capacity costs and enable instant horizontal scaling. CloudFront was added as a CDN layer in front of Lambda, absorbing cache-hit traffic at the edge and reducing Lambda invocations. The overhaul raised peak throughput to 50,000 requests per minute while lowering p99 latency.",
          },
        ],
      }}
      challenges={[
        "Maintaining consistent rankings across 8 independent time windows without read/write contention in Redis under high concurrent event load.",
        "Designing a cache invalidation strategy that kept CDN-served responses fresh (within 60 seconds) without hammering the Lambda origin on every request.",
        "Ensuring event ordering and exactly-once count increments from Kafka consumers to prevent score drift during consumer restarts or rebalances.",
        "Migrating a live, high-traffic API from EC2 to Lambda with zero-downtime, requiring a shadow traffic phase and gradual cutover via weighted routing.",
      ]}
      tags={[
        "C#",
        ".NET",
        "Kafka",
        "Redis",
        "S3",
        "AWS Lambda",
        "CloudFront",
        "EC2",
        "Microservices",
        "REST APIs",
      ]}
    />
  );
}
