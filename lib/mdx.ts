import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import remarkGfm from "remark-gfm"

const postsDirectory = path.join(process.cwd(), "content");
const contentDirectory = path.join(process.cwd(), "content/learn");
// Blog post interface
export interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  content: string
  image: string
  tags: string[]
}

// Learn topic and subtopic interfaces
export interface Subtopic {
  id: string
  title: string
  description: string
  videoUrl?: string
  content: string
}

export interface Topic {
  id: string
  title: string
  slug: string
  description: string
  image: string
  subtopics: Subtopic[]
}


export async function getAllBlogPostSlugs() {
  // Read all MDX files in the posts directory
  const files = fs.readdirSync(postsDirectory);

  // Extract slugs from filenames (e.g., post-1.mdx -> post-1)
  const slugs = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));

  return slugs;
}


export async function getAllTopicsAndSubtopics() {
  // Example structure: content/learn/javascript/arrays.mdx, content/learn/javascript/loops.mdx
  const topicDirs = fs.readdirSync(contentDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const topics = topicDirs.map((topicSlug) => {
    const subtopicDir = path.join(contentDirectory, topicSlug);
    const subtopicFiles = fs.readdirSync(subtopicDir)
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx$/, ""));

    return {
      slug: topicSlug,
      subtopics: subtopicFiles.map((subtopicId) => ({ id: subtopicId })),
    };
  });

  return topics;
}

// Function to get all blog posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const postsDirectory = path.join(process.cwd(), "content/blog")
  const filenames = fs.readdirSync(postsDirectory)

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const slug = filename.replace(/\.md$/, "")
      return await getBlogPostBySlug(slug)
    }),
  )

  // Sort posts by date in descending order
  return posts.sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1))
}

// Function to get a specific blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost> {
  const fullPath = path.join(process.cwd(), "content/blog", `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")

  // Parse frontmatter and content
  const { data, content } = matter(fileContents)

  // Convert markdown to HTML with GitHub Flavored Markdown support
  const processedContent = await remark()
    .use(html, { sanitize: false }) // Don't sanitize to allow custom HTML
    .use(remarkGfm) // Add GitHub Flavored Markdown support
    .process(content)

  const contentHtml = processedContent.toString()

  return {
    slug,
    title: data.title,
    date: data.date,
    author: data.author,
    excerpt: data.excerpt,
    content: contentHtml,
    image: data.image,
    tags: data.tags || [],
  }
}

// Function to get all learn topics
export async function getAllTopics(): Promise<Topic[]> {
  const topicsDirectory = path.join(process.cwd(), "content/learn")
  const topicFolders = fs.readdirSync(topicsDirectory)

  const topics = await Promise.all(
    topicFolders.map(async (folder) => {
      return await getTopicBySlug(folder)
    }),
  )

  return topics
}

// Function to get a specific topic by slug
export async function getTopicBySlug(slug: string): Promise<Topic> {
  const topicDirectory = path.join(process.cwd(), "content/learn", slug)

  // Read topic metadata from index.json if it exists, otherwise infer from directory name
  let topicMeta: any = {
    title: slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
  }
  const indexPath = path.join(topicDirectory, "index.json")

  if (fs.existsSync(indexPath)) {
    topicMeta = JSON.parse(fs.readFileSync(indexPath, "utf8"))
  }

  // Get all markdown files in the topic directory
  const subtopicFiles = fs.readdirSync(topicDirectory).filter((file) => file.endsWith(".md"))

  // Parse each subtopic file
  const subtopics = await Promise.all(
    subtopicFiles.map(async (filename) => {
      const id = filename.replace(/\.md$/, "")
      const fullPath = path.join(topicDirectory, filename)
      const fileContents = fs.readFileSync(fullPath, "utf8")

      // Parse frontmatter and content
      const { data, content } = matter(fileContents)

      // Convert markdown to HTML with GitHub Flavored Markdown support
      const processedContent = await remark()
        .use(html, { sanitize: false }) // Don't sanitize to allow custom HTML
        .use(remarkGfm) // Add GitHub Flavored Markdown support
        .process(content)

      const contentHtml = processedContent.toString()

      return {
        id,
        title: data.title,
        description: data.description,
        videoUrl: data.videoUrl,
        content: contentHtml,
      }
    }),
  )

  return {
    id: slug,
    title: topicMeta.title,
    slug,
    description: topicMeta.description || "Learn about this topic",
    image: topicMeta.image || "/placeholder.svg?height=300&width=600",
    subtopics,
  }
}
