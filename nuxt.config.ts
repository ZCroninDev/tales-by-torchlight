export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: ['@nuxtjs/tailwindcss', '@nuxthub/core'],
    pages: true,
    hub: {
        database: true
    },
    nitro: {
        preset: 'cloudflare-pages'
    },
    app: {
        baseURL: '/'
    }
})
