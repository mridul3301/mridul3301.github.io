"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronRight, List } from "lucide-react"

interface TableOfContentsProps {
  contentRef: React.RefObject<HTMLDivElement>
}

interface Heading {
  id: string
  text: string
  level: number
}

export function TableOfContents({ contentRef }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!contentRef.current) {
      // If contentRef is not available, try to find the content element by ID
      const contentElement = document.getElementById("content")
      if (!contentElement) return

      // Get all headings from the content
      const elements = Array.from(contentElement.querySelectorAll("h1, h2, h3, h4, h5, h6"))

      const headingElements = elements.map((element) => {
        // Create an id if one doesn't exist
        if (!element.id) {
          const id =
            element.textContent
              ?.toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^\w-]/g, "") || ""
          element.id = id
        }

        return {
          id: element.id,
          text: element.textContent || "",
          level: Number.parseInt(element.tagName.substring(1)), // Get heading level (1-6)
        }
      })

      setHeadings(headingElements)

      // Set up intersection observer to highlight active heading
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id)
            }
          })
        },
        { rootMargin: "0px 0px -80% 0px" },
      )

      elements.forEach((element) => observer.observe(element))

      return () => {
        elements.forEach((element) => observer.unobserve(element))
      }
    }
  }, [contentRef])

  if (headings.length === 0) return null

  return (
    <div className="fixed right-4 top-20 z-40">
      <div className="flex items-start">
        <Button variant="outline" size="icon" className="rounded-full shadow-md" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <ChevronRight className="h-4 w-4" /> : <List className="h-4 w-4" />}
        </Button>

        <div
          className={cn(
            "transition-all duration-300 overflow-hidden",
            isOpen ? "max-w-[250px] opacity-100 ml-2" : "max-w-0 opacity-0 ml-0",
          )}
        >
          <div className="bg-background border rounded-lg shadow-md p-4 w-[250px]">
            <h4 className="text-sm font-medium mb-4">Table of Contents</h4>
            <ul className="space-y-2 text-sm max-h-[calc(100vh-10rem)] overflow-auto">
              {headings.map((heading) => (
                <li key={heading.id} style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}>
                  <a
                    href={`#${heading.id}`}
                    className={cn(
                      "block py-1 transition-all duration-200",
                      activeId === heading.id
                        ? "text-base font-semibold"
                        : "text-muted-foreground hover:text-[15px] hover:font-medium",
                    )}
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(heading.id)?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
