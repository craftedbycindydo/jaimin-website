import { ProjectLayout } from "@/components/project-layout";

export default function Page() {
  return (
    <ProjectLayout
      title="Underwater Document Recognition"
      company="University of Dayton — VMR Lab"
      period="Spring 2021"
      summary="A research framework applying OCR to degraded underwater document images, with rigorous image quality assessment and denoising benchmarks."
      overview={[
        "Underwater documents suffer from severe degradation — color distortion, blur, and low contrast — making standard OCR systems unreliable. This project built a complete pipeline to assess and improve image quality before applying text recognition.",
        "We designed a benchmark dataset by synthetically degrading reference images to simulate underwater conditions, giving us a controlled ground truth for evaluation.",
        "Image denoising was performed using Non-Local Means (NLM), low-pass, and high-pass filtering in Matlab before feeding images into a pytesseract OCR engine. Results were quantitatively evaluated using MSE, PSNR, and SSIM metrics, and analyzed visually through Tableau dashboards.",
        "The project was published as a research poster at the University of Dayton Stander Symposium.",
      ]}
      diagrams={[
        {
          title: "Processing Pipeline",
          description: "End-to-end flow from raw underwater image to OCR output and quality metrics.",
          chart: `flowchart LR
    A[Raw Underwater\\nImage] --> B[Pre-processing\\nNLM / LP / HP Filter]
    B --> C[Quality Assessment\\nMSE · PSNR · SSIM]
    C --> D{Quality\\nThreshold Met?}
    D -->|No| B
    D -->|Yes| E[pytesseract\\nOCR Engine]
    E --> F[Extracted Text]
    C --> G[Tableau\\nAnalysis]`,
        },
      ]}
      challenges={[
        "Building a representative synthetic benchmark dataset that accurately mimics real underwater degradation.",
        "Tuning NLM filter parameters to balance noise removal without losing fine text detail.",
        "Choosing the right combination of PSNR and SSIM as complementary metrics — PSNR alone is insufficient for perceptual quality.",
        "pytesseract sensitivity to minor image artifacts required careful pre-processing ordering.",
      ]}
      tags={["Python", "Matlab", "pytesseract", "OpenCV", "NumPy", "Tableau", "MSE/PSNR/SSIM", "NLM Filtering"]}
    />
  );
}
