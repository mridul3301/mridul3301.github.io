import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Video, BookOpen } from "lucide-react"
import { getTopicBySlug, getAllTopicsAndSubtopics } from "@/lib/mdx"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { TableOfContents } from "@/components/table-of-contents"

// Generate static parameters for the dynamic route
export async function generateStaticParams() {
  const topics = await getAllTopicsAndSubtopics();
  return topics.flatMap((topic) =>
    topic.subtopics.map((subtopic) => ({
      topic: topic.slug,
      subtopic: subtopic.id,
    }))
  );
}

export async function generateMetadata({ params }: { params: { topic: string; subtopic: string } }): Promise<Metadata> {
  const resolvedParams = await params;
  const topic = await getTopicBySlug(resolvedParams.topic)

  if (!topic) {
    return {
      title: "Topic Not Found",
    }
  }

  const subtopic = topic.subtopics.find((s) => s.id === resolvedParams.subtopic)

  if (!subtopic) {
    return {
      title: "Subtopic Not Found",
    }
  }

  return {
    title: `${subtopic.title} | ${topic.title} | PhD Portfolio`,
    description: subtopic.description,
  }
}

export default async function SubtopicPage({ params }: { params: { topic: string; subtopic: string } }) {
  const resolvedParams = await params;
  const topic = await getTopicBySlug(resolvedParams.topic)

  if (!topic) {
    notFound()
  }

  const subtopicIndex = topic.subtopics.findIndex((s) => s.id === resolvedParams.subtopic)

  if (subtopicIndex === -1) {
    notFound()
  }

  const subtopic = topic.subtopics[subtopicIndex]
  const prevSubtopic = subtopicIndex > 0 ? topic.subtopics[subtopicIndex - 1] : null
  const nextSubtopic = subtopicIndex < topic.subtopics.length - 1 ? topic.subtopics[subtopicIndex + 1] : null

  return (
    <div className="container pt-20 py-16 page-transition">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" asChild className="group">
            <Link href={`/learn/${resolvedParams.topic}`}>
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform" />
              <span className="transition-all duration-200">Back to {topic.title}</span>
            </Link>
          </Button>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>
              Lesson {subtopicIndex + 1} of {topic.subtopics.length}
            </span>
          </div>
        </div>

        <div className="mb-8">
          <div className="inline-block px-3 py-1 rounded-full bg-muted text-sm font-medium mb-4">{topic.title}</div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{subtopic.title}</h1>
          <p className="text-xl text-muted-foreground">{subtopic.description}</p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {subtopic.videoUrl && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                <h2 className="text-2xl font-bold">Video Lecture</h2>
              </div>
              <div className="aspect-video relative rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src={subtopic.videoUrl}
                  title={subtopic.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
            </div>
          )}

          <div id="content" className="prose dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: subtopic.content }} />
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t flex justify-between">
          {prevSubtopic ? (
            <Button variant="outline" asChild className="group">
              <Link href={`/learn/${resolvedParams.topic}/${prevSubtopic.id}`}>
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col items-start">
                  <span className="text-xs text-muted-foreground">Previous Lesson</span>
                  <span className="transition-all duration-200 group-hover:text-base group-hover:font-medium">
                    {prevSubtopic.title}
                  </span>
                </div>
              </Link>
            </Button>
          ) : (
            <div></div>
          )}

          {nextSubtopic ? (
            <Button variant="outline" asChild className="group">
              <Link href={`/learn/${resolvedParams.topic}/${nextSubtopic.id}`}>
                <div className="flex flex-col items-end">
                  
                  <span className="transition-all duration-200 group-hover:text-base group-hover:font-medium">
                    {nextSubtopic.title}
                  </span>
                </div>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              </Link>
            </Button>
          ) : (
            <div></div>
          )}
        </div>
      </div>

      {/* Table of Contents */}
      <TableOfContents contentRef={{ current: null }} />
    </div>
  )
}
