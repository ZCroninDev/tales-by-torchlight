<template>
    <div class="grid gap-6">
        <div class="col-span-full rounded-2xl border border-emeraldJade/30 bg-emeraldSpruce/70 p-6 shadow">
            <slot name="intro" />
        </div>
        <div class="grid gap-6 sm:grid-cols-2">
            <slot name="card" />
        </div>
    </div>
</template>
