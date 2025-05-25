"use client"

import { useState } from "react"
import Head from "next/head"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { publications } from "@/lib/publications"
import PublicationCard from "@/components/publication-card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, BookOpen, FileCode, Search, PresentationIcon } from "lucide-react"


export default function PublicationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [yearFilter, setYearFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  // Filter publications based on search term and filters
  const filteredPublications = publications.filter((pub) => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesYear = yearFilter === "all" || pub.year.toString() === yearFilter
    const matchesType = typeFilter === "all" || pub.type === typeFilter

    return matchesSearch && matchesYear && matchesType
  })

  // Get unique years for filter
  const years = Array.from(new Set(publications.map((pub) => pub.year))).sort((a, b) => b - a)

  // Count publications by type
  const journalCount = publications.filter((pub) => pub.type === "journal").length
  const reviewCount = publications.filter((pub) => pub.type === "review").length
  const preprintCount = publications.filter((pub) => pub.type === "preprint").length
  const conferenceCount = publications.filter((pub) => pub.type === "conference").length

  return (
    <>
      <Head>
        <title>Publications | Mridul Sharma</title>
      </Head>
      
    <div className="container py-16 page-transition">
      
      <div className="flex flex-col gap-12">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight pt-20 page-heading">Publications</h1>
          <p className="text-xl text-muted-foreground text-center">
            List of my research publications and preprints
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-lg p-6 shadow-sm border">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search publications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-4">
              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <Tabs defaultValue="all" onValueChange={setTypeFilter} value={typeFilter}>
              <TabsList className="w-full justify-start">
                <TabsTrigger value="all">All ({publications.length})</TabsTrigger>
                <TabsTrigger value="journal" className="flex items-center gap-1">
                  <Award className="h-4 w-4" /> Journal ({journalCount})
                </TabsTrigger>
                <TabsTrigger value="conference" className="flex items-center gap-1">
                  <PresentationIcon className="h-4 w-4" /> Conference ({conferenceCount})
                </TabsTrigger>
                <TabsTrigger value="review" className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" /> Review ({reviewCount})
                </TabsTrigger>
                <TabsTrigger value="preprint" className="flex items-center gap-1">
                  <FileCode className="h-4 w-4" /> Preprint ({preprintCount})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Publications List */}
        <div className="space-y-6">
          {filteredPublications.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-lg border">
              <p className="text-muted-foreground">No publications found matching your criteria.</p>
            </div>
          ) : (
            filteredPublications.map((pub) => (
              <PublicationCard key={pub.id} publication={pub} onTagClick={setSearchTerm} />
            ))
          )}
        </div>
      </div>
    </div>
    </>
  )
}
