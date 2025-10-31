<script setup lang="ts">
import { computed } from "vue"
import { useRoute, createError, useSeoMeta } from "#imports"
import { usePosts } from "~/composables/usePosts"

const route = useRoute()
const { posts } = usePosts()

const assetManifestSource = import.meta.glob("~/assets/images/**/*", { eager: true, import: "default" }) as Record<string, string>
const assetManifest = Object.entries(assetManifestSource).reduce<Record<string, string>>((acc, [key, value]) => {
    const normalized = normalizeAssetKey(key)
    acc[normalized] = value
    acc[key] = value
    const withLeadingSlash = normalized.replace(/^~\/assets\//, "/assets/")
    acc[withLeadingSlash] = value
    const bare = normalized.replace(/^~\/assets\/images\//, "")
    acc[bare] = value
    return acc
}, {})

const slug = computed(() => {
    const value = route.params.slug
    return Array.isArray(value) ? value[0] : value
})

const post = computed(() => posts.value.find((entry) => entry.slug === slug.value))

if (!post.value) {
    throw createError({
        statusCode: 404,
        statusMessage: "Post not found"
    })
}

const renderedBody = computed(() => markdownToHtml(post.value?.body ?? ""))

useSeoMeta({
    title: () => (post.value ? `${post.value.title} - Tales by Torchlight` : "Post"),
    description: () => post.value?.excerpt ?? undefined
})

function markdownToHtml(markdown: string): string {
    const headingClassMap: Record<number, string> = {
        1: "post-heading mb-10 text-4xl font-semibold tracking-tight text-mist sm:text-5xl",
        2: "post-heading mb-8 text-3xl font-semibold tracking-tight text-mist",
        3: "post-heading mb-6 text-2xl font-semibold text-mist",
        4: "post-heading mb-5 text-xl font-semibold text-haze",
        5: "post-heading mb-4 text-lg font-semibold text-haze/90",
        6: "post-heading mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-haze/70"
    }

    const normalized = markdown.replace(/\r\n/g, "\n")
    const lines = normalized.split("\n")

    let html = ""
    let inParagraph = false
    let paragraphBuffer: string[] = []
    let listType: "ul" | "ol" | null = null
    let inCodeBlock = false
    let codeLang = ""
    let codeBuffer: string[] = []

    const flushParagraph = () => {
        if (!inParagraph) return
        html += `<p class="post-paragraph mb-6 text-base leading-relaxed text-haze/90 sm:text-lg">${paragraphBuffer.join(" ")}</p>`
        inParagraph = false
        paragraphBuffer = []
    }

    const flushList = () => {
        if (!listType) return
        html += listType === "ul" ? "</ul>" : "</ol>"
        listType = null
    }

    const flushCode = () => {
        if (!inCodeBlock) return
        const langClass = codeLang ? ` class="language-${escapeHtml(codeLang)}"` : ""
        const codeContent = escapeHtml(codeBuffer.join("\n"))
        html += `<pre class="post-pre mb-6 overflow-x-auto rounded-2xl bg-emeraldDeep/70 p-5 text-sm text-mist"><code${langClass} class="post-code">${codeContent}</code></pre>`
        inCodeBlock = false
        codeLang = ""
        codeBuffer = []
    }

    const formatInline = (input: string) => {
        const escaped = escapeHtml(input)
        const withImages = escaped.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]+)")?\)/g, (_, alt: string, src: string) => {
            const resolved = escapeHtml(resolveAssetPath(src))
            const altText = escapeHtml(alt)
            return `<img src="${resolved}" alt="${altText}" class="post-inline-image inline-block max-h-64 rounded-xl shadow-sm align-middle" />`
        })

        const withLinks = withImages.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label: string, url: string) => {
            return `<a href="${escapeHtml(url)}" target="_blank" rel="noopener" class="post-link underline decoration-torchGold/60 underline-offset-4 transition hover:decoration-mist">${label}</a>`
        })

        return withLinks
            .replace(/`([^`]+)`/g, '<code class="post-inline-code rounded bg-emeraldDeep/60 px-2 py-1 text-sm text-mist">$1</code>')
            .replace(/\*\*([^*]+)\*\*/g, '<strong class="post-strong text-mist">$1</strong>')
            .replace(/__([^_]+)__/g, '<strong class="post-strong text-mist">$1</strong>')
            .replace(/\*([^*]+)\*/g, '<em class="post-em text-haze">$1</em>')
            .replace(/_([^_]+)_/g, '<em class="post-em text-haze">$1</em>')
    }

    for (const line of lines) {
        const trimmed = line.trimEnd()
        const bare = trimmed.trim()

        if (bare.startsWith("```")) {
            if (inCodeBlock) {
                flushCode()
            } else {
                flushParagraph()
                flushList()
                inCodeBlock = true
                codeLang = bare.slice(3).trim()
            }
            continue
        }

        if (inCodeBlock) {
            codeBuffer.push(line)
            continue
        }

        if (!bare) {
            flushParagraph()
            flushList()
            continue
        }

        const imageMatch = bare.match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]+)")?\)$/)
        if (imageMatch) {
            flushParagraph()
            flushList()
            const alt = escapeHtml(imageMatch[1])
            const src = escapeHtml(resolveAssetPath(imageMatch[2]))
            const caption = imageMatch[3] ? formatInline(imageMatch[3]) : ""
            html += `<figure class="post-figure my-8 flex flex-col items-center gap-4"><img src="${src}" alt="${alt}" class="post-image w-full rounded-2xl shadow-lg" />`
            if (caption) {
                html += `<figcaption class="text-sm text-haze/80">${caption}</figcaption>`
            }
            html += `</figure>`
            continue
        }

        const headingMatch = bare.match(/^(#{1,6})\s+(.*)$/)
        if (headingMatch) {
            flushParagraph()
            flushList()
            const level = headingMatch[1].length
            const text = formatInline(headingMatch[2])
            const headingClass = headingClassMap[level as keyof typeof headingClassMap] || headingClassMap[6]
            html += `<h${level} class="${headingClass}">${text}</h${level}>`
            continue
        }

        if (bare.startsWith(">")) {
            flushParagraph()
            flushList()
            const text = formatInline(bare.replace(/^>\s?/, ""))
            html += `<blockquote class="post-quote mb-6 border-l-4 border-emeraldJade/40 pl-4 italic text-haze/80">${text}</blockquote>`
            continue
        }

        if (/^[-*+]\s+/.test(bare)) {
            const text = formatInline(bare.replace(/^[-*+]\s+/, ""))
            if (listType !== "ul") {
                flushParagraph()
                flushList()
                html += `<ul class="post-list mb-6 list-disc space-y-2 pl-6 text-haze/90">`
                listType = "ul"
            }
            html += `<li class="post-list-item leading-relaxed">${text}</li>`
            continue
        }

        if (/^\d+\.\s+/.test(bare)) {
            const text = formatInline(bare.replace(/^\d+\.\s+/, ""))
            if (listType !== "ol") {
                flushParagraph()
                flushList()
                html += `<ol class="post-list mb-6 list-decimal space-y-2 pl-6 text-haze/90">`
                listType = "ol"
            }
            html += `<li class="post-list-item leading-relaxed">${text}</li>`
            continue
        }

        if (!inParagraph) {
            inParagraph = true
            paragraphBuffer = []
        }

        paragraphBuffer.push(formatInline(bare))
    }

    flushParagraph()
    flushList()
    flushCode()

    return html
}

function normalizeAssetKey(input: string): string {
    const [pathWithoutQuery] = input.split("?")
    const normalized = pathWithoutQuery.replace(/\\/g, "/")
    const index = normalized.lastIndexOf("/assets/")
    if (index !== -1) {
        return `~/assets/${normalized.slice(index + "/assets/".length)}`
    }
    if (normalized.startsWith("~/assets/")) {
        return normalized
    }
    if (normalized.startsWith("/assets/")) {
        return `~${normalized}`
    }
    return `~/assets/${normalized.replace(/^~/, "").replace(/^assets\//, "")}`
}

function resolveAssetPath(value: string): string {
    const cleaned = value.trim().replace(/^['"]|['"]$/g, "")
    if (assetManifest[cleaned]) {
        return assetManifest[cleaned]
    }

    const normalized = cleaned
        .replace(/^@\/?/, "~/")
        .replace(/^~\//, "~/")
        .replace(/^\/assets\//, "~/assets/")
        .replace(/^assets\//, "~/assets/")

    return assetManifest[normalized] ?? assetManifest[normalized.replace(/^~\/assets\//, "")] ?? cleaned
}

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
}
</script>

<template>
    <article class="mx-auto my-12 flex w-full max-w-4xl flex-col gap-12 rounded-3xl border border-emeraldJade/30 bg-emeraldSpruce/90 px-8 py-16 shadow-xl shadow-emeraldJade/25 sm:px-12">
        <NuxtLink to="/all-posts" class="text-sm font-semibold text-torchGold hover:text-mist hover:underline">
            <- Back to all posts
        </NuxtLink>

        <header class="space-y-4">
            <h1 class="text-4xl font-bold leading-tight text-mist sm:text-5xl">{{ post?.title }}</h1>
            <p v-if="post?.date || post?.author" class="text-sm uppercase tracking-[0.35em] text-haze/80">
                <span v-if="post?.date">{{ post?.date }}</span>
                <span v-if="post?.date && post?.author" class="mx-2">&bull;</span>
                <span v-if="post?.author">{{ post?.author }}</span>
            </p>
            <p v-if="post?.excerpt" class="text-lg text-haze/90 sm:text-xl">
                {{ post?.excerpt }}
            </p>
        </header>

        <div class="post-content space-y-6 text-haze" v-html="renderedBody" />
    </article>
</template>
