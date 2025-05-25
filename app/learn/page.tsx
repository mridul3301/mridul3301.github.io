import Link from "next/link"
import { Metadata } from "next"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, BookOpen } from "lucide-react"
import { getAllTopics } from "@/lib/mdx"

export const metadata: Metadata = {
  title: "Learn",
  description: "Educational materials on computational biology, genomics, and bioinformatics by Mridul Sharma.",
  openGraph: {
    title: "Learning Resources | Mridul Sharma",
    description: "Educational materials on computational biology, genomics, and bioinformatics by Mridul Sharma.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learning Resources | Mridul Sharma",
    description: "Educational materials on computational biology, genomics, and bioinformatics by Mridul Sharma.",
  },
}


// export default async function LearnPage() {

//   return(
//     <div className="container py-16 page-transition">
//       <div className="flex flex-col gap-12">
//         <div className="space-y-4">
//           <h1 className="text-4xl font-bold tracking-tight pt-20 page-heading-green">Coming Soon..</h1>
//           </div>
//           </div>
//       </div>
//   )
// }
export default async function LearnPage() {
  // Fetch topics from the content directory
  const topics = await getAllTopics()

  return (
    <div className="container py-16 page-transition">
      <div className="flex flex-col gap-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight pt-20 page-heading-green">Learning Resources</h1>
          <p className="text-xl text-muted-foreground text-center">
            Educational materials on computational biology, genomics, and bioinformatics
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {topics.map((topic) => (
            <Link href={`/learn/${topic.slug}`} key={topic.id}>
              <Card className="overflow-hidden group h-full hover-card">
                <CardContent className="p-0 h-full">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={topic.image || "/placeholder.svg"}
                      alt={topic.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <BookOpen className="h-5 w-5" />
                      <div className="text-sm">{topic.subtopics.length} Lessons</div>
                    </div>
                    <h3 className="text-2xl font-semibold">{topic.title}</h3>
                    <p className="text-muted-foreground">{topic.description}</p>
                    <div className="flex items-center text-sm font-medium text-green-600 dark:text-green-400 button-link button-link-green group">
                      Explore Topic{" "}
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
