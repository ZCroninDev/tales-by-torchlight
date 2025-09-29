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
        extend: {},
    },
    plugins: [],
}