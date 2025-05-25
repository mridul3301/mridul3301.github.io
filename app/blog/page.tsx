import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Calendar, User } from "lucide-react"
import { getAllBlogPosts } from "@/lib/mdx"

export const metadata: Metadata = {
  title: "Research Blog",
  description:
    "Thoughts, insights, and updates on research in computational biology, genomics, and bioinformatics by Mridul Sharma.",
  openGraph: {
    title: "Research Blog | Mridul Sharma",
    description:
      "Thoughts, insights, and updates on research in computational biology, genomics, and bioinformatics by Mridul Sharma.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Research Blog | Mridul Sharma",
    description:
      "Thoughts, insights, and updates on research in computational biology, genomics, and bioinformatics by Dr. Jane Smith.",
  },
}

export default async function BlogPage() {
  // Fetch blog posts from the content directory
  const blogPosts = await getAllBlogPosts()

  return (
    <div className="container py-16 page-transition">
      <div className="flex flex-col gap-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight pt-20 page-heading-blue">Research Blog</h1>
          <p className="text-xl text-muted-foreground text-center">
            Thoughts, insights, and updates on my research in computational biology and genomics
          </p>
        </div>

        {/* Blog Posts Grid - 2 cards per row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.slug} className="overflow-hidden group hover-card h-full blog-card">
              <Link href={`/blog/${post.slug}`} className="block h-full">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                </div>

                <CardContent className="p-6 relative">
                  {/* Date badge */}

                  <div className="space-y-4 pt-3">
                    {/* Author */}
                    <div className="absolute top-4 left-6 bg-background shadow-md px-3 py-1.5 rounded-full text-xs font-medium border flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {post.date}
                  </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="bg-muted px-2.5 py-1 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="bg-muted px-2.5 py-1 rounded-full text-xs">+{post.tags.length - 3}</span>
                      )}
                    </div>

                    {/* Read More button */}
                    <div className="pt-2">
                      <span className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 button-link button-link-blue group">
                        Read More <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
