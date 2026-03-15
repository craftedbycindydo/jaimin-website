import { ProjectLayout } from "@/components/project-layout";

export default function Page() {
  return (
    <ProjectLayout
      title="Library Management System"
      company="University of Dayton"
      period="Spring 2020"
      summary="A full-stack web application for managing library book availability, withdrawals, and deposits — deployed across multiple GCP instances with Docker and a network load balancer."
      stats={[
        { label: "Cloud", value: "GCP" },
        { label: "Containers", value: "Docker" },
        { label: "Database", value: "MySQL" },
        { label: "Architecture", value: "Monolithic" },
      ]}
      overview={[
        "This project delivers a straightforward but production-aware library management system. Users can search book availability, check out titles, and return them through a clean web interface.",
        "The backend is built with Node.js and Express.js, backed by a MySQL database for transactional book and user records. The application is containerized using Docker for consistent deployment across environments.",
        "The system was deployed on multiple Google Cloud Platform (GCP) compute instances behind a network load balancer, demonstrating multi-instance deployment and basic horizontal scaling.",
      ]}
      diagrams={[
        {
          title: "System Architecture",
          description: "Request flow from browser through GCP load balancer to application containers and database.",
          chart: `flowchart LR
    A[Browser] --> B[GCP Network\\nLoad Balancer]
    B --> C[Docker Container\\nNode.js Instance 1]
    B --> D[Docker Container\\nNode.js Instance 2]
    C --> E[(MySQL\\nDatabase)]
    D --> E
    C --> F[Express.js\\nREST API]
    D --> F`,
        },
      ]}
      challenges={[
        "Ensuring consistent session state across multiple Node.js instances behind the load balancer.",
        "Designing the MySQL schema to handle concurrent checkouts without race conditions.",
        "Managing Docker networking so all instances could securely reach the shared database.",
      ]}
      tags={["Node.js", "Express.js", "MySQL", "Docker", "GCP", "JavaScript", "HTML/CSS"]}
    />
  );
}
