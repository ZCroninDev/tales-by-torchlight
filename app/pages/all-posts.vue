
<script setup lang="ts">
import { usePosts } from "~/composables/usePosts"

const { posts } = usePosts()
</script>

<template>
    <section class="relative mx-auto my-12 flex w-full max-w-5xl flex-col gap-10 overflow-hidden rounded-3xl border border-emeraldJade/30 bg-emeraldSpruce/95 px-6 py-14 shadow-xl shadow-emeraldJade/25 sm:px-10">
        <div class="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-emeraldJade/40 to-transparent" />

        <header class="relative text-center space-y-3">
            <slot name="heading" mdc-unwrap="p">
                <span class="inline-flex items-center gap-2 rounded-full border border-emeraldJade/40 bg-emeraldDeep/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-haze">
                    Latest dispatches
                </span>
                <h1 class="text-4xl font-extrabold tracking-tight text-mist sm:text-5xl">Fresh Tales from the Torchlight</h1>
                <p class="text-base text-haze/90 sm:text-lg">
                    Add markdown files to
                    <code class="rounded bg-emeraldJade/40 px-2 py-1 font-mono text-sm text-mist">content/posts</code>
                    and they will appear here automatically.
                </p>
            </slot>
        </header>

        <slot name="intro" mdc-unwrap="p">
            <p class="relative mx-auto max-w-2xl text-center text-sm text-haze/80 sm:text-base">
                Override the `intro` slot from Markdown to inject custom messaging with MDC syntax.
            </p>
        </slot>

        <div v-if="posts.length" class="relative grid gap-6 lg:grid-cols-2">
            <slot
                v-for="post in posts"
                :key="post.slug"
                name="post"
                :post="post"
            >
                <article class="group flex h-full flex-col justify-between gap-6 rounded-3xl border border-emeraldJade/40 bg-gradient-to-br from-emeraldDeep/85 via-emeraldSpruce/90 to-emeraldDeep/75 p-7 shadow transition duration-300 hover:border-torchGold/40 hover:shadow-2xl">
                    <div class="space-y-4">
                        <slot name="post-meta" :post="post" mdc-unwrap="p">
                            <div class="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-haze/70">
                                <span v-if="post.date">{{ post.date }}</span>
                                <span v-if="post.date && post.author" class="h-1 w-1 rounded-full bg-haze/60" />
                                <span v-if="post.author">{{ post.author }}</span>
                            </div>
                        </slot>

                        <slot name="post-title" :post="post" mdc-unwrap="p">
                            <h2 class="text-2xl font-semibold leading-snug text-mist transition group-hover:text-torchGold sm:text-[1.65rem]">
                                {{ post.title }}
                            </h2>
                        </slot>

                        <slot name="post-excerpt" :post="post" mdc-unwrap="p">
                            <p class="text-sm leading-relaxed text-haze/90 sm:text-base">
                                {{ post.excerpt }}
                            </p>
                        </slot>
                    </div>

                    <slot name="post-footer" :post="post" mdc-unwrap="p">
                        <NuxtLink
                            :to="`/posts/${post.slug}`"
                            class="inline-flex items-center gap-3 self-start rounded-full border border-transparent bg-torchGold/90 px-5 py-2 text-sm font-semibold text-emeraldDeep transition hover:bg-torchOrange/90 hover:text-mist focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-torchGold"
                        >
                            Continue reading
                            <span aria-hidden="true" class="text-base">→</span>
                        </NuxtLink>
                    </slot>
                </article>
            </slot>
        </div>

        <slot name="empty" v-else mdc-unwrap="p">
            <div class="relative rounded-3xl border border-dashed border-emeraldJade/40 bg-emeraldDeep/70 p-8 text-center text-mist">
                <p class="text-lg font-semibold">No markdown posts found yet.</p>
                <p class="mt-3 text-sm text-haze/80">
                    Create a new file like
                    <code class="rounded bg-emeraldSpruce/60 px-2 py-1 font-mono text-mist">content/posts/my-first-post.md</code>
                    to get started.
                </p>
            </div>
        </slot>
    </section>
</template>
