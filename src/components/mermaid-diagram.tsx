"use client";

import { useEffect, useRef, useId } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "neutral",
  fontFamily: "var(--font-geist-sans), sans-serif",
  fontSize: 13,
  flowchart: { curve: "basis", padding: 20 },
  sequence: { actorMargin: 60, messageMargin: 40 },
});

type Props = {
  chart: string;
  className?: string;
};

export function MermaidDiagram({ chart, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    mermaid.render(`mermaid-${id}`, chart).then(({ svg }) => {
      el.innerHTML = svg;
      // make SVG responsive
      const svgEl = el.querySelector("svg");
      if (svgEl) {
        svgEl.removeAttribute("height");
        svgEl.setAttribute("width", "100%");
      }
    });
  }, [chart, id]);

  return (
    <div
      ref={ref}
      className={className}
      aria-label="Architecture diagram"
    />
  );
}
