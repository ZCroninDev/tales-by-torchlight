<script setup lang="ts">
import { computed } from "vue"
import PostsCard from "~/components/PostsCard.vue"
import { usePosts } from "~/composables/usePosts"

const { posts } = usePosts()

const featuredCards = computed(() =>
    posts.value.slice(0, 2).map((post) => ({
        title: post.title,
        description: post.excerpt,
        date: post.date,
        to: `/posts/${post.slug}`
    }))
)

const hasFeaturedCards = computed(() => featuredCards.value.length > 0)
</script>

<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emeraldDeep/15 via-emeraldSpruce/10 to-torchGold/20 px-4">
        <div class="w-full max-w-2xl text-center">
            <h1 class="mb-4 text-5xl font-extrabold text-emeraldDeep">Welcome to My Blog</h1>
            <p class="mb-8 text-lg text-emeraldSpruce/80">Insights, stories, and tutorials on web development, technology, and more. Dive in and explore the latest posts!</p>
            <NuxtLink to="/all-posts" class="inline-block rounded-full bg-torchOrange px-6 py-3 text-white shadow transition hover:bg-torchGold hover:text-emeraldDeep">All Posts</NuxtLink>
        </div>
        <div id="posts" class="mt-16 w-full max-w-2xl">
            <h2 class="mb-6 text-2xl font-bold text-emeraldDeep">Recent Posts</h2>

            <PostsCard :items="hasFeaturedCards ? featuredCards : undefined">
                <template #intro>
                    <p v-if="hasFeaturedCards" class="col-span-full text-center text-sm text-emeraldSpruce/70">
                        These highlights are powered by Markdown content. Override this slot from MDC to customize the intro.
                    </p>
                    <p v-else class="col-span-full text-center text-sm text-emeraldSpruce/60">
                        Add markdown files under <code class="font-mono text-xs rounded bg-white/70 px-1 py-0.5 text-emeraldDeep">content/posts</code> to populate this grid.
                    </p>
                </template>
                <template #card="{ card }">
                    <div class="grid gap-1">
                        <NuxtLink
                            :to="card.to ?? '/all-posts'"
                            class="block rounded-2xl bg-white/90 p-6 text-left shadow transition hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-emeraldJade"
                        >
                            <h3 class="mb-2 text-xl font-semibold text-emeraldDeep">{{ card.title }}</h3>
                            <p class="mb-4 text-emeraldSpruce/80">{{ card.description }}</p>
                            <span v-if="card.date" class="mb-2 block text-xs uppercase tracking-wide text-emeraldSpruce/60">Published {{ card.date }}</span>
                            <span class="text-sm font-semibold text-torchOrange">Read more -></span>
                        </NuxtLink>
                    </div>
                </template>
            </PostsCard>
        </div>
    </div>
</template>
