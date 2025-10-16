<template>
    <div class="min-h-screen flex flex-col bg-emeraldSpruce/5 text-emeraldDeep">
        <header class="border-b border-emeraldJade/20 bg-emeraldDeep/95 text-torchGold backdrop-blur">
            <div class="max-w-5xl mx-auto flex items-center justify-between px-4 py-4">
                <NuxtLink to="/" class="text-2xl font-extrabold text-torchGold transition hover:text-torchOrange">My Blog</NuxtLink>
                <nav class="flex items-center gap-4 text-sm font-medium text-torchGold/80">
                    <NuxtLink to="/" class="transition-colors hover:text-torchOrange" exact-active-class="text-torchGold">Home</NuxtLink>
                    <NuxtLink to="/all-posts" class="transition-colors hover:text-torchOrange" exact-active-class="text-torchGold">Posts</NuxtLink>
                    <NuxtLink to="/about" class="transition-colors hover:text-torchOrange" exact-active-class="text-torchGold">About</NuxtLink>
                </nav>
            </div>
        </header>

        <main class="flex-1">
            <NuxtPage />
        </main>

        <footer class="border-t border-emeraldJade/20 bg-emeraldDeep text-torchGold/80">
            <div class="max-w-5xl mx-auto flex flex-col gap-2 px-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
                <span>&copy; 2025 My Blog. All rights reserved.</span>
                <span>Built with Nuxt 3 &amp; Tailwind CSS.</span>
            </div>
        </footer>
    </div>
</template>
