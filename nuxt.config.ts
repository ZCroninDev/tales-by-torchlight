// https://nuxt.com/docs/api/configuration/nuxt-config
const defaultBaseUrl = '/tales-by-torchlight/';
const baseURL = process.env.NUXT_APP_BASE_URL ?? defaultBaseUrl;

// Ensure the base URL env var is present during build so assets resolve correctly.
process.env.NUXT_APP_BASE_URL = baseURL;

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: ['@nuxtjs/tailwindcss'],
    pages: true,
    nitro: {
        // GitHub Pages requires prerendered output and a static 404 fallback.
        preset: 'github-pages'
    },
    app: {
        baseURL
    }
})
