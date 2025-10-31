// https://nuxt.com/docs/api/configuration/nuxt-config
const isDevCommand =
    process.env.npm_lifecycle_event?.includes('dev') ||
    process.argv.some((arg) => arg === 'dev' || arg.endsWith('nuxt dev')) ||
    process.env.NODE_ENV !== 'production';
const baseURL = isDevCommand ? '/' : process.env.NUXT_APP_BASE_URL ?? '/tales-by-torchlight/';

// Ensure the base URL env var is present during build so assets resolve correctly.
process.env.NUXT_APP_BASE_URL = baseURL;

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: ['@nuxtjs/tailwindcss', '@nuxthub/core'],
    pages: true,
    hub: {
        database: true
    },
    nitro: isDevCommand
        ? {}
        : {
              // GitHub Pages requires prerendered output and a static 404 fallback.
              preset: 'github-pages'
          },
    app: {
        baseURL
    }
})
