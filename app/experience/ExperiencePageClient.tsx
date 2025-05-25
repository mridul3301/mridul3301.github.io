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
    title: "Research Assistant",
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
    <div className="container py-16">
      <div className="flex flex-col gap-12">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight pt-20 page-heading">Experience</h1>
          <p className="text-xl text-muted-foreground text-center">My academic and professional journey</p>
        </div>

        {/* Timeline */}
        <div className="relative pl-8 md:pl-12 border-l">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="mb-12 last:mb-0 timeline-item">
              <div className="absolute left-0 w-7 h-7 md:w-9 md:h-9 rounded-full bg-background border-2 border-primary -translate-x-1/2 flex items-center justify-center timeline-dot">
                {exp.type === "education" ? (
                  <GraduationCap className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                ) : (
                  <Briefcase className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                )}
              </div>

              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 timeline-content">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <h3 className="text-xl font-semibold">{exp.title}</h3>
                      <Badge
                        variant={exp.type === "education" ? "secondary" : "outline"}
                        className={
                          exp.type === "education"
                            ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
                            : ""
                        }
                      >
                        {exp.type === "education" ? "Education" : "Work Experience"}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="text-lg font-medium">{exp.organization}</div>
                      <div className="text-muted-foreground">{exp.department}</div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {exp.startDate}
                            {exp.endDate ? ` - ${exp.endDate}` : ""}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    <p>{exp.description}</p>

                    {exp.achievements.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Key Achievements:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="transition-all duration-300">
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
