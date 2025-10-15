import { computed } from "vue"

type Frontmatter = Record<string, string>

export type ParsedPost = {
    slug: string
    title: string
    date?: string
    excerpt: string
    author?: string
    body: string
}

const markdownFiles = import.meta.glob("~~/content/posts/*.md", { eager: true, query: "?raw", import: "default" }) as Record<string, string>

export function usePosts() {
    const posts = computed<ParsedPost[]>(() => {
        const parsed = Object.entries(markdownFiles).map(([path, content]) => parseMarkdownFile(path, content))

        return parsed.sort((a, b) => {
            if (!a.date && !b.date) return a.title.localeCompare(b.title)
            if (!a.date) return 1
            if (!b.date) return -1
            return new Date(b.date).getTime() - new Date(a.date).getTime()
        })
    })

    return { posts }
}

function parseMarkdownFile(filePath: string, raw: string): ParsedPost {
    const { frontmatter, body } = extractFrontmatter(raw)
    const slug = getSlugFromPath(filePath)
    const title = frontmatter.title || toTitleCase(slug)
    const excerpt = frontmatter.excerpt || buildExcerpt(body)

    return {
        slug,
        title,
        date: frontmatter.date,
        author: frontmatter.author,
        excerpt,
        body
    }
}

function extractFrontmatter(raw: string): { frontmatter: Frontmatter; body: string } {
    const match = raw.match(/^---\s*([\s\S]*?)\s*---\s*/)
    if (!match) {
        return { frontmatter: {}, body: raw.trim() }
    }

    const frontmatterBlock = match[1]
    const frontmatterLines = frontmatterBlock
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)

    const frontmatter = frontmatterLines.reduce<Frontmatter>((acc, line) => {
        const colonIndex = line.indexOf(":")
        if (colonIndex === -1) return acc

        const key = line.slice(0, colonIndex).trim()
        const rawValue = line.slice(colonIndex + 1).trim()
        const value = rawValue.replace(/^["']/, "").replace(/["']$/, "")

        if (!key) return acc
        acc[key] = value
        return acc
    }, {})

    const body = raw.slice(match[0].length).trim()
    return { frontmatter, body }
}

function getSlugFromPath(filePath: string): string {
    const fileName = filePath.split("/").pop() || filePath
    return fileName.replace(/\.md$/, "")
}

function toTitleCase(slug: string): string {
    return slug
        .split("-")
        .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
        .join(" ")
}

function buildExcerpt(body: string): string {
    const firstParagraph = body.split(/\n{2,}/).find((section) => section.trim()) || ""
    const plainText = firstParagraph.replace(/[#*_>-]/g, "").trim()
    return plainText.length > 180 ? plainText.slice(0, 177) + "..." : plainText
}
