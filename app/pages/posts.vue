
<script setup lang="ts">
type Frontmatter = Record<string, string>

type ParsedPost = {
    slug: string
    title: string
    date?: string
    excerpt: string
    author?: string
    body: string
}

const markdownFiles = import.meta.glob("~~/content/posts/*.md", { eager: true, query: "?raw", import: "default" }) as Record<string, string>

const posts = computed<ParsedPost[]>(() => {
    const parsed = Object.entries(markdownFiles).map(([path, content]) => parseMarkdownFile(path, content))

    return parsed.sort((a, b) => {
        if (!a.date && !b.date) return a.title.localeCompare(b.title)
        if (!a.date) return 1
        if (!b.date) return -1
        return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
})

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
</script>

<template>
    <section class="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-12">
        <header class="text-center">
            <h1 class="text-4xl font-extrabold text-gray-900">Latest Posts</h1>
            <p class="mt-2 text-base text-gray-600">Add markdown files to <code class="rounded bg-gray-100 px-2 py-1 font-mono text-sm">content/posts</code> and they will appear here automatically.</p>
        </header>

        <div v-if="posts.length" class="grid gap-6 sm:grid-cols-2">
            <article
                v-for="post in posts"
                :key="post.slug"
                class="flex h-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
                <div class="space-y-2">
                    <h2 class="text-2xl font-semibold text-purple-700">{{ post.title }}</h2>
                    <p v-if="post.date || post.author" class="text-xs uppercase tracking-wide text-gray-400">
                        <span v-if="post.date">{{ post.date }}</span>
                        <span v-if="post.date && post.author" class="mx-2">&bull;</span>
                        <span v-if="post.author">{{ post.author }}</span>
                    </p>
                    <p class="text-sm text-gray-600">{{ post.excerpt }}</p>
                </div>
                <div class="mt-auto text-sm text-purple-600">Full post preview coming soon.</div>
            </article>
        </div>

        <div v-else class="rounded-2xl border border-dashed border-purple-300 bg-purple-50 p-6 text-center text-purple-700">
            <p class="font-medium">No markdown posts found yet.</p>
            <p class="mt-2 text-sm">Create a new file like <code class="rounded bg-white/70 px-2 py-1 font-mono">content/posts/my-first-post.md</code> to get started.</p>
        </div>
    </section>
</template>
