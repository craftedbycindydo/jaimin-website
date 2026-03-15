import { ProjectLayout } from "@/components/project-layout";

export default function Page() {
  return (
    <ProjectLayout
      title="Speech-to-Text FAQ Assistant"
      company="Personal Project"
      period="Fall 2019"
      summary="A voice-driven FAQ system that converts spoken questions to text, classifies intent, extracts entities, and returns contextual answers using Google NLP and WIT.ai."
      overview={[
        "This project built an end-to-end conversational assistant for answering frequently asked questions using voice input. The system handles the full pipeline: speech capture, transcription, natural language understanding, and answer retrieval.",
        "Two NLP backends were integrated and compared: Google Cloud Natural Language API for entity recognition and WIT.ai for intent classification. Intent classification determines what the user is asking (e.g., 'hours', 'location', 'pricing'), while entity extraction identifies key objects mentioned.",
        "Matched intents are looked up against a FAQ knowledge base and the most relevant answer is returned. The system demonstrated a practical foundation for building voice-activated assistants without requiring a custom-trained model.",
      ]}
      diagrams={[
        {
          title: "System Flow",
          description: "From voice input through transcription, NLU, and answer retrieval.",
          chart: `flowchart LR
    A[Voice Input\\nMicrophone] --> B[Speech-to-Text\\nTranscription]
    B --> C[NLU Pipeline]
    C --> D[Google NLP\\nEntity Extraction]
    C --> E[WIT.ai\\nIntent Classification]
    D --> F[Query Builder]
    E --> F
    F --> G[(FAQ\\nKnowledge Base)]
    G --> H[Answer\\nResponse]`,
        },
      ]}
      challenges={[
        "Handling speech recognition errors that introduced noise into the NLU pipeline.",
        "Designing a FAQ schema expressive enough for WIT.ai intent training without overfitting to specific phrasings.",
        "Combining entity and intent signals into a single coherent query when both were present.",
      ]}
      tags={["Python", "Google NLP", "WIT.ai", "Speech Recognition", "NLU", "Intent Classification", "Entity Extraction"]}
    />
  );
}
