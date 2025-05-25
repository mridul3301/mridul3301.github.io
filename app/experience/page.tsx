import type { Metadata } from "next"
import ExperiencePageClient from "./ExperiencePageClient"

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Academic and professional experience of Mridul Sharma in computational biology, genomics, and machine learning research.",
  openGraph: {
    title: "Experience | Mridul Sharma",
    description:
      "Academic and professional experience of Mridul Sharma in computational biology, genomics, and machine learning research.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience | Mridul Sharma",
    description:
      "Academic and professional experience of Mridul Sharma in computational biology, genomics, and machine learning research.",
  },
}

export default function ExperiencePage() {
  return <ExperiencePageClient />
}
