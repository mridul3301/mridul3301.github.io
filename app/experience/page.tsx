import type { Metadata } from "next"
import ExperiencePageClient from "./ExperiencePageClient"

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Academic and professional experience of Mridul Sharma in LLMs, RL, Bayesian Inference and Parallel Computing.",
  openGraph: {
    title: "Experience | Mridul Sharma",
    description:
      "Academic and professional experience of Mridul Sharma in LLMs, RL, Bayesian Inference and Parallel Computing.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience | Mridul Sharma",
    description:
      "Academic and professional experience of Mridul Sharma in LLMs, RL, Bayesian Inference and Parallel Computing.",
  },
}

export default function ExperiencePage() {
  return <ExperiencePageClient />
}
