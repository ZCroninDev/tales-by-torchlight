<script setup lang="ts">
import { computed } from "vue"

type ExampleCard = {
    title: string
    description: string
    date?: string
    to?: string
}

const props = defineProps<{
    items?: ExampleCard[]
}>()

const defaultCards: ExampleCard[] = [
    {
        title: "Getting Started with Nuxt 3",
        description: "A beginner's guide to building fast and modern web apps with Nuxt 3.",
        date: "September 10, 2025"
    },
    {
        title: "Why Tailwind CSS Rocks",
        description: "Discover the power and flexibility of utility-first CSS with Tailwind.",
        date: "September 5, 2025"
    }
]

const cards = computed(() => (props.items && props.items.length ? props.items : defaultCards))
</script>

<template>
    <div class="grid gap-6 sm:grid-cols-2">
        <slot name="intro" mdc-unwrap="p">
            <p class="col-span-full text-center text-sm text-gray-500">
                Override the `intro` slot with MDC content to customize this example card grid.
            </p>
        </slot>

        <slot v-for="(card, index) in cards" :key="card.title" name="card" :card="card" :index="index" mdc-unwrap="p">
            <div class="grid gap-1">
                <component
                    :is="card.to ? 'NuxtLink' : 'article'"
                    v-bind="card.to ? { to: card.to } : {}"
                    class="bg-white rounded-lg shadow p-6 text-left transition hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                >
                    <h3 class="text-xl font-semibold text-purple-700 mb-2">{{ card.title }}</h3>
                    <p class="text-gray-600 mb-2">{{ card.description }}</p>
                    <span v-if="card.date" class="text-xs text-gray-400">{{ card.date }}</span>
                </component>
            </div>
        </slot>
    </div>
</template>
