<script setup lang="ts">
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
                    <NuxtLink
                        to="#signup"
                        class="mt-6 inline-flex items-center justify-center rounded-full bg-torchGold px-5 py-2 text-sm font-semibold text-emeraldDeep transition hover:bg-torchOrange hover:text-mist"
                    >
                        Grab this freebie
                    </NuxtLink>
                </article>
            </section>

            <section id="signup" class="rounded-2xl border border-torchGold/40 bg-emeraldSpruce/80 p-8 shadow-lg">
                <h2 class="text-2xl font-bold text-torchGold">Claim Your Downloads</h2>
                <p class="mt-2 text-sm text-haze/80">
                    Share your name and email so we can deliver every free resource straight to your inbox.
                </p>
                <form class="mt-6 grid gap-4 md:grid-cols-2" @submit.prevent>
                    <label class="flex flex-col gap-2 text-sm text-mist">
                        <span>Name</span>
                        <input
                            type="text"
                            name="name"
                            required
                            class="rounded-lg border border-emeraldJade/40 bg-emeraldDeep/80 px-3 py-2 text-base text-mist focus:border-torchGold focus:outline-none focus:ring-2 focus:ring-torchGold/60"
                            placeholder="A daring adventurer"
                        />
                    </label>
                    <label class="flex flex-col gap-2 text-sm text-mist">
                        <span>Email</span>
                        <input
                            type="email"
                            name="email"
                            required
                            class="rounded-lg border border-emeraldJade/40 bg-emeraldDeep/80 px-3 py-2 text-base text-mist focus:border-torchGold focus:outline-none focus:ring-2 focus:ring-torchGold/60"
                            placeholder="you@example.com"
                        />
                    </label>
                    <div class="md:col-span-2">
                        <button
                            type="submit"
                            class="w-full rounded-full bg-torchGold px-6 py-3 text-base font-semibold text-emeraldDeep transition hover:bg-torchOrange hover:text-mist"
                        >
                            Send me the freebies
                        </button>
                    </div>
                </form>
            </section>
        </div>
    </div>
</template>
