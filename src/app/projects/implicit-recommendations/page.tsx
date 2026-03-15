import type { Metadata } from "next";
import { ProjectLayout } from "@/components/project-layout";

export const metadata: Metadata = {
  title: "Implicit Recommendations — Jaimin Shah",
  description:
    "Content-based personalization engine serving 50M+ FOX Sports users via batch and near real-time pipelines.",
};

const SYSTEM_ARCH = `
graph TB
    subgraph Signals["Signal Ingestion"]
        FSAPP["FOX Sports App / .com"]
        K["Kafka\\nuser-signals topic"]
        FSAPP -->|"favorites, clicks"| K
    end

    subgraph BatchPipeline["Batch Pipeline (every 12 hours)"]
        S3["S3\\nSignal Store"]
        DBR["Databricks\\nContent-Based Model Training"]
        PRE["Pre-computed\\nRecommendation Sets"]
        K -->|"sink"| S3
        S3 --> DBR
        DBR --> PRE
    end

    subgraph RTPipeline["Near Real-Time Pipeline (~1.5 min latency)"]
        SP["Stream Processor\\n(C# .NET Service)"]
        SCORER["Content Scorer\\naffinity re-ranking"]
        K --> SP
        SP --> SCORER
    end

    subgraph Storage["Storage"]
        DY["DynamoDB\\nbatch recommendations per user"]
        RC["Redis\\nnear real-time user profile cache"]
        PRE --> DY
        SCORER --> RC
    end

    subgraph Serving["Recommendation API (EC2)"]
        API["C# .NET API\\n50M+ users"]
        RC -->|"fresh signals < 1.5 min"| API
        DY -->|"batch fallback"| API
    end

    subgraph Consumers["Downstream Consumers"]
        HP["Home Page\\nPersonalized Feed"]
        NL["Newsletter\\nPersonalized Content"]
        AL["Alert Targeting\\nAudience Segments"]
        API --> HP
        API --> NL
        API --> AL
    end
`;

const SEQUENCE = `
sequenceDiagram
    participant App as FOX Sports App
    participant K as Kafka
    participant SP as Stream Processor (C# .NET)
    participant RC as Redis Cache
    participant API as Recommendation API
    participant DY as DynamoDB
    participant DBR as Databricks

    Note over App,DBR: Signal Capture & Real-Time Update
    App->>K: user clicks / favorites event
    K->>SP: consume signal (.NET consumer)
    SP->>RC: update user affinity profile
    Note over SP,RC: Near real-time latency ~1.5 min

    Note over K,DBR: Batch Recompute (every 12h)
    K-->>S3: sink signals via batch job
    S3->>DBR: run content-based model
    DBR-->>DY: write pre-computed recs per user

    Note over App,DY: Recommendation Serving
    App->>API: GET /recommendations?userId=X&surface=home
    API->>RC: fetch near real-time profile
    alt Fresh profile in Redis (< 1.5 min stale)
        RC-->>API: affinity scores → re-rank candidate pool
        API-->>App: personalized feed (real-time signals)
    else Profile stale or missing
        API->>DY: fetch batch pre-computed recs
        DY-->>API: ranked content IDs (up to 12h old)
        API-->>App: personalized feed (batch)
    end
`;

export default function ImplicitRecommendationsPage() {
  return (
    <ProjectLayout
      title="Implicit Recommendations"
      company="Fox Corporation"
      period="Sep 2021 – Mar 2026"
      summary="A content-based personalization engine that learned from passive user behavior — favorites and clicks — to personalize the FOX Sports home page, power audience targeting for editorial push alerts, and surface suggested content for the daily newsletter. Served over 50 million users via a hybrid batch and near real-time pipeline."
      stats={[
        { label: "Users Served", value: "50M+", sub: "personalized profiles" },
        { label: "Batch Cadence", value: "12h", sub: "full model recompute" },
        { label: "RT Latency (current)", value: "1.5 min", sub: "signal → feed update" },
        { label: "RT Latency (initial)", value: "5 min", sub: "reduced over 3–5 years" },
      ]}
      overview={[
        "Most recommendation systems rely on explicit user input — ratings, likes, subscriptions. The FOX Sports implicit recommendation engine takes a different approach: it infers user preferences entirely from passive behavior. When a user clicks on a story, watches a clip, or adds a team to their favorites, the system silently builds a preference profile without requiring any deliberate action from the fan.",
        "The engine uses a content-based filtering approach. Content items — articles, videos, live streams — are represented as feature vectors tagged with sports entities (teams, leagues, players, events). User affinity scores are computed by matching behavioral signals against those feature vectors, producing a ranked preference profile per user.",
        "The system operates on two pipelines. A batch pipeline runs every 12 hours on Databricks, retraining the content-based model against the full signal history stored in S3 and writing pre-computed recommendation sets to DynamoDB. A near real-time pipeline processes the same Kafka event stream through a C# .NET stream processor, updating a Redis user profile cache with fresh affinity scores so that recent activity (a new favorite, a just-watched clip) is reflected in the feed within roughly 1.5 minutes.",
        "At serving time, the C# .NET Recommendation API checks Redis first. If the profile is fresh, it re-ranks a candidate pool using live affinity scores. If not, it falls back to the DynamoDB batch recommendations. This hybrid strategy balances immediate responsiveness with the computational depth of a full batch model recompute.",
        "Beyond home page personalization, the same API powers two other systems: audience segmentation for editorial push alerts (so alerts are sent to fans most likely to engage) and personalized content selection for the daily newsletter. This makes the recommendation engine a shared personalization layer across the entire FOX Sports platform.",
      ]}
      diagrams={[
        {
          title: "System Architecture",
          description:
            "Dual-pipeline architecture: a 12-hour Databricks batch recompute feeds DynamoDB, while a C# .NET stream processor updates Redis near real-time. The serving API merges both signals for each request.",
          chart: SYSTEM_ARCH,
        },
        {
          title: "Request & Signal Flow",
          description:
            "Sequence showing a user signal flowing into both the real-time Redis update and the periodic batch pipeline, alongside the serving path with Redis-first and DynamoDB fallback.",
          chart: SEQUENCE,
        },
      ]}
      evolution={{
        title: "Latency Improvements Over Time",
        items: [
          {
            phase: "Initial Launch — 5 Minute Real-Time Latency",
            detail:
              "The first near real-time pipeline processed Kafka events in micro-batches via a C# .NET consumer, writing updated affinity profiles every ~5 minutes. This was a significant improvement over pure batch, but fast-moving events like game-time activity still felt stale in the feed.",
          },
          {
            phase: "Pipeline Optimization — Reduced to ~3 Minutes",
            detail:
              "Consumer group tuning, partition rebalancing, and reducing downstream write amplification brought the end-to-end latency from signal event to Redis write down to approximately 3 minutes.",
          },
          {
            phase: "Stream Processor Rewrite — ~1.5 Minute Latency",
            detail:
              "A full rewrite of the C# .NET stream processor with event-driven (rather than micro-batch) processing, combined with targeted Redis write optimizations, pushed latency down to ~1.5 minutes. This was the floor achievable given Kafka consumer group coordination overhead and downstream scoring time.",
          },
        ],
      }}
      challenges={[
        "Handling cold-start for new users with no behavioral history — solved by falling back to popularity-based recommendations from the trending engine until enough signals were accumulated.",
        "Keeping Redis affinity profiles consistent with DynamoDB batch state across 50M+ users without expensive full-table scans or cache stampedes on recompute completion.",
        "Tuning the content-based model to balance recency (recent signals should matter more) with stability (a single click shouldn't completely change recommendations).",
        "Reducing near real-time pipeline latency from 5 minutes to 1.5 minutes over multiple iterations without breaking the batch/real-time merge logic at the serving layer.",
        "Sharing the same recommendation API across three different consumers (home page, newsletter, alert targeting) with different freshness and latency requirements.",
      ]}
      tags={[
        "C#",
        ".NET",
        "Kafka",
        "Redis",
        "DynamoDB",
        "Databricks",
        "S3",
        "EC2",
        "Content-Based Filtering",
        "MLflow",
        "Microservices",
        "Stream Processing",
      ]}
    />
  );
}
