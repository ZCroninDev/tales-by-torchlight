<script setup lang="ts">
import { computed } from "vue"
import ExamplePostCards from "~/components/ExamplePostCards.vue"
import { usePosts } from "~/composables/usePosts"

const { posts } = usePosts()

const featuredCards = computed(() =>
    posts.value.slice(0, 2).map((post) => ({
        title: post.title,
        description: post.excerpt,
        date: post.date,
        to: `/posts#${post.slug}`
    }))
)

const hasFeaturedCards = computed(() => featuredCards.value.length > 0)
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center justify-center px-4">
        <div class="max-w-2xl w-full text-center">
            <h1 class="text-5xl font-extrabold text-gray-900 mb-4">Welcome to My Blog</h1>
            <p class="text-lg text-gray-700 mb-8">Insights, stories, and tutorials on web development, technology, and more. Dive in and explore the latest posts!</p>
            <NuxtLink to="/posts" class="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition">All Posts</NuxtLink>
        </div>
        <div id="posts" class="mt-16 w-full max-w-2xl">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Recent Posts</h2>

            <ExamplePostCards :items="hasFeaturedCards ? featuredCards : undefined">
                <template #intro>
                    <p v-if="hasFeaturedCards" class="col-span-full text-center text-sm text-gray-600">
                        These highlights are powered by Markdown content. Override this slot from MDC to customize the intro.
                    </p>
                    <p v-else class="col-span-full text-center text-sm text-gray-500">
                        Add markdown files under <code class="font-mono text-xs bg-white/70 rounded px-1 py-0.5">content/posts</code> to populate this grid.
                    </p>
                </template>
                <template #card="{ card }">
                    <div class="grid gap-1">
                        <NuxtLink
                            :to="card.to ?? '/posts'"
                            class="block rounded-lg bg-white p-6 text-left shadow transition hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                        >
                            <h3 class="text-xl font-semibold text-purple-700 mb-2">{{ card.title }}</h3>
                            <p class="text-gray-600 mb-4">{{ card.description }}</p>
                            <span v-if="card.date" class="block text-xs text-gray-400 mb-2">Published {{ card.date }}</span>
                            <span class="text-sm font-medium text-purple-600">Read more -></span>
                        </NuxtLink>
                    </div>
                </template>
            </ExamplePostCards>
        </div>
    </div>
</template>
