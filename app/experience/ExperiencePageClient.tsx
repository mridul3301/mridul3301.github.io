"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Briefcase, GraduationCap } from "lucide-react"

// Sample experience data
const experiences = [
  {
    id: 1,
    title: "Machine Learning Engineer",
    organization: "Keeper Dating Inc",
    department: "",
    location: "Dover, USA",
    startDate: "Feb 2025",
    endDate: "Present",
    type: "work",
    description:
      "",
    achievements: [
    ],
  },
  {
    id: 2,
    title: "Co-Founder",
    organization: "Institute for Research and Innovation in Intelligent Systems (IRIIS)",
    department: "",
    location: "Lalitpur, Nepal",
    startDate: "Jan 2025",
    endDate: "Present",
    type: "work",
    description:
      "",
    achievements: [
    ],
  },
  {
    id: 3,
    title: "Research Collaborator",
    organization: "Kathmandu University",
    department: "Information and Language Processing Research Lab (ILPRL)",
    location: "Kavre, Nepal",
    startDate: "July 2024",
    endDate: "December 2024",
    type: "work",
    description:
      "",
    achievements: [
    ],
  },
  {
    id: 4,
    title: "Research Intern",
    organization: "Modulo Research",
    department: "",
    location: "Cambridge, United Kingdom",
    startDate: "May 2024",
    endDate: "August 2024",
    type: "work",
    description:
      "",
    achievements: [
    ],
  },
  {
    id: 5,
    title: "Research Assistant",
    organization: "AI Research Center, Advanced College of Engineering & Management",
    department: "Department of Computer Engineering",
    location: "Kathamandu, Nepal",
    startDate: "Oct 2023",
    endDate: "Feb 2024",
    type: "work",
    description:
      "",
    achievements: [
    ],
  },
  {
    id: 6,
    title: "AI Fellow",
    organization: "Fusemachines Inc",
    department: "",
    location: "Kathmandu, Nepal",
    startDate: "Jan 2023",
    endDate: "Dec 2023",
    type: "education",
    description:
      "",
    achievements: [
    ],
  },
  {
    id: 7,
    title: "Undergraduate Student",
    organization: "Advanced College of Engineering & Management",
    department: "Department of Computer Engineering",
    location: "Kathmandu, Nepal",
    startDate: "Nov 2018",
    endDate: "June 2023",
    type: "education",
    description:
      "",
    achievements: [
    ],
  },
  {
    id: 8,
    title: "Software Engineering Intern",
    organization: "Soft 9",
    department: "Software Development",
    location: "Kathmandu, Nepal",
    startDate: "Summer 2022",
    endDate: "",
    type: "work",
    description:
      "",
    achievements: [
    ],
  },
]

export default function ExperiencePage() {
  return (
    <div className="container py-8 md:py-16 px-4 md:px-6">
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight pt-12 md:pt-20 page-heading text-center">
            Experience
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-center">
            My academic and professional journey
          </p>
        </div>

        {/* Timeline */}
        <div className="relative pl-6 md:pl-8 lg:pl-12 border-l">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="mb-8 md:mb-12 last:mb-0 timeline-item">
              <div className="absolute left-0 w-6 h-6 md:w-7 md:h-7 lg:w-9 lg:h-9 rounded-full bg-background border-2 border-primary -translate-x-1/2 flex items-center justify-center timeline-dot">
                {exp.type === "education" ? (
                  <GraduationCap className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-primary" />
                ) : (
                  <Briefcase className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-primary" />
                )}
              </div>

              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 timeline-content">
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col gap-3 md:gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <h3 className="text-lg md:text-xl font-semibold leading-tight">
                          {exp.title}
                        </h3>
                        <Badge
                          variant={exp.type === "education" ? "secondary" : "outline"}
                          className={
                            exp.type === "education"
                              ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100 text-xs md:text-sm shrink-0 w-fit"
                              : "bg-blue-100  dark:bg-blue-900 text-xs md:text-sm shrink-0 w-fit"
                          }
                        >
                          {exp.type === "education" ? "Education" : "Work"}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-base md:text-lg font-medium leading-tight">
                        {exp.organization}
                      </div>
                      {exp.department && (
                        <div className="text-sm md:text-base text-muted-foreground">
                          {exp.department}
                        </div>
                      )}

                      <div className="flex flex-col gap-2 text-xs md:text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 md:h-4 md:w-4 shrink-0" />
                          <span className="leading-tight">
                            {exp.startDate}
                            {exp.endDate ? ` - ${exp.endDate}` : ""}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 md:h-4 md:w-4 shrink-0" />
                          <span className="leading-tight">{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {exp.description && (
                      <p className="text-sm md:text-base leading-relaxed">
                        {exp.description}
                      </p>
                    )}

                    {exp.achievements.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm md:text-base">Key Achievements:</h4>
                        <ul className="list-disc pl-4 md:pl-5 space-y-1">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="transition-all duration-300 text-sm md:text-base leading-relaxed">
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}