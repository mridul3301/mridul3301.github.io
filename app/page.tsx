import ClientPage from "./ClientPage"

export const metadata = {
  title: "Home | Mridul Sharma",
  description:
    "Personal website of Mridul Sharma, AI Researcher exploring LLMs, RL & Parallel Computing.",
  openGraph: {
    title: "Mridul Sharma | AI Researcher",
    description:
      "Personal website of Mridul Sharma, a AI Researcher exploring LLMs, RL & Parallel Computing.",
    type: "website"
  },
}

export default function Home() {
  return <ClientPage />
}