"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export function ImageZoom() {
  const [activeImage, setActiveImage] = useState<HTMLImageElement | null>(null)
  const [isZoomed, setIsZoomed] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Find all images in blog post content
    const contentImages = document.querySelectorAll(".prose img")

    // Add click event listeners to all images
    const handleImageClick = (e: Event) => {
      const img = e.target as HTMLImageElement
      setActiveImage(img)
      setIsZoomed(true)
      document.body.style.overflow = "hidden" // Prevent scrolling when zoomed
    }

    contentImages.forEach((img) => {
      img.classList.add("cursor-zoom-in", "transition-transform", "duration-300")
      img.addEventListener("click", handleImageClick)
    })

    // Cleanup event listeners
    return () => {
      contentImages.forEach((img) => {
        img.removeEventListener("click", handleImageClick)
      })
    }
  }, [])

  // Handle closing the zoomed image
  const handleClose = () => {
    setIsZoomed(false)
    document.body.style.overflow = "" // Restore scrolling
    setTimeout(() => setActiveImage(null), 300) // Wait for animation to complete
  }

  // Close on overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      handleClose()
    }
  }

  // Close on escape key
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isZoomed) {
        handleClose()
      }
    }

    window.addEventListener("keydown", handleEscKey)
    return () => window.removeEventListener("keydown", handleEscKey)
  }, [isZoomed])

  if (!activeImage) return null

  return (
    <div
      ref={overlayRef}
      className={cn(
        "fixed inset-0 bg-black/80 z-50 flex items-center justify-center transition-opacity duration-300",
        isZoomed ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
      aria-label="Image viewer"
    >
      <button
        className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
        onClick={handleClose}
        aria-label="Close image viewer"
      >
        <X className="h-6 w-6" />
      </button>

      <div className="w-full h-full max-w-[90vw] max-h-[90vh] flex items-center justify-center">
        <img
          src={activeImage.src || "/placeholder.svg"}
          alt={activeImage.alt}
          className={cn(
            "max-w-full max-h-full object-contain cursor-zoom-out transition-transform duration-300",
            isZoomed ? "scale-100" : "scale-90",
          )}
          onClick={handleClose}
        />
      </div>
    </div>
  )
}
