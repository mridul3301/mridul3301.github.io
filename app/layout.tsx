import type React from "react"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import Footer from "@/components/footer"
import ScrollToTop from "./scroll-to-top"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: {
    template: "%s | Mridul Sharma",
    default: "Mridul Sharma",
  },
  description:
    "AI Researcher exploring LLM, RL & Parallel Computing",
  keywords: ["NLP", "Nepali Language", "machine learning", "AI", "research", "Nepal"],
  authors: [{ name: "Mridul Sharma", url: "https://mridul3301.github.io/" }],
  creator: "Mridul Sharma",
  publisher: "Mridul Sharma",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mridul3301.github.io",
    siteName: "Mridul Sharma",
    title: "Mridul Sharma | AI Researcher",
    description:
      "AI Researcher exploring LLM, RL & Parallel Computing.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mridul Sharma - AI Researcher",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mridul Sharma | AI Researcher",
    description:
      "AI Researcher exploring LLM, RL & Parallel Computing.",
    creator: "@mriiidullll",
    images: ["https://pbs.twimg.com/profile_images/1815570905327636480/zaL7XhKo_400x400.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://mridulsharma.com.np"),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Navbar />
          <ScrollToTop />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'