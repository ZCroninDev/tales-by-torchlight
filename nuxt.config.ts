const enableHub = process.env.NUXT_ENABLE_HUB === '1'
const isDev = process.env.NODE_ENV !== 'production'
const defaultBaseURL = isDev ? '/' : '/tales-by-torchlight/'
const baseURL = process.env.NUXT_APP_BASE_URL ?? defaultBaseURL
process.env.NUXT_APP_BASE_URL = baseURL

const modules: string[] = ['@nuxtjs/tailwindcss']
if (enableHub) {
    modules.push('@nuxthub/core')
}

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules,
    pages: true,
    ...(enableHub
        ? {
              hub: {
                  database: true
              }
          }
        : {}),
    nitro: {
        preset: 'github-pages'
    },
    app: {
        baseURL
    }
})
