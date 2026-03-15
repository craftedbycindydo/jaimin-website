import type { Metadata } from "next";
import { ProjectLayout } from "@/components/project-layout";

export const metadata: Metadata = {
  title: "Relevance Engine — Jaimin Shah",
  description:
    "NLP-powered content analysis engine that automatically tags FOX Sports articles and videos with sports entities and injects contextual web links.",
};

const SYSTEM_ARCH = `
graph TB
    subgraph Ingestion["Content Ingestion"]
        CMS["Editorial CMS\\n(article / video publish)"]
        K["Kafka\\ncontent-published topic"]
        CMS -->|"publish event"| K
    end

    subgraph RelevanceService["Relevance Engine (Lambda · 50k req/min)"]
        RE["Relevance Orchestrator\\n(C# .NET)"]
        NLP["NLP Entity Extractor\\n(named entity recognition)"]
        RE --> NLP
    end

    subgraph EntityResolution["Entity Resolution"]
        KG["Sports Knowledge Graph\\n(teams · players · leagues · events · venues)"]
        LS["Link Store\\n(canonical web links per entity)"]
        NLP -->|"extracted entity names"| KG
        KG -->|"resolved entity IDs + metadata"| RE
        RE -->|"entity ID lookup"| LS
        LS -->|"canonical URLs"| RE
    end

    subgraph Storage["Content Store"]
        PG["PostgreSQL\\ncontent metadata + entity tags"]
        GQL["GraphQL API\\ncontent enrichment layer"]
        RE -->|"write tags + links"| PG
        PG --> GQL
    end

    subgraph Consumers["Downstream Consumers"]
        MERCH["Merchandising\\nautomated content placement"]
        DISC["Discovery\\ncontent search & related articles"]
        FSAPP["FOX Sports App / .com"]
        GQL --> MERCH
        GQL --> DISC
        GQL --> FSAPP
    end

    K --> RE
`;

const SEQUENCE = `
sequenceDiagram
    participant CMS as Editorial CMS
    participant K as Kafka
    participant RE as Relevance Engine (Lambda)
    participant NLP as NLP Entity Extractor
    participant KG as Sports Knowledge Graph
    participant LS as Link Store
    participant PG as PostgreSQL
    participant GQL as GraphQL API

    CMS->>K: content-published event (article / video)
    K->>RE: consume event (real-time on publish)

    Note over RE,NLP: Entity Extraction
    RE->>NLP: pass article text / video transcript
    NLP-->>RE: extracted entity candidates\\n(teams, players, leagues, events, venues)

    Note over RE,KG: Entity Resolution
    RE->>KG: resolve entity names → canonical IDs
    KG-->>RE: matched entity records + confidence scores
    RE->>RE: filter by confidence threshold

    Note over RE,LS: Link Injection
    RE->>LS: fetch canonical URLs for resolved entities
    LS-->>RE: web links per entity

    Note over RE,PG: Write Enriched Metadata
    RE->>PG: upsert content with entity tags + links
    PG-->>GQL: enriched content available
    GQL-->>RE: ack
`;

export default function RelevanceEnginePage() {
  return (
    <ProjectLayout
      title="Relevance Engine"
      company="Fox Corporation"
      period="Sep 2021 – Mar 2026"
      summary="An NLP-powered content analysis engine that processed every article and video published across FOX Sports properties, automatically identifying and tagging the most relevant sports entities — teams, players, leagues, events, and venues — and enriching each piece of content with canonical web links. The tags powered automated merchandising and improved content discoverability across the entire platform."
      stats={[
        { label: "Throughput", value: "50k", sub: "requests / min · Lambda" },
        { label: "Entity Types", value: "5", sub: "teams · players · leagues · events · venues" },
        { label: "Trigger", value: "Real-time", sub: "on every content publish" },
        { label: "Downstream", value: "3", sub: "merchandising · discovery · app" },
      ]}
      overview={[
        "Every piece of content published across FOX Sports — articles, video clips, live blogs — references dozens of sports entities: team names, player names, league abbreviations, upcoming events, and venues. Manually tagging all of these was slow, inconsistent, and impossible to scale with the volume of content a major sports network produces daily.",
        "The Relevance Engine automated this entirely. Each time a piece of content is published via the editorial CMS, a Kafka event triggers the Relevance Engine Lambda, which processes the article text or video transcript through an NLP entity extractor. The extractor performs named entity recognition tuned specifically for sports terminology, identifying candidate entities in the content.",
        "Extracted entity names are then resolved against a Sports Knowledge Graph — a structured store of canonical records for teams, players, leagues, events, and venues. The resolution step handles disambiguation (multiple teams sharing a city name, player name collisions) and filters results by a confidence score threshold to prevent false-positive tags.",
        "Once entities are resolved, the engine fetches canonical web links for each from a Link Store and writes the full set of entity tags and links back to the content record in PostgreSQL. This enriched metadata is then available through the GraphQL API layer, which serves it to downstream consumers including the automated merchandising system, the content discovery and search layer, and the FOX Sports app and website.",
        "The end result was a platform where every article and video was automatically cross-linked to the teams, players, and events it referenced — enabling automated content placement, richer search results, and related content recommendations without any editorial overhead.",
      ]}
      diagrams={[
        {
          title: "System Architecture",
          description:
            "Content publish events flow from the CMS through Kafka to the Relevance Engine Lambda, which runs NLP extraction, resolves entities against the Sports Knowledge Graph, injects web links, and writes enriched metadata to PostgreSQL via the GraphQL API.",
          chart: SYSTEM_ARCH,
        },
        {
          title: "Processing Flow",
          description:
            "Sequence from content publish through entity extraction, knowledge graph resolution, confidence filtering, link injection, and final metadata write — all triggered in real time on every publish event.",
          chart: SEQUENCE,
        },
      ]}
      evolution={{
        title: "Evolution of Content Tagging",
        items: [
          {
            phase: "Manual Editorial Tagging",
            detail:
              "Tags were applied manually by editors before publish. Coverage was incomplete and inconsistent — high-profile articles got tagged thoroughly, while routine content was often left untagged, limiting discoverability and merchandising.",
          },
          {
            phase: "Rule-Based Entity Matching",
            detail:
              "An early automated system used keyword lists and regex patterns to match known entity names. Faster than manual tagging but brittle — unable to handle ambiguous names, abbreviations, or context-dependent references.",
          },
          {
            phase: "NLP-Powered Entity Extraction + Knowledge Graph Resolution",
            detail:
              "The full Relevance Engine replaced rule-based matching with NLP named entity recognition and a canonical Sports Knowledge Graph. Confidence scoring filtered out ambiguous matches, and the Link Store ensured all tags carried actionable web links for merchandising and navigation.",
          },
        ],
      }}
      challenges={[
        "Disambiguating sports entity names that appear across multiple contexts — for example, city names shared by multiple teams, or common player names that match athletes across different leagues.",
        "Maintaining the Sports Knowledge Graph as a live, authoritative source of truth for thousands of entities across active rosters, schedules, and league structures that change continuously.",
        "Tuning the NLP confidence threshold to balance precision (avoiding false-positive tags) against recall (not missing genuinely relevant entities in dense sports copy).",
        "Processing high-volume publish bursts during major events (trade deadline, draft day, playoff week) without Lambda cold-start latency or Kafka consumer lag impacting real-time tagging.",
      ]}
      tags={[
        "C#",
        ".NET",
        "AWS Lambda",
        "Kafka",
        "NLP",
        "PostgreSQL",
        "GraphQL",
        "AWS",
        "Microservices",
        "Content Tagging",
      ]}
    />
  );
}
