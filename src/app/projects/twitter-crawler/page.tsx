import { ProjectLayout } from "@/components/project-layout";

export default function Page() {
  return (
    <ProjectLayout
      title="Twitter Crawler"
      company="Personal Project"
      period="Fall 2020"
      summary="A real-time Twitter data pipeline using twitter4j and tweepy to stream, process, and analyze tweets via REST APIs in both Java and Python."
      overview={[
        "This project explored real-time social media data processing by building a tweet ingestion pipeline that consumed Twitter's Streaming and REST APIs.",
        "The Java implementation used twitter4j to connect to the streaming API and parse incoming tweets delivered as JSON objects. The Python side used tweepy to query the REST API for historical and search-based tweet retrieval.",
        "The collected data was processed and analyzed in real time to extract patterns — top hashtags, user mentions, tweet frequency, and sentiment signals — demonstrating end-to-end data engineering on live API streams.",
      ]}
      diagrams={[
        {
          title: "Data Pipeline",
          description: "Tweet ingestion, processing, and analysis flow across both Java and Python implementations.",
          chart: `flowchart LR
    A[Twitter\\nStreaming API] --> B[twitter4j\\nJava Client]
    C[Twitter\\nREST API] --> D[tweepy\\nPython Client]
    B --> E[JSON\\nParser]
    D --> E
    E --> F[Data Processing\\nFilter · Normalize]
    F --> G[Real-Time\\nAnalysis]
    G --> H[Insights\\nHashtags · Mentions · Frequency]`,
        },
      ]}
      challenges={[
        "Handling Twitter API rate limits gracefully without dropping data during high-volume streams.",
        "Parsing inconsistent JSON schemas across different tweet types (retweets, replies, quotes).",
        "Coordinating two implementations (Java + Python) consuming the same underlying data for cross-validation.",
      ]}
      tags={["Python", "Java", "tweepy", "twitter4j", "REST APIs", "JSON", "Streaming"]}
    />
  );
}
