import { ProjectLayout } from "@/components/project-layout";

export default function Page() {
  return (
    <ProjectLayout
      title="MapReduce PageRank"
      company="Personal Project"
      period="Spring 2020"
      summary="An implementation of Google's PageRank algorithm on Hadoop MapReduce, computing web page importance scores through iterative parallel distributed processing."
      overview={[
        "PageRank assigns importance scores to web pages based on the structure of inbound links — pages linked to by many important pages are themselves considered important. This project implemented the algorithm from scratch on a Hadoop cluster.",
        "The input graph is represented as an adjacency list. Each MapReduce iteration distributes rank contributions from each node to its outbound neighbors. After convergence (typically 10–50 iterations), each page has a stable rank score.",
        "The implementation leveraged Hadoop's distributed file system (HDFS) for storing intermediate graph states and Java's MapReduce API for defining Map and Reduce functions. The final output was sorted by rank to identify the most influential nodes.",
      ]}
      diagrams={[
        {
          title: "MapReduce Iteration",
          description: "One iteration of PageRank — each node distributes its rank to neighbors, then ranks are aggregated.",
          chart: `flowchart LR
    A[HDFS\\nGraph State] --> B[Mapper\\nEmit rank contributions\\nto each neighbor]
    B --> C[Shuffle & Sort\\nGroup by destination node]
    C --> D[Reducer\\nSum contributions\\n+ dangling rank]
    D --> E[HDFS\\nUpdated Graph State]
    E --> F{Converged?}
    F -->|No| B
    F -->|Yes| G[Final Rankings]`,
        },
      ]}
      challenges={[
        "Handling dangling nodes (pages with no outbound links) which sink rank out of the system without correction.",
        "Tuning the damping factor and convergence threshold to balance accuracy and iteration count.",
        "Serializing the graph state efficiently across HDFS reads/writes between iterations.",
      ]}
      tags={["Java", "Hadoop", "MapReduce", "HDFS", "Distributed Systems", "Graph Algorithms"]}
    />
  );
}
