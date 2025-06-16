"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, LinkIcon, Download, Award, BookOpen, FileCode, PresentationIcon } from "lucide-react"
import type { Publication } from "@/lib/publications"

interface PublicationCardProps {
  publication: Publication
  onTagClick: (tag: string) => void
}

export default function PublicationCard({ publication: pub, onTagClick }: PublicationCardProps) {
  // Function to open the DOI link
  const openDOI = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(`https://doi.org/${pub.doi}`, "_blank", "noopener,noreferrer")
  }

  // Function to open the PDF
  const openPDF = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(pub.pdf, "_blank", "noopener,noreferrer")
  }

  // Function to handle the main card click
  const handleCardClick = () => {
    window.open(`${pub.pdf}`, "_blank", "noopener,noreferrer")
  }

  // Get the appropriate icon based on publication type
  const getTypeIcon = () => {
    switch (pub.type) {
      case "journal":
        return <Award className="h-4 w-4 text-blue-500" />
      case "review":
        return <BookOpen className="h-4 w-4 text-green-500" />
      case "preprint":
        return <FileCode className="h-4 w-4 text-amber-500" />
      case "conference":
        return <PresentationIcon className="h-4 w-4 text-blue-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  // Get the border color based on publication type
  const getBorderColor = () => {
    switch (pub.type) {
      case "journal":
        return "hsl(var(--primary))"
      case "conference":
        return "#2563eb" // Blue
      case "review":
        return "hsl(142, 76%, 36%)"
      case "preprint":
        return "hsl(45, 100%, 51%)"
      default:
        return "hsl(var(--border))"
    }
  }

  return (
    <Card
      className="overflow-hidden cursor-pointer publication-card border-l-4 hover:shadow-md transition-all duration-300"
      onClick={handleCardClick}
      style={{
        borderLeftColor: getBorderColor(),
      }}
    >
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {getTypeIcon()}
                <span>
                  {pub.journal}, {pub.year}
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs bg-muted">
                  {pub.type.charAt(0).toUpperCase() + pub.type.slice(1)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={openPDF}
                  className="hover:bg-blue-100 dark:hover:bg-blue-900/30"
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={openDOI}
                  className="hover:bg-blue-100 dark:hover:bg-blue-900/30"
                >
                  <LinkIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <h3 className="text-xl font-semibold">{pub.title}</h3>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{pub.authors}</span>
            </div>
          </div>
          <p className="text-muted-foreground">{pub.abstract}</p>
          <div className="flex flex-wrap gap-2">
            {pub.tags.map((tag, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="rounded-full text-xs hover:bg-muted/80"
                onClick={(e) => {
                  e.stopPropagation()
                  onTagClick(tag)
                }}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
