// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  extends: ['@nuxt/ui-pro'],
  modules: [
    '@nuxt/fonts',
    '@nuxt/ui',
    'nuxt-auth-utils',
    '@nuxt/image'
  ],

  ssr: false,

  routeRules: {
    "/videos": {
      redirect: {
        to: "/",
        statusCode: 308,
      },
    },
  },

  fonts: {
    defaults: {
      weights: [400, 700, 900],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: {
        'sans-serif': ['Trebuchet MS']
      }
    },
  },

  runtimeConfig: {
    public: {
      apiKey: process.env.NUXT_CONTENTSTACK_API_KEY,
      deliveryToken: process.env.NUXT_CONTENTSTACK_DELIVERY_TOKEN,
      previewToken: process.env.NUXT_CONTENTSTACK_PREVIEW_TOKEN,
      environment: process.env.NUXT_CONTENTSTACK_ENVIRONMENT,
      preview: process.env.NUXT_CONTENTSTACK_PREVIEW === "true",
      region: process.env.NUXT_CONTENTSTACK_REGION,
      assetHost: 'eu-assets.contentstack.com/v3/assets'
    },
  },

  ui: {
    global: true
  },


  image: {
    providers: {
      contentstack: {
        name: "contentstack",
        provider: "~/providers/contentstack",
        options: {
          baseURL: 'https://eu-assets.contentstack.com/v3/assets',
          apiKey: process.env.NUXT_CONTENTSTACK_API_KEY
        }
      },
    }
  }
})