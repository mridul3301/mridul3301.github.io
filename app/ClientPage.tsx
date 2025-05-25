"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Mail, Twitter, FileText, ArrowRight, ExternalLink, Calendar, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { publications } from "@/lib/publications"


export default function Home() {
  const featuredPublicationIds = [1, 2, 4]
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
                ML Engineer @ Keeper Dating Inc.
              </div>
              <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold tracking-tight">
                <span className="text-4xl">👋</span> Hey, I'm Mridul Sharma
              </h1>
              <h2 className="text-xl md:text-2xl font-medium text-muted-foreground max-w-2xl">
              Exploring large language models to enhance generalization and understand them.
              </h2>
            </div>

            <div className="space-y-6 text-muted-foreground max-w-2xl">
              <p className="text-lg">
                I am Machine Learning Engineer at Keeper Dating Inc. where I currently work on developing retrieval + ranking 
                algorithms for matchmaking and also on large language model distillation.
              </p>

              <div className="space-y-4">
                <h3 className="text-xl font-medium">My interests include:</h3>
                <ul className="space-y-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Large Language Models (LLMs)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Reinforcement Learning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Parallel Processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>AI for Social Good</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild className="rounded-full px-6 bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/publications">
                  <FileText className="mr-2 h-4 w-4" /> View Publications
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-6">
                <Link href="/blog">
                  <ExternalLink className="mr-2 h-4 w-4" /> Read My Blog
                </Link>
              </Button>
            </div>
          </div>

          <div
            className="w-full md:w-auto flex flex-col items-center"
            // initial={{ opacity: 0, scale: 0.9 }}
            // animate={{ opacity: 1, scale: 1 }}
            // transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-full max-w-xs md:max-w-sm">
              <div className="aspect-square rounded-2xl overflow-hidden border-4 border-primary/20 shadow-xl">
                <Image
                  src="/images/mridul.png"
                  alt="Mridul Sharma"
                  width={400}
                  height={400}
                  className="object-cover"
                  priority
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-8 mt-8 justify-center">
              <Link href="mailto:mridulsharma3301@gmail.com" className="transition-transform hover:scale-110 backdrop-blur-3xl bg-primary/10">
                  <Mail className="h-6 w-6" />
                  <span className="sr-only">Email</span>
                </Link>
              <Link href="https://x.com/mriiidullll" target="_blank" className="transition-transform hover:scale-110 backdrop-blur-3xl bg-primary/10">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://github.com/mridul3301" target="_blank" className="transition-transform hover:scale-110 backdrop-blur-3xl bg-primary/10">
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://scholar.google.com/citations?user=TSC8VqkAAAAJ&hl=en" target="_blank" className="transition-transform hover:scale-110 backdrop-blur-3xl bg-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269z" />
                  <path d="M12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
                </svg>
                <span className="sr-only">Google Scholar</span>
              </Link>
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
                    window.open(`https://doi.org/${pub.doi}`, "_blank", "noopener,noreferrer")
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
