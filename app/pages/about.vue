<template>
    <section class="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-purple-50">
        <div class="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-purple-200/40 blur-3xl" />
        <div class="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-200/40 blur-[120px]" />

        <div class="relative mx-auto flex w-full max-w-5xl flex-col gap-16 px-4 py-20 sm:px-6 lg:px-8">
            <header class="space-y-6 text-center sm:space-y-8">
                <span class="inline-flex items-center gap-2 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-purple-500">
                    About us
                </span>
                <h1 class="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
                    We craft approachable stories for people building the modern web
                </h1>
                <p class="mx-auto max-w-3xl text-lg text-slate-600 sm:text-xl">
                    From architecture to accessibility, we unpack the tools, ideas, and collaborations that help teams deliver thoughtful digital products.
                    Every article is written by practitioners who ship to production.
                </p>
            </header>

            <div class="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <article class="rounded-3xl bg-white/90 p-10 shadow-xl shadow-purple-200/40 backdrop-blur">
                    <h2 class="text-2xl font-semibold text-slate-900">Our mission</h2>
                    <p class="mt-4 text-slate-600">
                        Make it easier for builders of every background to stay curious, experiment boldly, and share what they learn.
                        We believe publishing should feel less like a chore and more like a conversation with friends.
                    </p>
                    <p class="mt-4 text-slate-600">
                        Expect honest write-ups, pragmatic checklists, and the occasional deep dive into the frameworks that keep us up at night.
                    </p>
                </article>

                <aside class="flex flex-col gap-8">
                    <article class="bg-white/90 p-8 shadow-lg shadow-blue-200/40 backdrop-blur">
                        <h2 class="text-xl font-semibold text-slate-900">What you will find</h2>
                        <ul class="mt-5 space-y-4 text-slate-600">
                            <li class="flex gap-3">
                                <span class="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-purple-400" />
                                Practical, copy-paste snippets and diagrams that make complex topics digestible.
                            </li>
                            <li class="flex gap-3">
                                <span class="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-purple-400" />
                                Product-inspired retrospectives — we share the messy middle, not just polished launches.
                            </li>
                            <li class="flex gap-3">
                                <span class="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-purple-400" />
                                Friendly conversations with teams shaping the future of web tooling and design systems.
                            </li>
                        </ul>
                    </article>

                    <div class="grid gap-4 bg-white/80 p-6 text-center shadow">
                        <p class="text-sm font-semibold uppercase tracking-wide text-slate-500">In numbers</p>
                        <dl class="grid gap-6 sm:grid-cols-3">
                            <div>
                                <dt class="text-xs uppercase tracking-wide text-slate-500">Contributors</dt>
                                <dd class="mt-1 text-3xl font-bold text-slate-900">12+</dd>
                            </div>
                            <div>
                                <dt class="text-xs uppercase tracking-wide text-slate-500">Articles published</dt>
                                <dd class="mt-1 text-3xl font-bold text-slate-900">120</dd>
                            </div>
                            <div>
                                <dt class="text-xs uppercase tracking-wide text-slate-500">Coffee brewed</dt>
                                <dd class="mt-1 text-3xl font-bold text-slate-900">∞</dd>
                            </div>
                        </dl>
                    </div>
                </aside>
            </div>

            <section class="grid gap-6 rounded-3xl border border-slate-200 bg-white/85 p-10 shadow-lg shadow-slate-200/60 backdrop-blur lg:grid-cols-3">
                <div class="lg:col-span-1">
                    <h2 class="text-2xl font-semibold text-slate-900">Values that guide us</h2>
                    <p class="mt-4 text-slate-600">
                        These are the lenses we use when deciding what to publish and how to invest our time.
                    </p>
                </div>
                <div class="grid gap-6 lg:col-span-2 sm:grid-cols-2">
                    <article class="rounded-2xl  bg-purple-50/70 p-6">
                        <h3 class="text-lg font-semibold text-purple-800">Clarity first</h3>
                        <p class="mt-2 text-sm text-purple-900/80">
                            We break down ideas with just enough detail to get you shipping without the detours.
                        </p>
                    </article>
                    <article class="rounded-2xl border border-blue-100 bg-blue-50/70 p-6">
                        <h3 class="text-lg font-semibold text-blue-800">Community driven</h3>
                        <p class="mt-2 text-sm text-blue-900/80">
                            We listen to readers, surface new voices, and celebrate collective wins.
                        </p>
                    </article>
                    <article class="rounded-2xl border border-amber-100 bg-amber-50/70 p-6 sm:col-span-2">
                        <h3 class="text-lg font-semibold text-amber-800">Better together</h3>
                        <p class="mt-2 text-sm text-amber-900/80">
                            Our best work happens when designers, engineers, and storytellers create side by side.
                        </p>
                    </article>
                </div>
            </section>

            <footer class="rounded-3xl border border-purple-200 bg-white/80 p-10 text-center shadow-lg shadow-purple-200/50 backdrop-blur">
                <h2 class="text-3xl font-semibold text-slate-900">Let’s build something people love</h2>
                <p class="mt-4 text-lg text-slate-600">
                    Have an idea we should cover or a project worth spotlighting? Say hello at
                    <a href="mailto:hello@example.com" class="font-semibold text-purple-600 underline-offset-4 hover:text-purple-700 hover:underline">hello@example.com</a>.
                    We love meeting collaborators, beta testers, and curious readers alike.
                </p>
                <NuxtLink
                    to="/all-posts"
                    class="mt-6 inline-flex items-center gap-2 rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
                >
                    Explore our latest articles
                    <span aria-hidden="true">-></span>
                </NuxtLink>
            </footer>
        </div>
    </section>
</template>
