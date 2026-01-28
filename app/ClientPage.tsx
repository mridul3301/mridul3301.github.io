"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Mail, Twitter, FileText, ArrowRight, ExternalLink, Calendar, User } from "lucide-react"
import { FaGithub, FaEnvelope, FaXTwitter } from "react-icons/fa6"
import { SiGooglescholar, SiSemanticscholar } from "react-icons/si"
import { Card, CardContent } from "@/components/ui/card"
import { publications } from "@/lib/publications"


export default function Home() {
  const featuredPublicationIds = [1, 2, 3]
  return (
    <div className="flex flex-col gap-16 pt-12 pb-16 page-transition ">
    
      {/* Hero Section with Gradient Background */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background particles/dots */}

        <div className="container relative pt-12 pb-20 flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div
            className="flex-1 space-y-8"
            // initial={{ opacity: 0, y: 20 }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ duration: 0.5 }}
          >
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 rounded-full bg-muted text-sm font-medium mb-2">
                AI Engineer @ Lamida Inc.
              </div>
              <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold tracking-tight">
                <span className="text-4xl">👋</span> Hey, I'm Mridul Sharma
              </h1>
              <h2 className="text-xl md:text-2xl font-medium text-muted-foreground max-w-2xl">
              Exploring Multimodal language modeling, RL & VLAs.
              </h2>
            </div>

            <div className="space-y-6 text-muted-foreground max-w-2xl">
              <p className="text-xl">
                I am AI Engineer at Lamida Inc. where I currently work on Multimodal AI with focus on Video Analysis.
              </p>

              <div className="space-y-4">
                <h3 className="text-xl font-medium">My interests lies somewhere in the intersection of:</h3>
                <ul className="space-y-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                  <li className="flex items-start gap-2 text-xl">
                    <span className="text-primary mt-1">•</span>
                    <span>Multimodal Language Modeling (MLLMs)</span>
                  </li>
                  <li className="flex items-start gap-2 text-xl">
                    <span className="text-primary mt-1">•</span>
                    <span>RL/Planning</span>
                  </li>
                  <li className="flex items-start gap-2 text-xl">
                    <span className="text-primary mt-1 ">•</span>
                    <span>Vision Language Action Models</span>
                  </li>
                  <li className="flex items-start gap-2 text-xl">
                    <span className="text-primary mt-1">•</span>
                    <span>Human-AI Interaction</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild variant="outline" className="rounded-full px-6 bg-blue-600 hover:bg-blue-900 text-white hover:text-white">
                <Link href="/publications">
                  <FileText className="mr-2 h-5 w-5" /> View Publications
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-6 bg-blue-600 hover:bg-blue-900 text-white hover:text-white">
                <Link href="/blog">
                  <ExternalLink className="mr-2 h-5 w-5" /> Read My Blog
                </Link>
              </Button>
            </div>
          </div>

          <div className="w-full md:w-auto flex flex-col items-center">
          {/* Profile Image */}
          <div className="relative w-auto max-w-xs md:max-w-sm">
            <div className="aspect-square rounded-2xl overflow-hidden border-4 border-primary/20 shadow-xl">
              <Image
                src="/images/mridul.png"
                alt="Mridul Sharma"
                width={240}
                height={240}
                className="object-cover"
                priority
              />
            </div>
            {/* Decorative Blur Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
          </div>

          {/* Social Icons */}
          {/* Social Icons */}
          <div className="flex gap-6 sm:gap-8 md:gap-12 mt-8 sm:mt-10 md:mt-12 justify-center flex-wrap">
            {[
              { href: "mailto:mridulsharma3301@gmail.com", Icon: FaEnvelope, label: "Email" },
              { href: "https://x.com/mriiidullll", Icon: FaXTwitter, label: "X/Twitter" },
              { href: "https://github.com/mridul3301", Icon: FaGithub, label: "GitHub" },
              { href: "https://scholar.google.com/citations?user=TSC8VqkAAAAJ&hl=en", Icon: SiGooglescholar, label: "Google Scholar" },
              { href: "https://www.semanticscholar.org/author/Mridul-Sharma/2332894534", Icon: SiSemanticscholar, label: "Semantic Scholar", scale: 1.15 },
            ].map(({ href, Icon, label, scale = 1.2 }, idx) => (
              <Link
                key={idx}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-full p-2 sm:p-3 bg-primary/20 hover:bg-primary/30 transition-transform hover:scale-110 sm:hover:scale-125"
              >
                <div className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 flex items-center justify-center" style={{ transform: `scale(${scale})` }}>
                  <Icon className="h-full w-full" />
                </div>
                <span className="sr-only">{label}</span>
              </Link>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* Featured Publications */}
      <section className="container">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-end">
            <div className="space-y-2">
              <h2 className="section-heading text-3xl font-bold tracking-tight">Featured Publications</h2>
              <p className="text-muted-foreground">Selected works from my research</p>
            </div>
            <Button variant="ghost" asChild className="group">
              <Link href="/publications" className="dynamic-underline">
                View All
              </Link>
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPublicationIds.map((id) => {
              const pub = publications.find((p) => p.id === id)
              if (!pub) return null // Skip if publication not found
              return (
                <Card
                  key={pub.id}
                  className="overflow-hidden h-full hover-card border-t-4 border-muted hover:cursor-pointer"
                  onClick={() =>
                    window.open(`${pub.pdf}`, "_blank", "noopener,noreferrer")
                  }
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted line-clamp-1">
                        {pub.journal}, {pub.year}
                      </div>
                      <h4 className="font-semibold leading-tight line-clamp-3">
                        {pub.title}
                      </h4>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {pub.abstract}
                    </p>
                    <div className="flex items-center gap-2 pt-2 border-t">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{pub.authors}</span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="container">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-end">
            <div className="space-y-2">
              <h2 className="section-heading text-3xl font-bold tracking-tight">Recent Blog Posts</h2>
              <p className="text-muted-foreground">Thoughts and insights on research and technology</p>
            </div>
            <Button variant="ghost" asChild className="group">
              <Link href="/blog" className="dynamic-underline">
                View All
              </Link>
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            {[
              {
                slug: "bayes",
                title: "Bayesian Statistics - Introduction",
                date: " Oct 12, 2023",
                author: "Mridul Sharma",
                image: "https://raw.githubusercontent.com/maxdecplanck/blog-images/refs/heads/main/bayes_images/cover.png",
                excerpt:
                  "Exploring how artificial intelligence is transforming our understanding of the genome and enabling personalized medicine.",
              },
              {
                slug: "eigen-vectors",
                title: "Eigenvalues and Eigenvectors",
                date: "Feb 18, 2023",
                author: "Mridul Sharma",
                image: "https://raw.githubusercontent.com/maxdecplanck/blog-images/refs/heads/main/eigen/cover.png",
                excerpt:
                  "How single-cell sequencing technologies are providing unprecedented insights into cellular heterogeneity and function.",
              },
            ].map((post) => (
              <Card key={post.slug} className="overflow-hidden h-full hover-card blog-card">
                <Link href={`/blog/${post.slug}`} scroll={true} className="block h-full">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.image}
                      alt="Blog post thumbnail"
                      fill
                      className="object-cover"
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
                    </div>                    {/* Title */}
                      <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>

                      {/* Read More button */}
                      <div className="pt-2">
                        <span className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 button-link button-link-blue group">
                          Read More{" "}
                          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
