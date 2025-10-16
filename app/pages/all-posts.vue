
<script setup lang="ts">
import { usePosts } from "~/composables/usePosts"

const { posts } = usePosts()
</script>

<template>
    <section class="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-12">
        <header class="text-center space-y-2">
            <slot name="heading" mdc-unwrap="p">
                <h1 class="text-4xl font-extrabold text-gray-900">Latest Posts</h1>
                <p class="text-base text-gray-600">
                    Add markdown files to
                    <code class="rounded bg-gray-100 px-2 py-1 font-mono text-sm">content/posts</code>
                    and they will appear here automatically.
                </p>
            </slot>
        </header>

        <slot name="intro" mdc-unwrap="p">
            <p class="text-center text-sm text-gray-500">
                Override the `intro` slot from Markdown to inject custom messaging with MDC syntax.
            </p>
        </slot>

        <div v-if="posts.length" class="grid gap-6 sm:grid-cols-2">
            <slot
                v-for="post in posts"
                :key="post.slug"
                name="post"
                :post="post"
            >
                <article class="flex h-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                    <div class="space-y-2">
                        <slot name="post-title" :post="post" mdc-unwrap="p">
                            <h2 class="text-2xl font-semibold text-purple-700">{{ post.title }}</h2>
                        </slot>
                        <slot name="post-meta" :post="post" mdc-unwrap="p">
                            <p v-if="post.date || post.author" class="text-xs uppercase tracking-wide text-gray-400">
                                <span v-if="post.date">{{ post.date }}</span>
                                <span v-if="post.date && post.author" class="mx-2">&bull;</span>
                                <span v-if="post.author">{{ post.author }}</span>
                            </p>
                        </slot>
                        <slot name="post-excerpt" :post="post" mdc-unwrap="p">
                            <p class="text-sm text-gray-600">{{ post.excerpt }}</p>
                        </slot>
                    </div>

                    <slot name="post-footer" :post="post" mdc-unwrap="p">
                        <NuxtLink
                            :to="`/posts/${post.slug}`"
                            class="mt-auto inline-flex items-center text-sm font-semibold text-purple-600 hover:text-purple-700 hover:underline"
                        >
                            Read full post ->
                        </NuxtLink>
                    </slot>
                </article>
            </slot>
        </div>

        <slot name="empty" v-else mdc-unwrap="p">
            <div class="rounded-2xl border border-dashed border-purple-300 bg-purple-50 p-6 text-center text-purple-700">
                <p class="font-medium">No markdown posts found yet.</p>
                <p class="mt-2 text-sm">
                    Create a new file like
                    <code class="rounded bg-white/70 px-2 py-1 font-mono">content/posts/my-first-post.md</code>
                    to get started.
                </p>
            </div>
        </slot>
    </section>
</template>
