"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu } from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const navItems = [
  { name: "About", href: "/" },
  { name: "Publications", href: "/publications" },
  { name: "Blog", href: "/blog" },
  { name: "Experience", href: "/experience" },
  { name: "Learn", href: "/learn" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200",
        scrolled ? "bg-background/95 shadow-sm" : "bg-background/50",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div
          className="flex items-center gap-2"
          // initial={{ opacity: 0, x: -20 }}
          // animate={{ opacity: 1, x: 0 }}
          // transition={{ duration: 0.5 }}
        >
          <Link href="/" className="font-bold text-xl">
            Mridul Sharma
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <div
            className="flex items-center gap-6"
            // initial={{ opacity: 0, y: -10 }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {navItems.map((item, index) => (
              <div
                key={item.href}
                // initial={{ opacity: 0, y: -10 }}
                // animate={{ opacity: 1, y: 0 }}
                // transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "dynamic-underline px-3 py-2 text-sm font-medium transition-all duration-200",
                    pathname === item.href ? "active" : "",
                  )}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
          <ModeToggle />
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <ModeToggle />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden container py-4 border-t"
          // initial={{ opacity: 0, height: 0 }}
          // animate={{ opacity: 1, height: "auto" }}
          // exit={{ opacity: 0, height: 0 }}
          // transition={{ duration: 0.3 }}
        >
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-all duration-200 hover:font-semibold px-2 py-1 rounded",
                  pathname === item.href ? "text-lg font-semibold bg-primary/10" : "text-muted-foreground text-base",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
