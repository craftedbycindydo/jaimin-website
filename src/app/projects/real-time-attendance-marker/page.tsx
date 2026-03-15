import { ProjectLayout } from "@/components/project-layout";

export default function Page() {
  return (
    <ProjectLayout
      title="Real-Time Attendance Marker"
      company="University of Dayton"
      period="Spring 2021"
      summary="An automated face recognition system that identifies students in live online class feeds and logs attendance to MongoDB — achieving 82% prediction accuracy."
      stats={[
        { label: "Prediction Accuracy", value: "82%" },
        { label: "Recognition Methods", value: "2", sub: "Eigenfaces + LBP" },
        { label: "Storage", value: "MongoDB" },
        { label: "Framework", value: "OpenCV" },
      ]}
      overview={[
        "Manual attendance in online classes is disruptive and error-prone. This system automates the process by running face recognition against a live video stream and recording results without instructor intervention.",
        "Two recognition approaches were implemented and compared: Eigenfaces (PCA-based) and Local Binary Patterns Histograms (LBPH). Both models were trained on a preprocessed dataset of labeled student faces collected prior to deployment.",
        "Detected student identities are written in real time to a MongoDB collection keyed by session date, enabling later analysis of attendance trends. The final model achieved 82% prediction accuracy on the test set.",
      ]}
      diagrams={[
        {
          title: "System Architecture",
          description: "From live video capture through face detection, recognition, and attendance storage.",
          chart: `flowchart LR
    A[Live Video\\nStream] --> B[Frame Capture\\nOpenCV]
    B --> C[Face Detection\\nHaar Cascade]
    C --> D{Face\\nDetected?}
    D -->|No| B
    D -->|Yes| E[Feature Extraction]
    E --> F[Eigenfaces\\nPCA]
    E --> G[LBP\\nHistogram]
    F --> H[Classifier]
    G --> H
    H --> I[Student ID\\nPrediction]
    I --> J[(MongoDB\\nAttendance)]`,
        },
      ]}
      challenges={[
        "Lighting variability in home video setups significantly impacted detection accuracy.",
        "Building a sufficiently large and diverse training dataset from limited webcam images.",
        "Eigenfaces struggled with pose variation; LBP proved more robust to minor orientation changes.",
        "Real-time performance required careful frame-rate management to avoid processing lag.",
      ]}
      tags={["Python", "OpenCV", "MongoDB", "Eigenfaces", "LBP", "NumPy", "Haar Cascade"]}
    />
  );
}
