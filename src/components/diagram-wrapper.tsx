"use client";

import dynamic from "next/dynamic";

const MermaidDiagram = dynamic(
  () => import("@/components/mermaid-diagram").then((m) => m.MermaidDiagram),
  {
    ssr: false,
    loading: () => (
      <div className="h-48 animate-pulse rounded-lg bg-muted" />
    ),
  }
);

export function DiagramWrapper({ chart }: { chart: string }) {
  return <MermaidDiagram chart={chart} />;
}
