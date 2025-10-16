<script setup lang="ts">
import { computed } from "vue"
import { useRoute, createError, useSeoMeta } from "#imports"
import { usePosts } from "~/composables/usePosts"

const route = useRoute()
const { posts } = usePosts()

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
    title: () => (post.value ? `${post.value.title} - My Blog` : "Post"),
    description: () => post.value?.excerpt ?? undefined
})

function markdownToHtml(markdown: string): string {
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
        html += `<p>${paragraphBuffer.join(" ")}</p>`
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
        html += `<pre><code${langClass}>${codeContent}</code></pre>`
        inCodeBlock = false
        codeLang = ""
        codeBuffer = []
    }

    const formatInline = (input: string) => {
        const escaped = escapeHtml(input)
        const withLinks = escaped.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label: string, url: string) => {
            return `<a href="${escapeHtml(url)}" target="_blank" rel="noopener">${label}</a>`
        })

        return withLinks
            .replace(/`([^`]+)`/g, "<code>$1</code>")
            .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
            .replace(/__([^_]+)__/g, "<strong>$1</strong>")
            .replace(/\*([^*]+)\*/g, "<em>$1</em>")
            .replace(/_([^_]+)_/g, "<em>$1</em>")
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

        const headingMatch = bare.match(/^(#{1,6})\s+(.*)$/)
        if (headingMatch) {
            flushParagraph()
            flushList()
            const level = headingMatch[1].length
            const text = formatInline(headingMatch[2])
            html += `<h${level}>${text}</h${level}>`
            continue
        }

        if (bare.startsWith(">")) {
            flushParagraph()
            flushList()
            const text = formatInline(bare.replace(/^>\s?/, ""))
            html += `<blockquote>${text}</blockquote>`
            continue
        }

        if (/^[-*+]\s+/.test(bare)) {
            const text = formatInline(bare.replace(/^[-*+]\s+/, ""))
            if (listType !== "ul") {
                flushParagraph()
                flushList()
                html += "<ul>"
                listType = "ul"
            }
            html += `<li>${text}</li>`
            continue
        }

        if (/^\d+\.\s+/.test(bare)) {
            const text = formatInline(bare.replace(/^\d+\.\s+/, ""))
            if (listType !== "ol") {
                flushParagraph()
                flushList()
                html += "<ol>"
                listType = "ol"
            }
            html += `<li>${text}</li>`
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
    <article class="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-16">
        <NuxtLink to="/all-posts" class="text-sm font-medium text-purple-600 hover:underline">
            <- Back to all posts
        </NuxtLink>

        <header class="space-y-4">
            <h1 class="text-4xl font-bold text-gray-900">{{ post?.title }}</h1>
            <p v-if="post?.date || post?.author" class="text-sm uppercase tracking-wide text-gray-400">
                <span v-if="post?.date">{{ post?.date }}</span>
                <span v-if="post?.date && post?.author" class="mx-2">&bull;</span>
                <span v-if="post?.author">{{ post?.author }}</span>
            </p>
            <p v-if="post?.excerpt" class="text-lg text-gray-600">
                {{ post?.excerpt }}
            </p>
        </header>

        <div class="prose prose-slate max-w-none" v-html="renderedBody" />
    </article>
</template>
