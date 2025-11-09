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
  const workshopCount = publications.filter((pub) => pub.type === "Conference Workshop").length
  const preprintCount = publications.filter((pub) => pub.type === "preprint").length
  const conferenceCount = publications.filter((pub) => pub.type === "conference").length
  const reportCount = publications.filter((pub) => pub.type === "Technical Report").length


  return (
    <>
      <Head>
        <title>Publications | Mridul Sharma</title>
      </Head>
      
      <div className="container py-8 md:py-16 page-transition px-4 md:px-6">
        <div className="flex flex-col gap-8 md:gap-12">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight pt-12 md:pt-20 page-heading text-center">
              Publications
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-center">
              List of my research publications and preprints
            </p>
          </div>

          {/* Filters */}
          <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm border">
            <div className="flex flex-col gap-3 md:gap-4">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search publications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 h-10 md:h-11"
                />
              </div>

              {/* Year Filter */}
              <div className="flex justify-center md:justify-start">
                <Select value={yearFilter} onValueChange={setYearFilter}>
                  <SelectTrigger className="w-full max-w-[140px] h-10 md:h-11">
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

            {/* Type Filter Tabs */}
            <div className="mt-4 overflow-x-auto">
              <Tabs defaultValue="all" onValueChange={setTypeFilter} value={typeFilter}>
                <TabsList className="w-full justify-start min-w-fit">
                  <TabsTrigger value="all" className="text-xs md:text-sm px-2 md:px-3">
                    All ({publications.length})
                  </TabsTrigger>
                  <TabsTrigger value="journal" className="flex items-center gap-1 text-xs md:text-sm px-2 md:px-3">
                    <Award className="h-3 w-3 md:h-4 md:w-4" /> 
                    <span className="hidden sm:inline">Journal</span>
                    <span className="sm:hidden">J</span> ({journalCount})
                  </TabsTrigger>
                  <TabsTrigger value="conference" className="flex items-center gap-1 text-xs md:text-sm px-2 md:px-3">
                    <PresentationIcon className="h-3 w-3 md:h-4 md:w-4" /> 
                    <span className="hidden sm:inline">Conference</span>
                    <span className="sm:hidden">C</span> ({conferenceCount})
                  </TabsTrigger>
                  <TabsTrigger value="Conference Workshop" className="flex items-center gap-1 text-xs md:text-sm px-2 md:px-3">
                    <BookOpen className="h-3 w-3 md:h-4 md:w-4" /> 
                    <span className="hidden sm:inline">Workshop</span>
                    <span className="sm:hidden">R</span> ({workshopCount})
                  </TabsTrigger>
                  <TabsTrigger value="preprint" className="flex items-center gap-1 text-xs md:text-sm px-2 md:px-3">
                    <FileCode className="h-3 w-3 md:h-4 md:w-4" /> 
                    <span className="hidden sm:inline">Preprint</span>
                    <span className="sm:hidden">P</span> ({preprintCount})
                  </TabsTrigger>
                  <TabsTrigger value="Technical Report" className="flex items-center gap-1 text-xs md:text-sm px-2 md:px-3">
                    <FileCode className="h-3 w-3 md:h-4 md:w-4" /> 
                    <span className="hidden sm:inline">Technical Report</span>
                    <span className="sm:hidden">T</span> ({reportCount})
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Publications List */}
          <div className="space-y-4 md:space-y-6">
            {filteredPublications.length === 0 ? (
              <div className="text-center py-8 md:py-12 bg-card rounded-lg border">
                <p className="text-muted-foreground text-sm md:text-base">
                  No publications found matching your criteria.
                </p>
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