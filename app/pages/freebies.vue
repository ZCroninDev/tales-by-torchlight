<script setup lang="ts">
import { ref } from "vue"
import { $fetch } from "ofetch"

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

const name = ref("")
const email = ref("")
const statusMessage = ref("")
const statusState = ref<"idle" | "success" | "error">("idle")
const isSubmitting = ref(false)
const isModalOpen = ref(false)
const selectedResourceTitle = ref<string | null>(null)

const resetFormState = () => {
    name.value = ""
    email.value = ""
    statusMessage.value = ""
    statusState.value = "idle"
    isSubmitting.value = false
}

const openSignup = (resourceTitle?: string) => {
    selectedResourceTitle.value = resourceTitle ?? null
    resetFormState()
    isModalOpen.value = true
}

const closeSignup = () => {
    isModalOpen.value = false
}

const handleSubmit = async () => {
    const trimmedName = name.value.trim()
    const trimmedEmail = email.value.trim()

    statusMessage.value = ""
    statusState.value = "idle"

    if (!trimmedName || !trimmedEmail) {
        statusMessage.value = "Please share both your name and email so we know where to deliver your loot."
        statusState.value = "error"
        return
    }

    try {
        isSubmitting.value = true
        await $fetch("/api/freebies/signups", {
            method: "POST",
            body: {
                name: trimmedName,
                email: trimmedEmail
            }
        })

        statusState.value = "success"
        statusMessage.value = `Thanks, ${trimmedName}! We'll send the freebies to ${trimmedEmail} shortly.`
        name.value = ""
        email.value = ""
    } catch (error: unknown) {
        // Nuxt's $fetch exposes error data under the "data" key when available.
        const message =
            (error as { data?: { statusMessage?: string; message?: string }; message?: string })?.data?.statusMessage ??
            (error as { data?: { statusMessage?: string; message?: string }; message?: string })?.data?.message ??
            (error as { message?: string })?.message ??
            "We couldn't save your sign-up. Please try again."

        statusState.value = "error"
        statusMessage.value =
            message?.includes("Missing Cloudflare DB binding")
                ? "The database connection is offline. Run `nuxthub dev` (or start Wrangler) before submitting the form."
                : message
    } finally {
        isSubmitting.value = false
    }
}
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
                <button
                    type="button"
                    class="mt-6 inline-flex items-center justify-center rounded-full bg-torchGold px-6 py-3 text-base font-semibold text-emeraldDeep transition hover:bg-torchOrange hover:text-mist"
                    @click="openSignup()"
                >
                    Claim the freebies
                </button>
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
                v-if="isModalOpen"
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
                        <form class="grid gap-6" @submit.prevent="handleSubmit" novalidate>
                            <label class="flex flex-col gap-2 text-base text-mist">
                                <span>Name</span>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    v-model="name"
                                    class="rounded-xl border border-emeraldJade/40 bg-emeraldDeep/80 px-4 py-3 text-base text-mist focus:border-torchGold focus:outline-none focus:ring-2 focus:ring-torchGold/60"
                                    placeholder="A daring adventurer"
                                    :disabled="isSubmitting"
                                />
                            </label>
                            <label class="flex flex-col gap-2 text-base text-mist">
                                <span>Email</span>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    v-model="email"
                                    class="rounded-xl border border-emeraldJade/40 bg-emeraldDeep/80 px-4 py-3 text-base text-mist focus:border-torchGold focus:outline-none focus:ring-2 focus:ring-torchGold/60"
                                    placeholder="you@example.com"
                                    :disabled="isSubmitting"
                                />
                            </label>
                            <button
                                type="submit"
                                class="w-full rounded-full bg-torchGold px-8 py-4 text-lg font-semibold text-emeraldDeep transition hover:bg-torchOrange hover:text-mist disabled:cursor-not-allowed disabled:opacity-70"
                                :disabled="isSubmitting"
                            >
                                <span v-if="isSubmitting">Saving your stash...</span>
                                <span v-else>Send me the freebies</span>
                            </button>
                        </form>
                    </div>
                    <p
                        v-if="statusMessage"
                        class="mt-8 text-base font-medium"
                        :class="{
                            'text-torchGold/90': statusState === 'success' || statusState === 'idle',
                            'text-red-300': statusState === 'error'
                        }"
                    >
                        {{ statusMessage }}
                    </p>
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
