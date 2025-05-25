import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowLeft, Twitter, Mail, FileText, Tag } from "lucide-react"
import { getBlogPostBySlug } from "@/lib/mdx"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { TableOfContents } from "@/components/table-of-contents"
import BlogContent from "./blog-content"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getBlogPostBySlug(resolvedParams.slug)

  if (!post) {
    return {
      title: "Blog Post Not Found",
    }
  }

  return {
    title: `${post.title} | Mridul`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const resolvedParams = await params;
  const post = await getBlogPostBySlug(resolvedParams.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container pt-20 py-16 page-transition">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4 group">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              <span className="transition-all duration-200 group-hover:text-base group-hover:font-medium">
                Back to Blog
              </span>
            </Link>
          </Button>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8">
            <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">{post.date}</span>
            </div>
            <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full">
              <Tag className="h-4 w-4" />
              <span className="text-sm">{post.author}</span>
            </div>
          </div>

          <div className="relative aspect-[2/1] overflow-hidden rounded-xl mb-8">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag, index) => (
              <span key={index} className="bg-muted px-3 py-1 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <BlogContent content={post.content} />

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-muted-foreground">Share this article:</div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30"
              >
                <Mail className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30"
              >
                <FileText className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <TableOfContents contentRef={{ current: null }} />
    </div>
  )
}
