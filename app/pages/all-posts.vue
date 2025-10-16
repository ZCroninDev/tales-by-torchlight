
<script setup lang="ts">
import { usePosts } from "~/composables/usePosts"

const { posts } = usePosts()
</script>

<template>
    <section class="mx-auto flex w-full max-w-4xl flex-col gap-8 rounded-3xl border border-emeraldJade/30 bg-emeraldSpruce/80 px-6 py-12 shadow-lg shadow-emeraldJade/25">
        <header class="text-center space-y-2">
            <slot name="heading" mdc-unwrap="p">
                <h1 class="text-4xl font-extrabold text-mist">Latest Posts</h1>
                <p class="text-base text-haze">
                    Add markdown files to
                    <code class="rounded bg-emeraldJade/30 px-2 py-1 font-mono text-sm text-mist">content/posts</code>
                    and they will appear here automatically.
                </p>
            </slot>
        </header>

        <slot name="intro" mdc-unwrap="p">
            <p class="text-center text-sm text-haze/80">
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
                <article class="flex h-full flex-col gap-4 rounded-2xl border border-emeraldJade/40 bg-emeraldDeep/70 p-6 shadow transition hover:shadow-lg">
                    <div class="space-y-2">
                        <slot name="post-title" :post="post" mdc-unwrap="p">
                            <h2 class="text-2xl font-semibold text-mist">{{ post.title }}</h2>
                        </slot>
                        <slot name="post-meta" :post="post" mdc-unwrap="p">
                            <p v-if="post.date || post.author" class="text-xs uppercase tracking-wide text-haze/70">
                                <span v-if="post.date">{{ post.date }}</span>
                                <span v-if="post.date && post.author" class="mx-2">&bull;</span>
                                <span v-if="post.author">{{ post.author }}</span>
                            </p>
                        </slot>
                        <slot name="post-excerpt" :post="post" mdc-unwrap="p">
                            <p class="text-sm text-haze">{{ post.excerpt }}</p>
                        </slot>
                    </div>

                    <slot name="post-footer" :post="post" mdc-unwrap="p">
                        <NuxtLink
                            :to="`/posts/${post.slug}`"
                            class="mt-auto inline-flex items-center text-sm font-semibold text-torchOrange hover:text-torchGold hover:underline"
                        >
                            Read full post ->
                        </NuxtLink>
                    </slot>
                </article>
            </slot>
        </div>

        <slot name="empty" v-else mdc-unwrap="p">
            <div class="rounded-2xl border border-dashed border-emeraldJade/40 bg-emeraldDeep/60 p-6 text-center text-mist">
                <p class="font-medium">No markdown posts found yet.</p>
                <p class="mt-2 text-sm">
                    Create a new file like
                    <code class="rounded bg-emeraldSpruce/60 px-2 py-1 font-mono text-mist">content/posts/my-first-post.md</code>
                    to get started.
                </p>
            </div>
        </slot>
    </section>
</template>
