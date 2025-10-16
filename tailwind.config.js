/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './app/**/*.{vue,js,ts}',
        './layouts/**/*.{vue,js,ts}',
        './pages/**/*.{vue,js,ts}',
        './plugins/**/*.{js,ts}',
        './content/**/*.{md,mdx}',
        './nuxt.config.{js,ts}'
    ],
    theme: {
    extend: {
            colors: {
                emeraldDeep: '#0f2a24',
                emeraldSpruce: '#102e27',
                emeraldJade: '#1f6f5b',
                torchGold: '#fde68a',
                torchOrange: '#f97316',
            },
        },
    },

    plugins: [],
}