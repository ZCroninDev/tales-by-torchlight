<template>
    <div class="min-h-screen flex flex-col bg-emeraldDeep text-mist">
        <header class="border-b border-emeraldJade/40 bg-emeraldSpruce/95 text-mist">
            <div class="max-w-5xl mx-auto flex items-center justify-between px-4 py-4">
                <NuxtLink to="/" class="text-2xl font-extrabold text-torchGold transition hover:text-mist">Tales by Torchlight</NuxtLink>
                <nav class="flex items-center gap-4 text-sm font-medium text-haze/90">
                    <NuxtLink to="/" class="transition-colors hover:text-torchGold" exact-active-class="text-mist">Home</NuxtLink>
                    <NuxtLink to="/all-posts" class="transition-colors hover:text-torchGold" exact-active-class="text-mist">Posts</NuxtLink>
                    <NuxtLink to="/about" class="transition-colors hover:text-torchGold" exact-active-class="text-mist">About</NuxtLink>
                </nav>
            </div>
        </header>

        <main class="flex-1">
            <NuxtPage />
        </main>

        <footer class="border-t border-emeraldJade/40 bg-emeraldSpruce text-haze/90">
            <div class="max-w-5xl mx-auto flex flex-col gap-2 px-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
                <span>&copy; 2025 Tales by Torchlight. All rights reserved.</span>
                <span>Built with Nuxt 3 &amp; Tailwind CSS.</span>
            </div>
        </footer>
    </div>
</template>
