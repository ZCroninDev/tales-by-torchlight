<script setup lang="ts">
import { computed } from "vue"
import { usePosts } from "~/composables/usePosts"

const { posts } = usePosts()

const latestPosts = computed(() =>
    posts.value.slice(0, 3).map((post) => ({
        ...post,
        to: `/posts/${post.slug}`,
        displayDate: post.date ? new Date(post.date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : null
    }))
)

const hasPosts = computed(() => latestPosts.value.length > 0)
</script>

<template>
    <div class="relative min-h-screen bg-emeraldDeep text-mist">
        <div class="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-gradient-to-b from-emeraldJade/20 via-transparent to-transparent blur-3xl" />
        <div class="pointer-events-none absolute -right-32 bottom-12 h-72 w-72 rounded-full bg-torchGold/25 blur-[140px]" />

        <main class="relative mx-auto flex w-full max-w-6xl flex-col gap-20 px-4 py-20 sm:px-8 lg:px-10">
            <section class="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                <div class="space-y-6">
                    <span class="inline-flex items-center gap-2 rounded-full border border-emeraldJade/50 bg-emeraldSpruce/70 px-5 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-haze/80">
                        Tales by Torchlight
                    </span>
                    <h1 class="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                        Dungeon masters, light the way for unforgettable adventures
                    </h1>
                    <p class="max-w-2xl text-lg text-haze sm:text-xl">
                        We share story-driven prep guides, safety-forward session zero playbooks, and campaign freebies designed to keep your table laughing, feeling heard, and begging for “one more scene.”
                    </p>
                    <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <NuxtLink
                            to="/freebies"
                            class="group inline-flex items-center justify-center gap-2 rounded-full bg-torchGold px-7 py-3 text-base font-semibold text-emeraldDeep shadow-lg shadow-torchGold/40 transition hover:-translate-y-0.5 hover:bg-torchOrange hover:text-mist"
                        >
                            Claim the Freebie Vault
                            <span aria-hidden="true" class="transition group-hover:translate-x-1">→</span>
                        </NuxtLink>
                        <NuxtLink
                            to="/all-posts"
                            class="inline-flex items-center justify-center gap-2 rounded-full border border-emeraldJade/40 px-7 py-3 text-base font-semibold text-mist transition hover:border-torchGold/70 hover:text-torchGold"
                        >
                            Browse the Latest Guides
                        </NuxtLink>
                    </div>
                    <p class="text-sm uppercase tracking-[0.35em] text-haze/70">
                        Session zero checklists · one-shot sparks · co-creative tools
                    </p>
                </div>

                <div class="relative overflow-hidden rounded-3xl border border-emeraldJade/40 bg-emeraldSpruce/80 p-8 shadow-xl shadow-emeraldJade/30">
                    <div class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(244,208,111,0.08),_transparent_55%)]" />
                    <h2 class="text-2xl font-semibold text-torchGold">Freebie spotlight</h2>
                    <p class="mt-4 text-sm text-haze/90">
                        Download the <strong>Starter Adventure Hook Pack</strong> — five drop-in prompts, NPC ties, and encounter twists to kick off your next session without scrambling.
                    </p>
                    <ul class="mt-6 space-y-3 text-sm text-haze/80">
                        <li class="flex items-start gap-2">
                            <span class="mt-1 text-torchGold">✹</span>
                            Lines &amp; veils worksheet to set tone before dice hit the table.
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="mt-1 text-torchGold">✹</span>
                            Printable character tracker for leveling between sessions.
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="mt-1 text-torchGold">✹</span>
                            Session highlights log to celebrate wins and iterate on pacing.
                        </li>
                    </ul>
                    <NuxtLink
                        to="/freebies"
                        class="mt-7 inline-flex items-center gap-2 rounded-full border border-torchGold/60 bg-emeraldDeep/60 px-5 py-2 text-sm font-semibold text-torchGold transition hover:bg-torchGold hover:text-emeraldDeep"
                    >
                        Explore all freebies
                        <span aria-hidden="true" class="text-base">↗</span>
                    </NuxtLink>
                </div>
            </section>

            <section class="grid gap-6 rounded-3xl border border-emeraldJade/30 bg-emeraldSpruce/80 p-10 shadow-lg shadow-emeraldJade/25 lg:grid-cols-3">
                <div class="lg:col-span-1">
                    <h2 class="text-2xl font-semibold text-mist">What keeps our table buzzing</h2>
                    <p class="mt-3 text-sm text-haze/80">
                        We obsess over collaborative play, session pacing, and consent-driven storytelling. Here is how that shows up in the guides you read.
                    </p>
                </div>
                <div class="grid gap-5 lg:col-span-2 sm:grid-cols-2">
                    <article class="rounded-2xl border border-emeraldJade/30 bg-emeraldDeep/60 p-6">
                        <h3 class="text-lg font-semibold text-torchGold">Session Zero Mastery</h3>
                        <p class="mt-2 text-sm text-haze">
                            Plug-and-play agendas, conversation starters, and expectation worksheets that leave every player seen and excited.
                        </p>
                    </article>
                    <article class="rounded-2xl border border-emeraldJade/30 bg-emeraldDeep/60 p-6">
                        <h3 class="text-lg font-semibold text-torchGold">Adventure Seeds &amp; Tools</h3>
                        <p class="mt-2 text-sm text-haze">
                            Campaign primers, encounter escalations, and downtime prompts tailored for nights when you only have 30 minutes to prep.
                        </p>
                    </article>
                    <article class="rounded-2xl border border-emeraldJade/30 bg-emeraldDeep/60 p-6 sm:col-span-2">
                        <h3 class="text-lg font-semibold text-torchGold">Real Table Debriefs</h3>
                        <p class="mt-2 text-sm text-haze">
                            Honest stories about what delighted our groups, what fizzled, and the tweaks that turned near-misses into campaign legends.
                        </p>
                    </article>
                </div>
            </section>

            <section id="posts" class="space-y-8">
                <div class="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
                    <h2 class="text-3xl font-semibold text-mist sm:text-4xl">Fresh from the fire</h2>
                    <NuxtLink
                        to="/all-posts"
                        class="inline-flex items-center gap-2 rounded-full border border-emeraldJade/40 px-4 py-2 text-sm font-semibold text-haze transition hover:border-torchGold/60 hover:text-torchGold"
                    >
                        See all posts
                    </NuxtLink>
                </div>

                <div v-if="hasPosts" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <NuxtLink
                        v-for="post in latestPosts"
                        :key="post.slug"
                        :to="post.to"
                        class="group flex flex-col gap-4 rounded-3xl border border-emeraldJade/35 bg-emeraldSpruce/75 p-6 text-left shadow transition hover:-translate-y-1 hover:border-torchGold/60 hover:shadow-lg"
                    >
                        <span class="text-xs uppercase tracking-[0.35em] text-haze/70">
                            {{ post.displayDate ?? "Just added" }}
                        </span>
                        <h3 class="text-xl font-semibold text-mist group-hover:text-torchGold">
                            {{ post.title }}
                        </h3>
                        <p class="flex-1 text-sm text-haze/90">
                            {{ post.excerpt }}
                        </p>
                        <span class="inline-flex items-center gap-2 text-sm font-semibold text-torchGold transition group-hover:gap-3">
                            Read the guide
                            <span aria-hidden="true">→</span>
                        </span>
                    </NuxtLink>
                </div>
                <p v-else class="rounded-3xl border border-emeraldJade/40 bg-emeraldSpruce/60 p-6 text-center text-sm text-haze/80">
                    Add new markdown files under
                    <code class="rounded bg-emeraldDeep/70 px-1 py-0.5 font-mono text-xs text-mist">content/posts</code>
                    to populate this feed.
                </p>
            </section>
        </main>
    </div>
</template>
