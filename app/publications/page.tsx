import type { Metadata } from "next"
import PublicationsPageClient from "./PublicationsPageClient"

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Research publications and academic papers by Mridul Sharma in AI and machine learning.",
  openGraph: {
    title: "Publications | Mridul Sharma",
    description:
      "Research publications and academic papers by Mridul Sharma in AI and machine learning.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Publications | Mridul Sharma",
    description:
      "Research publications and academic papers by Mridul Sharma in AI and machine learning.",
  },
}

export default function PublicationsPage() {
  return <PublicationsPageClient />
}
