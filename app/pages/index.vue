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
    <div class="min-h-screen flex flex-col items-center justify-center bg-emeraldDeep px-4">
        <div class="w-full max-w-2xl text-center">
            <h1 class="mb-4 text-5xl font-extrabold text-mist">Welcome to My Blog</h1>
            <p class="mb-8 text-lg text-haze">Insights, stories, and tutorials on web development, technology, and more. Dive in and explore the latest posts!</p>
            <NuxtLink to="/all-posts" class="inline-block rounded-full bg-torchGold px-6 py-3 text-emeraldDeep shadow transition hover:bg-torchOrange hover:text-mist">All Posts</NuxtLink>
        </div>
        <div id="posts" class="mt-16 w-full max-w-2xl">
            <h2 class="mb-6 text-2xl font-bold text-mist">Recent Posts</h2>

            <PostsCard :items="hasFeaturedCards ? featuredCards : undefined">
                <template #intro>
                    <p v-if="hasFeaturedCards" class="col-span-full text-center text-sm text-haze/80">
                        These highlights are powered by Markdown content. Override this slot from MDC to customize the intro.
                    </p>
                    <p v-else class="col-span-full text-center text-sm text-haze/80">
                        Add markdown files under <code class="font-mono text-xs rounded bg-emeraldSpruce/60 px-1 py-0.5 text-mist">content/posts</code> to populate this grid.
                    </p>
                </template>
                <template #card="{ card }">
                    <div class="grid gap-1">
                        <NuxtLink
                            :to="card.to ?? '/all-posts'"
                            class="block rounded-2xl border border-emeraldJade/30 bg-emeraldSpruce/80 p-6 text-left shadow transition hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-torchGold/70"
                        >
                            <h3 class="mb-2 text-xl font-semibold text-mist">{{ card.title }}</h3>
                            <p class="mb-4 text-haze">{{ card.description }}</p>
                            <span v-if="card.date" class="mb-2 block text-xs uppercase tracking-wide text-haze/70">Published {{ card.date }}</span>
                            <span class="text-sm font-semibold text-torchGold">Read more -></span>
                        </NuxtLink>
                    </div>
                </template>
            </PostsCard>
        </div>
    </div>
</template>
