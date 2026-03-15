import { Navbar } from "@/components/navbar";

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
