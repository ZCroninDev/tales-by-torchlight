<template>
    <section class="relative min-h-screen overflow-hidden bg-gradient-to-br from-emeraldDeep/20 via-emeraldSpruce/15 to-torchGold/20">
        <div class="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-emeraldJade/25 blur-3xl" />
        <div class="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-torchGold/30 blur-[120px]" />

        <div class="relative mx-auto flex w-full max-w-5xl flex-col gap-16 px-4 py-20 sm:px-6 lg:px-8">
            <header class="space-y-6 text-center sm:space-y-8">
                <span class="inline-flex items-center gap-2 rounded-full border border-emeraldJade/20 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emeraldJade">
                    About us
                </span>
                <h1 class="text-4xl font-bold leading-tight text-emeraldDeep sm:text-5xl">
                    We craft approachable stories for people building the modern web
                </h1>
                <p class="mx-auto max-w-3xl text-lg text-emeraldSpruce/80 sm:text-xl">
                    From architecture to accessibility, we unpack the tools, ideas, and collaborations that help teams deliver thoughtful digital products.
                    Every article is written by practitioners who ship to production.
                </p>
            </header>

            <div class="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <article class="rounded-3xl border border-emeraldJade/15 bg-white/90 p-10 shadow-xl shadow-emeraldJade/30 backdrop-blur">
                    <h2 class="text-2xl font-semibold text-emeraldDeep">Our mission</h2>
                    <p class="mt-4 text-emeraldSpruce/80">
                        Make it easier for builders of every background to stay curious, experiment boldly, and share what they learn.
                        We believe publishing should feel less like a chore and more like a conversation with friends.
                    </p>
                    <p class="mt-4 text-emeraldSpruce/80">
                        Expect honest write-ups, pragmatic checklists, and the occasional deep dive into the frameworks that keep us up at night.
                    </p>
                </article>

                <aside class="flex flex-col gap-8">
                    <article class="rounded-3xl border border-torchGold/30 bg-white/90 p-8 shadow-lg shadow-torchGold/30 backdrop-blur">
                        <h2 class="text-xl font-semibold text-emeraldDeep">What you will find</h2>
                        <ul class="mt-5 space-y-4 text-emeraldSpruce/80">
                            <li class="flex gap-3">
                                <span class="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-torchOrange" />
                                Practical, copy-paste snippets and diagrams that make complex topics digestible.
                            </li>
                            <li class="flex gap-3">
                                <span class="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-torchOrange" />
                                Product-inspired retrospectives — we share the messy middle, not just polished launches.
                            </li>
                            <li class="flex gap-3">
                                <span class="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-torchOrange" />
                                Friendly conversations with teams shaping the future of web tooling and design systems.
                            </li>
                        </ul>
                    </article>

                    <div class="grid gap-4 rounded-3xl border border-emeraldJade/15 bg-white/80 p-6 text-center shadow">
                        <p class="text-sm font-semibold uppercase tracking-wide text-emeraldSpruce/70">In numbers</p>
                        <dl class="grid gap-6 sm:grid-cols-3">
                            <div>
                                <dt class="text-xs uppercase tracking-wide text-emeraldSpruce/70">Contributors</dt>
                                <dd class="mt-1 text-3xl font-bold text-emeraldDeep">12+</dd>
                            </div>
                            <div>
                                <dt class="text-xs uppercase tracking-wide text-emeraldSpruce/70">Articles published</dt>
                                <dd class="mt-1 text-3xl font-bold text-emeraldDeep">120</dd>
                            </div>
                            <div>
                                <dt class="text-xs uppercase tracking-wide text-emeraldSpruce/70">Coffee brewed</dt>
                                <dd class="mt-1 text-3xl font-bold text-emeraldDeep">infinite</dd>
                            </div>
                        </dl>
                    </div>
                </aside>
            </div>

            <section class="grid gap-6 rounded-3xl border border-emeraldJade/15 bg-white/85 p-10 shadow-lg shadow-emeraldJade/25 backdrop-blur lg:grid-cols-3">
                <div class="lg:col-span-1">
                    <h2 class="text-2xl font-semibold text-emeraldDeep">Values that guide us</h2>
                    <p class="mt-4 text-emeraldSpruce/80">
                        These are the lenses we use when deciding what to publish and how to invest our time.
                    </p>
                </div>
                <div class="grid gap-6 lg:col-span-2 sm:grid-cols-2">
                    <article class="rounded-2xl border border-emeraldJade/20 bg-emeraldJade/10 p-6">
                        <h3 class="text-lg font-semibold text-emeraldDeep">Clarity first</h3>
                        <p class="mt-2 text-sm text-emeraldSpruce/80">
                            We break down ideas with just enough detail to get you shipping without the detours.
                        </p>
                    </article>
                    <article class="rounded-2xl border border-torchGold/30 bg-torchGold/20 p-6">
                        <h3 class="text-lg font-semibold text-emeraldDeep">Community driven</h3>
                        <p class="mt-2 text-sm text-emeraldSpruce/80">
                            We listen to readers, surface new voices, and celebrate collective wins.
                        </p>
                    </article>
                    <article class="rounded-2xl border border-torchOrange/30 bg-torchOrange/20 p-6 sm:col-span-2">
                        <h3 class="text-lg font-semibold text-emeraldDeep">Better together</h3>
                        <p class="mt-2 text-sm text-emeraldSpruce/80">
                            Our best work happens when designers, engineers, and storytellers create side by side.
                        </p>
                    </article>
                </div>
            </section>

            <footer class="rounded-3xl border border-emeraldJade/20 bg-white/80 p-10 text-center shadow-lg shadow-emeraldJade/30 backdrop-blur">
                <h2 class="text-3xl font-semibold text-emeraldDeep">Let’s build something people love</h2>
                <p class="mt-4 text-lg text-emeraldSpruce/80">
                    Have an idea we should cover or a project worth spotlighting? Say hello at
                    <a href="mailto:hello@example.com" class="font-semibold text-torchOrange underline-offset-4 hover:text-torchGold hover:underline">hello@example.com</a>.
                    We love meeting collaborators, beta testers, and curious readers alike.
                </p>
                <NuxtLink
                    to="/all-posts"
                    class="mt-6 inline-flex items-center gap-2 rounded-full bg-torchOrange px-6 py-3 text-sm font-semibold text-white transition hover:bg-torchGold hover:text-emeraldDeep"
                >
                    Explore our latest articles
                    <span aria-hidden="true">-></span>
                </NuxtLink>
            </footer>
        </div>
    </section>
</template>
