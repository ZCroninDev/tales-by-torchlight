<script setup lang="ts">
import ExamplePostCards from "../components/ExamplePostCards.vue"
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center justify-center px-4">
        <div class="max-w-2xl w-full text-center">
            <h1 class="text-5xl font-extrabold text-gray-900 mb-4">Welcome to My Blog</h1>
            <p class="text-lg text-gray-700 mb-8">Insights, stories, and tutorials on web development, technology, and more. Dive in and explore the latest posts!</p>
            <a href="#posts" class="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition">All Posts</a>
        </div>
        <div id="posts" class="mt-16 w-full max-w-2xl">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Recent Posts</h2>

            <ExamplePostCards />
        </div>
    </div>
</template>
