<script setup lang="ts">
import { onMounted, ref } from "vue"

const resources = [
    {
        title: "Starter Adventure Hook Pack",
        description: "Five one-shot prompts to spark your next session, each with scene beats and suggested NPC motivations."
    },
    {
        title: "Printable Character Tracker",
        description: "A streamlined sheet to capture abilities, spells, and inventory without flipping through the Player's Handbook."
    },
    {
        title: "Session Zero Checklist",
        description: "Conversation starters to align the party on tone, safety tools, and campaign expectations from day one."
    }
]

const isModalOpen = ref(false)
const selectedResourceTitle = ref<string | null>(null)

const openSignup = (resourceTitle?: string) => {
    selectedResourceTitle.value = resourceTitle ?? null
    isModalOpen.value = true
}

const closeSignup = () => {
    isModalOpen.value = false
}

onMounted(() => {
    const win = window as Window & { ml?: (...args: unknown[]) => void }
    const ml =
        win.ml ||
        function (...args: unknown[]) {
            const queued = (ml as { q?: unknown[][] }).q || []
            queued.push(args)
            ;(ml as { q?: unknown[][] }).q = queued
        }
    win.ml = ml

    if (!document.querySelector('script[data-ml-universal="true"]')) {
        const script = document.createElement("script")
        script.async = true
        script.src = "https://assets.mailerlite.com/js/universal.js"
        script.dataset.mlUniversal = "true"
        document.head.appendChild(script)
    }

    ml("account", "2011815")
})
</script>

<template>
    <div class="min-h-screen bg-emeraldDeep px-4 py-12">
        <div class="mx-auto flex w-full max-w-4xl flex-col gap-12">
            <header class="text-center">
                <h1 class="text-4xl font-extrabold text-torchGold">Free D&D Resources</h1>
                <p class="mt-4 text-lg text-haze">
                    Build richer campaigns without reinventing the wheel. Download curated tools, checklists, and templates to
                    thrill your table.
                </p>
                <h2 class="mt-6 text-2xl font-semibold text-torchGold">
                    Claim the freebies
                </h2>
            </header>

            <section class="grid gap-6 md:grid-cols-2">
                <article
                    v-for="resource in resources"
                    :key="resource.title"
                    class="flex h-full flex-col justify-between rounded-2xl border border-emeraldJade/40 bg-emeraldSpruce/70 p-6 shadow"
                >
                    <div>
                        <h2 class="text-xl font-semibold text-mist">{{ resource.title }}</h2>
                        <p class="mt-3 text-sm text-haze/80">{{ resource.description }}</p>
                    </div>
                    <button
                        type="button"
                        class="mt-6 inline-flex items-center justify-center rounded-full bg-torchGold px-5 py-2 text-sm font-semibold text-emeraldDeep transition hover:bg-torchOrange hover:text-mist"
                        @click="openSignup(resource.title)"
                    >
                        Grab this freebie
                    </button>
                </article>
            </section>
        </div>

        <transition name="freebie-modal">
            <div
                v-show="isModalOpen"
                class="fixed inset-0 z-50 flex items-center justify-center bg-emeraldDeep/90 px-4 py-10"
                role="dialog"
                aria-modal="true"
                @click.self="closeSignup"
                @keydown.esc="closeSignup"
            >
                <div
                    class="relative w-full max-w-4xl rounded-3xl border border-torchGold/40 bg-emeraldSpruce/95 p-12 shadow-2xl"
                    data-modal-content
                >
                    <button
                        type="button"
                        class="absolute right-5 top-5 text-lg text-haze/70 transition hover:text-mist"
                        aria-label="Close"
                        @click="closeSignup"
                    >
                        X
                    </button>
                    <div class="grid gap-6 md:grid-cols-[1fr,1.25fr] md:items-start">
                        <div class="flex flex-col gap-4 text-left">
                            <h2 class="text-3xl font-bold text-torchGold">
                                Claim Your Downloads
                            </h2>
                            <p class="text-base text-haze/80">
                                {{ selectedResourceTitle ? "You're unlocking: " + selectedResourceTitle : "Drop your info once and we'll send every freebie straight to your inbox." }}
                            </p>
                            <p class="rounded-2xl border border-emeraldJade/40 bg-emeraldDeep/60 px-4 py-3 text-sm text-haze/70">
                                No spam, just adventure-ready tools to keep your table inspired.
                            </p>
                        </div>
                        <div class="ml-embedded" data-form="Xj0WLO"></div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<style scoped>
.freebie-modal-enter-active,
.freebie-modal-leave-active {
    transition: opacity 0.25s ease;
}
.freebie-modal-enter-from,
.freebie-modal-leave-to {
    opacity: 0;
}
.freebie-modal-enter-active [data-modal-content],
.freebie-modal-leave-active [data-modal-content] {
    transition: transform 0.25s ease, opacity 0.25s ease;
}
.freebie-modal-enter-from [data-modal-content],
.freebie-modal-leave-to [data-modal-content] {
    transform: translateY(12px) scale(0.97);
    opacity: 0;
}
</style>
