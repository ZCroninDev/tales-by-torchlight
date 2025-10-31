<template>
    <section class="relative min-h-screen overflow-hidden bg-emeraldDeep">
        <div class="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-emeraldJade/30 blur-3xl" />
        <div class="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-torchGold/25 blur-[120px]" />

        <div class="relative mx-auto flex w-full max-w-5xl flex-col gap-16 px-4 py-20 sm:px-6 lg:px-8">
            <header class="space-y-6 text-center sm:space-y-8">
                <span class="inline-flex items-center gap-2 rounded-full border border-emeraldJade/40 bg-emeraldSpruce/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-haze">
                    Torchlight origins
                </span>
                <h1 class="text-4xl font-bold leading-tight text-mist sm:text-5xl">
                    Helping dungeon masters craft legendary nights since 2024
                </h1>
                <p class="mx-auto max-w-3xl text-lg text-haze sm:text-xl">
                    Tales by Torchlight is a warm campfire for storytellers, improvisers, and brand-new DMs.
                    We publish table-tested advice, safety-forward session zero guides, and printable freebies designed to keep every player engaged.
                </p>
            </header>

            <div class="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <article class="rounded-3xl border border-emeraldJade/40 bg-emeraldSpruce/80 p-10 shadow-xl shadow-emeraldJade/30">
                    <h2 class="text-2xl font-semibold text-mist">Our mission</h2>
                    <p class="mt-4 text-haze">
                        Make running tabletop RPGs less intimidating and far more collaborative.
                        We believe the best sessions start with shared expectations, generous prep, and tools that let everyone bring their weirdest ideas to the table.
                    </p>
                    <p class="mt-4 text-haze">
                        That is why you will find actionable walkthroughs, honest retrospectives, and resources you can drop straight into tonight's session without rewriting your whole campaign.
                    </p>
                </article>

                <aside class="flex flex-col gap-8">
                    <article class="rounded-3xl border border-emeraldJade/30 bg-emeraldSpruce/80 p-8 shadow-lg shadow-emeraldJade/25">
                        <h2 class="text-xl font-semibold text-mist">What you will find</h2>
                        <ul class="mt-5 space-y-4 text-haze">
                            <li class="flex gap-3">
                                <span class="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-torchOrange" />
                                Session zero templates and safety tools that make expectation-setting feel natural.
                            </li>
                            <li class="flex gap-3">
                                <span class="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-torchOrange" />
                                Adventure hooks, encounter prompts, and trackers that shave hours off prep without losing flavor.
                            </li>
                            <li class="flex gap-3">
                                <span class="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-torchOrange" />
                                Debriefs from real tables—what delighted players, what flopped, and how we course-corrected.
                            </li>
                        </ul>
                    </article>

                    <div class="grid gap-4 rounded-3xl border border-emeraldJade/30 bg-emeraldDeep/70 p-6 text-center shadow">
                        <p class="text-sm font-semibold uppercase tracking-wide text-haze/80">In numbers</p>
                        <dl class="grid gap-6 sm:grid-cols-3">
                            <div>
                                <dt class="text-xs uppercase tracking-wide text-haze/70">Campaign primers</dt>
                                <dd class="mt-1 text-3xl font-bold text-mist">18</dd>
                            </div>
                            <div>
                                <dt class="text-xs uppercase tracking-wide text-haze/70">Freebie downloads</dt>
                                <dd class="mt-1 text-3xl font-bold text-mist">26</dd>
                            </div>
                            <div>
                                <dt class="text-xs uppercase tracking-wide text-haze/70">Tables inspired</dt>
                                <dd class="mt-1 text-3xl font-bold text-mist">3k+</dd>
                            </div>
                        </dl>
                    </div>
                </aside>
            </div>

            <section class="grid gap-6 rounded-3xl border border-emeraldJade/30 bg-emeraldSpruce/80 p-10 shadow-lg shadow-emeraldJade/25 lg:grid-cols-3">
                <div class="lg:col-span-1">
                    <h2 class="text-2xl font-semibold text-mist">Values that guide us</h2>
                    <p class="mt-4 text-haze">
                        Every article and download is filtered through these principles so your table stays energized and safe.
                    </p>
                </div>
                <div class="grid gap-6 lg:col-span-2 sm:grid-cols-2">
                    <article class="rounded-2xl border border-emeraldJade/30 bg-emeraldDeep/60 p-6">
                        <h3 class="text-lg font-semibold text-mist">Clarity first</h3>
                        <p class="mt-2 text-sm text-haze">
                            We translate crunchy mechanics and sprawling lore into approachable steps you can teach in minutes.
                        </p>
                    </article>
                    <article class="rounded-2xl border border-emeraldJade/30 bg-emeraldDeep/60 p-6">
                        <h3 class="text-lg font-semibold text-mist">Consent and safety</h3>
                        <p class="mt-2 text-sm text-haze">
                            Emotional safety tools are non-negotiable. We weave them into every guide so your group can explore bravely.
                        </p>
                    </article>
                    <article class="rounded-2xl border border-emeraldJade/30 bg-emeraldDeep/60 p-6 sm:col-span-2">
                        <h3 class="text-lg font-semibold text-mist">Shared storytelling</h3>
                        <p class="mt-2 text-sm text-haze">
                            The table is at its best when everyone co-creates. We champion prompts and structures that invite every voice in.
                        </p>
                    </article>
                </div>
            </section>

            <footer class="rounded-3xl border border-emeraldJade/30 bg-emeraldSpruce/80 p-10 text-center shadow-lg shadow-emeraldJade/25">
                <h2 class="text-3xl font-semibold text-mist">Pull up a chair at the fire</h2>
                <p class="mt-4 text-lg text-haze">
                    Have a table victory to celebrate or a thorny scenario you want advice on? Reach us at
                    <a href="mailto:hello@talesbytorchlight.com" class="font-semibold text-torchGold underline-offset-4 hover:text-mist hover:underline">hello@talesbytorchlight.com</a>.
                    We love meeting fellow GMs, storytellers, and players chasing collaborative joy.
                </p>
                <NuxtLink
                    to="/all-posts"
                    class="mt-6 inline-flex items-center gap-2 rounded-full bg-torchGold px-6 py-3 text-sm font-semibold text-emeraldDeep transition hover:bg-torchOrange hover:text-mist"
                >
                    Explore our latest posts
                    <span aria-hidden="true">-></span>
                </NuxtLink>
            </footer>
        </div>
    </section>
</template>
