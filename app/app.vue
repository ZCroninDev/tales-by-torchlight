<template>
    <div class="min-h-screen flex flex-col bg-slate-50 text-gray-900">
        <header class="border-b border-slate-200 bg-white/80 backdrop-blur">
            <div class="max-w-5xl mx-auto flex items-center justify-between px-4 py-4">
                <NuxtLink to="/" class="text-2xl font-bold text-purple-600">My Blog</NuxtLink>
                <nav class="flex items-center gap-4 text-sm font-medium">
                    <NuxtLink to="/" class="transition-colors hover:text-purple-600" exact-active-class="text-purple-600">Home</NuxtLink>
                    <NuxtLink to="/all-posts" class="transition-colors hover:text-purple-600" exact-active-class="text-purple-600">Posts</NuxtLink>
                </nav>
            </div>
        </header>

        <main class="flex-1">
            <NuxtPage />
        </main>

        <footer class="border-t border-slate-200 bg-white/80 backdrop-blur">
            <div class="max-w-5xl mx-auto flex flex-col gap-2 px-4 py-6 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
                <span>&copy; 2025 My Blog. All rights reserved.</span>
                <span>Built with Nuxt 3 &amp; Tailwind CSS.</span>
            </div>
        </footer>
    </div>
</template>
