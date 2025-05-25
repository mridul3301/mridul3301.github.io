import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen } from "lucide-react"
import { getTopicBySlug } from "@/lib/mdx"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import SubtopicCard from "@/components/subtopic-card"

export async function generateMetadata({ params }: { params: { topic: string } }): Promise<Metadata> {
  const resolvedParams = await params;
  const topic = await getTopicBySlug(resolvedParams.topic)

  if (!topic) {
    return {
      title: "Topic Not Found",
    }
  }

  return {
    title: `${topic.title} | PhD Portfolio`,
    description: topic.description,
  }
}

export default async function TopicPage({ params }: { params: { topic: string } }) {
  const resolvedParams = await params;
  const topic = await getTopicBySlug(resolvedParams.topic)

  if (!topic) {
    notFound()
  }

  return (
    <div className="container pt-20 py-16 page-transition">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" asChild className="mb-4 group">
          <Link href="/learn">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
            <span className="transition-all duration-200 group-hover:text-base group-hover:font-medium">
              Back to Topics
            </span>
          </Link>
        </Button>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-muted p-2 rounded-full">
              <BookOpen className="h-6 w-6" />
            </div>
            <div className="text-sm text-muted-foreground">{topic.subtopics.length} Lessons</div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{topic.title}</h1>
          <p className="text-xl text-muted-foreground mb-8">{topic.description}</p>

          <div className="relative aspect-[3/1] overflow-hidden rounded-xl mb-8">
            <Image src={topic.image || "/placeholder.svg"} alt={topic.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
          </div>
        </div>

        {/* Subtopics */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold">Course Content</h2>
          <div className="space-y-6">
            {topic.subtopics.map((subtopic, index) => (
              <SubtopicCard key={subtopic.id} subtopic={subtopic} topicSlug={topic.slug} index={index + 1} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
