<script setup lang="ts">
const mobileMenuOpen = ref(false)
</script>

<template>
    <div class="min-h-screen flex flex-col bg-emeraldDeep text-mist">
        <header class="border-b border-emeraldJade/40 bg-emeraldSpruce/95 text-mist">
            <div class="max-w-5xl mx-auto flex items-center justify-between px-4 py-4">
                <NuxtLink to="/" class="text-2xl font-extrabold text-torchGold transition hover:text-mist">Tales by Torchlight</NuxtLink>

                <!-- Desktop nav: hidden below sm, flex on sm+ -->
                <nav class="hidden sm:flex items-center gap-4 text-sm font-medium text-haze/90">
                    <NuxtLink to="/" class="transition-colors hover:text-torchGold" exact-active-class="text-mist">Home</NuxtLink>
                    <NuxtLink to="/all-posts" class="transition-colors hover:text-torchGold" exact-active-class="text-mist">Posts</NuxtLink>
                    <NuxtLink to="/character-generator" class="transition-colors hover:text-torchGold" exact-active-class="text-mist">Character Generator</NuxtLink>
                    <NuxtLink to="/freebies" class="transition-colors hover:text-torchGold" exact-active-class="text-mist">Freebies</NuxtLink>
                    <NuxtLink to="/about" class="transition-colors hover:text-torchGold" exact-active-class="text-mist">About</NuxtLink>
                </nav>

                <!-- Hamburger button: only visible below sm -->
                <button
                    class="sm:hidden p-2 rounded-lg text-haze hover:text-torchGold hover:bg-emeraldJade/30 transition"
                    :aria-expanded="mobileMenuOpen"
                    aria-label="Toggle navigation"
                    @click="mobileMenuOpen = !mobileMenuOpen"
                >
                    <svg v-if="!mobileMenuOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Mobile dropdown: only visible below sm, only when open -->
            <nav
                v-if="mobileMenuOpen"
                class="sm:hidden border-t border-emeraldJade/30 flex flex-col px-4 py-3 gap-1 text-sm font-medium text-haze/90"
            >
                <NuxtLink to="/" class="rounded-lg px-3 py-2 transition-colors hover:bg-emeraldJade/20 hover:text-torchGold" exact-active-class="text-mist bg-emeraldJade/10" @click="mobileMenuOpen = false">Home</NuxtLink>
                <NuxtLink to="/all-posts" class="rounded-lg px-3 py-2 transition-colors hover:bg-emeraldJade/20 hover:text-torchGold" exact-active-class="text-mist bg-emeraldJade/10" @click="mobileMenuOpen = false">Posts</NuxtLink>
                <NuxtLink to="/character-generator" class="rounded-lg px-3 py-2 transition-colors hover:bg-emeraldJade/20 hover:text-torchGold" exact-active-class="text-mist bg-emeraldJade/10" @click="mobileMenuOpen = false">Character Generator</NuxtLink>
                <NuxtLink to="/freebies" class="rounded-lg px-3 py-2 transition-colors hover:bg-emeraldJade/20 hover:text-torchGold" exact-active-class="text-mist bg-emeraldJade/10" @click="mobileMenuOpen = false">Freebies</NuxtLink>
                <NuxtLink to="/about" class="rounded-lg px-3 py-2 transition-colors hover:bg-emeraldJade/20 hover:text-torchGold" exact-active-class="text-mist bg-emeraldJade/10" @click="mobileMenuOpen = false">About</NuxtLink>
            </nav>
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
