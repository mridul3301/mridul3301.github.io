import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, FileText } from "lucide-react"
import type { Subtopic } from "@/lib/mdx"

interface SubtopicCardProps {
  subtopic: Subtopic
  topicSlug: string
  index: number
}

export default function SubtopicCard({ subtopic, topicSlug, index }: SubtopicCardProps) {
  return (
    <Card className="hover-card overflow-hidden border-l-4 border-muted">
      <CardContent className="p-0">
        <Link href={`/learn/${topicSlug}/${subtopic.id}`} className="block group">
          <div className="p-6 flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center font-semibold">
              {index}
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{subtopic.title}</h3>
              <p className="text-muted-foreground">{subtopic.description}</p>
              <div className="flex items-center text-sm font-medium text-green-600 dark:text-green-400 button-link button-link-green pt-2 group">
                <FileText className="mr-2 h-4 w-4" />
                <span>View Lesson</span>
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}
