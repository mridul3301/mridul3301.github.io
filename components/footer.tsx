import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Mail, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Mridul Sharma</h3>
            <p className="text-sm text-muted-foreground">
              Artificial Intelligence Researcher
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-primary/10">
                <Link
                  href="https://x.com/mriiidullll"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-110"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-primary/10">
                <Link
                  href="https://scholar.google.es/citations?hl=en&pli=1&user=TSC8VqkAAAAJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269z" />
                    <path d="M12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
                  </svg>
                  <span className="sr-only">Google Scholar</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-primary/10">
                <Link
                  href="https://github.com/mridul3301"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-110"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-primary/10">
                <Link href="mailto:mridulsharma3301@gmail.com" className="transition-transform hover:scale-110">
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Link>
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Navigation</h3>
            <nav className="grid gap-2 text-sm">
              <Link
                href="/"
                className="text-muted-foreground transition-all duration-200 hover:text-foreground hover:translate-x-1"
              >
                About
              </Link>
              <Link
                href="/publications"
                className="text-muted-foreground transition-all duration-200 hover:text-foreground hover:translate-x-1"
              >
                Publications
              </Link>
              <Link
                href="/blog"
                className="text-muted-foreground transition-all duration-200 hover:text-foreground hover:translate-x-1"
              >
                Blog
              </Link>
              <Link
                href="/experience"
                className="text-muted-foreground transition-all duration-200 hover:text-foreground hover:translate-x-1"
              >
                Experience
              </Link>
              <Link
                href="/learn"
                className="text-muted-foreground transition-all duration-200 hover:text-foreground hover:translate-x-1"
              >
                Learn
              </Link>
            </nav>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-2 text-sm">
              <p className="text-primary hover:underline">
                <a href="mailto:jane.smith@example.com">mridulsharma3301@gmail.com</a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; 2025. Mridul Sharma. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <Link href="#" className="transition-all duration-200 hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="transition-all duration-200 hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
