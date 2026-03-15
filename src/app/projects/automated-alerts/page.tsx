import type { Metadata } from "next";
import { ProjectLayout } from "@/components/project-layout";

export const metadata: Metadata = {
  title: "Automated Alert Service — Jaimin Shah",
  description:
    "Personalized sports alert platform delivering news and video notifications to up to 3M subscribers per alert within 60 seconds.",
};

const SYSTEM_ARCH = `
graph TB
    subgraph Triggers["Alert Triggers"]
        CMS["Editorial CMS\\n(manual publish)"]
        GEF["Game Event Feed\\n(Kafka · live scores & events)"]
    end

    subgraph AlertService["Alert Service (Lambda · 50k req/min)"]
        ORCH["Alert Orchestrator\\n(C# .NET)"]
    end

    subgraph Targeting["Audience Targeting"]
        FAV["User Favorites Store\\n(DynamoDB)"]
        RECS["Implicit Recommendations API\\n(audience segmentation)"]
    end

    subgraph FanOut["Notification Fan-out"]
        SNS["AWS SNS\\nTopic per alert"]
        SQS["SQS Queues\\nplatform fanout"]
    end

    subgraph Channels["Delivery Channels"]
        FCM["FCM\\n(Android push)"]
        APNS["APNs\\n(iOS push)"]
        WEB["Web Push"]
    end

    subgraph Users["FOX Sports Fans"]
        SUB["Up to 3M subscribers\\nper notification"]
    end

    CMS -->|"alert payload"| ORCH
    GEF -->|"score / event trigger"| ORCH
    ORCH -->|"who follows this team/player?"| FAV
    FAV -->|"matched subscriber list"| ORCH
    ORCH -->|"audience refinement"| RECS
    RECS -->|"engagement-ranked segments"| ORCH
    ORCH --> SNS
    SNS --> SQS
    SQS --> FCM
    SQS --> APNS
    SQS --> WEB
    FCM --> SUB
    APNS --> SUB
    WEB --> SUB
`;

const SEQUENCE = `
sequenceDiagram
    participant SRC as Trigger (CMS / Game Feed)
    participant ORCH as Alert Orchestrator (Lambda)
    participant FAV as Favorites Store (DynamoDB)
    participant RECS as Recommendations API
    participant SNS as AWS SNS
    participant SQS as SQS
    participant DEV as Device (iOS / Android / Web)

    SRC->>ORCH: alert payload (content + entity tags)

    Note over ORCH,RECS: Audience Resolution (~seconds)
    ORCH->>FAV: query subscribers who follow entity
    FAV-->>ORCH: matched subscriber IDs (up to 3M)
    ORCH->>RECS: refine by engagement likelihood
    RECS-->>ORCH: ranked audience segments

    Note over ORCH,SQS: Fan-out
    ORCH->>SNS: publish alert to topic
    SNS->>SQS: route to platform queues (FCM / APNs / Web)

    Note over SQS,DEV: Delivery (20s – <60s end-to-end)
    SQS->>DEV: push notification (FCM / APNs / Web Push)
    DEV-->>DEV: alert received by fan
`;

export default function AutomatedAlertsPage() {
  return (
    <ProjectLayout
      title="Automated Alert Service"
      company="Fox Corporation"
      period="Sep 2021 – Mar 2026"
      summary="A high-throughput, personalized push notification platform that replaced manual editorial workflows at FOX Sports. Capable of delivering a single alert to up to 3 million subscribers within 20–60 seconds, with audience targeting driven by each fan's favorite teams, leagues, and athletes."
      stats={[
        { label: "Max Subscribers", value: "3M", sub: "per single notification" },
        { label: "Min Latency", value: "20s", sub: "trigger → device delivery" },
        { label: "Max Latency", value: "<60s", sub: "guaranteed SLA" },
        { label: "Throughput", value: "50k", sub: "requests / min · Lambda" },
      ]}
      overview={[
        "Before the Automated Alert Service, the FOX Sports editorial team manually selected alert recipients and triggered sends one by one — a slow process that couldn't scale with the pace of live sports events. The new system automated both the targeting and delivery pipeline, letting editors publish an alert and trust the platform to get it to the right fans instantly.",
        "Alerts can be triggered from two sources: the editorial CMS (for breaking news, injury reports, trade announcements) or a live game event feed consumed from Kafka (for score updates, game-start reminders, and final scores). Both paths funnel into the same Alert Orchestrator Lambda, which handles targeting and dispatch.",
        "Audience targeting is the core of the system. When an alert arrives tagged with a sports entity (a team, player, or league), the orchestrator queries the DynamoDB Favorites Store to find all subscribers who follow that entity. The Implicit Recommendations API then refines that audience by engagement likelihood, ensuring alerts reach fans most likely to act on them.",
        "Once the audience is resolved, the alert is published to an AWS SNS topic. SNS fans out to platform-specific SQS queues — one each for FCM (Android), APNs (iOS), and Web Push — which handle the final delivery to devices. This architecture decouples audience resolution from device delivery, allowing each layer to scale independently.",
        "The entire pipeline from trigger to device delivery runs in 20 to 60 seconds. The minimum latency of 20 seconds reflects a fast audience resolution against a hot DynamoDB table and an SNS fanout with no queuing backlog. The 60-second ceiling holds even under maximum load of 3 million concurrent deliveries.",
      ]}
      diagrams={[
        {
          title: "System Architecture",
          description:
            "Dual trigger paths (CMS and Game Event Feed) feed the Alert Orchestrator Lambda, which resolves the audience against DynamoDB and the Recommendations API, then fans out through SNS → SQS to FCM, APNs, and Web Push.",
          chart: SYSTEM_ARCH,
        },
        {
          title: "Alert Delivery Flow",
          description:
            "Sequence from trigger through audience resolution, SNS fan-out, and final device delivery — end-to-end within 20–60 seconds for up to 3M subscribers.",
          chart: SEQUENCE,
        },
      ]}
      evolution={{
        title: "From Manual to Automated",
        items: [
          {
            phase: "Manual Editorial Workflow",
            detail:
              "Editors hand-picked alert recipients and triggered sends manually through an internal CMS tool. Coverage was inconsistent, latency was measured in minutes, and targeting was broad — everyone or no one.",
          },
          {
            phase: "Favorites-Based Targeting",
            detail:
              "First automation milestone: the system began resolving alert audiences automatically from the DynamoDB Favorites Store. An editor publishes an alert tagged with a team; the platform handles finding all subscribers who follow that team and dispatching the send.",
          },
          {
            phase: "Recommendations-Refined Audience + Game Event Triggers",
            detail:
              "Implicit Recommendations API integration added engagement-likelihood scoring to audience segments, reducing alert fatigue by de-prioritizing low-engagement subscribers. Kafka-based game event triggers were added, enabling fully automated sends for live score events with zero editorial involvement.",
          },
        ],
      }}
      challenges={[
        "Resolving audiences of up to 3M subscribers against DynamoDB within a few seconds while keeping Lambda invocation costs predictable under variable alert volume.",
        "Guaranteeing a <60 second end-to-end latency SLA across the full fan-out chain (SNS → SQS → FCM/APNs/Web) even during peak game events when multiple alerts fire simultaneously.",
        "Preventing alert fatigue — ensuring fans don't receive duplicate or near-duplicate alerts for the same game event when multiple triggers fire in quick succession.",
        "Handling APNs and FCM token churn (expired or rotated device tokens) at scale without blocking the delivery pipeline or inflating error rates.",
      ]}
      tags={[
        "C#",
        ".NET",
        "AWS Lambda",
        "AWS SNS",
        "SQS",
        "DynamoDB",
        "Kafka",
        "FCM",
        "APNs",
        "Kubernetes",
        "Microservices",
      ]}
    />
  );
}
