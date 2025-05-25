"use client"
import { ImageZoom } from "@/components/image-zoom"

interface BlogContentProps {
  content: string
}

export default function BlogContent({ content }: BlogContentProps) {
  // Add any additional client-side enhancements here if needed

  return (
    <>
      <div id="content" className="prose dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      <ImageZoom />
    </>
  )
}