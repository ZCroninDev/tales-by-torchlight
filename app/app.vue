
<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center justify-center px-4">
        <div class="max-w-2xl w-full text-center">
            <h1 class="text-5xl font-extrabold text-gray-900 mb-4">Welcome to My Blog</h1>
            <p class="text-lg text-gray-700 mb-8">Insights, stories, and tutorials on web development, technology, and more. Dive in and explore the latest posts!</p>
            <a href="#posts" class="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition">Read Latest Posts</a>
        </div>
        <div id="posts" class="mt-16 w-full max-w-2xl">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Latest Posts</h2>
            <div class="grid gap-6">
                <!-- Example post cards -->
                <div class="bg-white rounded-lg shadow p-6 text-left hover:shadow-lg transition">
                    <h3 class="text-xl font-semibold text-purple-700 mb-2">Getting Started with Nuxt 3</h3>
                    <p class="text-gray-600 mb-2">A beginner's guide to building fast and modern web apps with Nuxt 3.</p>
                    <span class="text-xs text-gray-400">September 10, 2025</span>
                </div>
                <div class="bg-white rounded-lg shadow p-6 text-left hover:shadow-lg transition">
                    <h3 class="text-xl font-semibold text-purple-700 mb-2">Why Tailwind CSS Rocks</h3>
                    <p class="text-gray-600 mb-2">Discover the power and flexibility of utility-first CSS with Tailwind.</p>
                    <span class="text-xs text-gray-400">September 5, 2025</span>
                </div>
            </div>
        </div>
    </div>
</template>


