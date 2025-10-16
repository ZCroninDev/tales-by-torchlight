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
                emeraldDeep: '#061a16',
                emeraldSpruce: '#0b2d24',
                emeraldJade: '#135342',
                torchGold: '#1fc58a',
                torchOrange: '#199a6d',
                mist: '#d7f8ea',
                haze: '#9ee9c8',
            },
        },
    },

    plugins: [],
}
