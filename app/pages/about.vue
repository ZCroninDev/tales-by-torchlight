<template>
    <section class="relative min-h-screen overflow-hidden bg-emeraldDeep">
        <div class="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-emeraldJade/30 blur-3xl" />
        <div class="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-torchGold/25 blur-[120px]" />

        <div class="relative mx-auto flex w-full max-w-5xl flex-col gap-16 px-4 py-20 sm:px-6 lg:px-8">
            <header class="space-y-6 text-center sm:space-y-8">
                <span class="inline-flex items-center gap-2 rounded-full border border-emeraldJade/40 bg-emeraldSpruce/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-haze">
                    About us
                </span>
                <h1 class="text-4xl font-bold leading-tight text-mist sm:text-5xl">
                    We craft approachable stories for people building the modern web
                </h1>
                <p class="mx-auto max-w-3xl text-lg text-haze sm:text-xl">
                    From architecture to accessibility, we unpack the tools, ideas, and collaborations that help teams deliver thoughtful digital products.
                    Every article is written by practitioners who ship to production.
                </p>
            </header>

            <div class="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <article class="rounded-3xl border border-emeraldJade/40 bg-emeraldSpruce/80 p-10 shadow-xl shadow-emeraldJade/30">
                    <h2 class="text-2xl font-semibold text-mist">Our mission</h2>
                    <p class="mt-4 text-haze">
                        Make it easier for builders of every background to stay curious, experiment boldly, and share what they learn.
                        We believe publishing should feel less like a chore and more like a conversation with friends.
                    </p>
                    <p class="mt-4 text-haze">
                        Expect honest write-ups, pragmatic checklists, and the occasional deep dive into the frameworks that keep us up at night.
                    </p>
                </article>

                <aside class="flex flex-col gap-8">
                    <article class="rounded-3xl border border-emeraldJade/30 bg-emeraldSpruce/80 p-8 shadow-lg shadow-emeraldJade/25">
                        <h2 class="text-xl font-semibold text-mist">What you will find</h2>
                        <ul class="mt-5 space-y-4 text-haze">
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

                    <div class="grid gap-4 rounded-3xl border border-emeraldJade/30 bg-emeraldDeep/70 p-6 text-center shadow">
                        <p class="text-sm font-semibold uppercase tracking-wide text-haze/80">In numbers</p>
                        <dl class="grid gap-6 sm:grid-cols-3">
                            <div>
                                <dt class="text-xs uppercase tracking-wide text-haze/70">Contributors</dt>
                                <dd class="mt-1 text-3xl font-bold text-mist">12+</dd>
                            </div>
                            <div>
                                <dt class="text-xs uppercase tracking-wide text-haze/70">Articles published</dt>
                                <dd class="mt-1 text-3xl font-bold text-mist">120</dd>
                            </div>
                            <div>
                                <dt class="text-xs uppercase tracking-wide text-haze/70">Coffee brewed</dt>
                                <dd class="mt-1 text-3xl font-bold text-mist">infinite</dd>
                            </div>
                        </dl>
                    </div>
                </aside>
            </div>

            <section class="grid gap-6 rounded-3xl border border-emeraldJade/30 bg-emeraldSpruce/80 p-10 shadow-lg shadow-emeraldJade/25 lg:grid-cols-3">
                <div class="lg:col-span-1">
                    <h2 class="text-2xl font-semibold text-mist">Values that guide us</h2>
                    <p class="mt-4 text-haze">
                        These are the lenses we use when deciding what to publish and how to invest our time.
                    </p>
                </div>
                <div class="grid gap-6 lg:col-span-2 sm:grid-cols-2">
                    <article class="rounded-2xl border border-emeraldJade/30 bg-emeraldDeep/60 p-6">
                        <h3 class="text-lg font-semibold text-mist">Clarity first</h3>
                        <p class="mt-2 text-sm text-haze">
                            We break down ideas with just enough detail to get you shipping without the detours.
                        </p>
                    </article>
                    <article class="rounded-2xl border border-emeraldJade/30 bg-emeraldDeep/60 p-6">
                        <h3 class="text-lg font-semibold text-mist">Community driven</h3>
                        <p class="mt-2 text-sm text-haze">
                            We listen to readers, surface new voices, and celebrate collective wins.
                        </p>
                    </article>
                    <article class="rounded-2xl border border-emeraldJade/30 bg-emeraldDeep/60 p-6 sm:col-span-2">
                        <h3 class="text-lg font-semibold text-mist">Better together</h3>
                        <p class="mt-2 text-sm text-haze">
                            Our best work happens when designers, engineers, and storytellers create side by side.
                        </p>
                    </article>
                </div>
            </section>

            <footer class="rounded-3xl border border-emeraldJade/30 bg-emeraldSpruce/80 p-10 text-center shadow-lg shadow-emeraldJade/25">
                <h2 class="text-3xl font-semibold text-mist">Let’s build something people love</h2>
                <p class="mt-4 text-lg text-haze">
                    Have an idea we should cover or a project worth spotlighting? Say hello at
                    <a href="mailto:hello@myblog.dev" class="font-semibold text-torchGold underline-offset-4 hover:text-mist hover:underline">hello@myblog.dev</a>.
                    We love meeting collaborators, beta testers, and curious readers alike.
                </p>
                <NuxtLink
                    to="/all-posts"
                    class="mt-6 inline-flex items-center gap-2 rounded-full bg-torchGold px-6 py-3 text-sm font-semibold text-emeraldDeep transition hover:bg-torchOrange hover:text-mist"
                >
                    Explore our latest articles
                    <span aria-hidden="true">-></span>
                </NuxtLink>
            </footer>
        </div>
    </section>
</template>
