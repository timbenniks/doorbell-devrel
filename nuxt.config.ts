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

  routeRules: {
    '/': { prerender: true, swr: true },
    '/app/': { ssr: false },
    '/app/avatars': { ssr: false },
    '/app/avatars/*': { ssr: false },
    '/app/videos/*': { ssr: false },
    "/app/videos/share/*": { ssr: true },
    "/app/videos": {
      redirect: {
        to: "/app/",
        statusCode: 308,
      },
    },
  },

  features: {
    noScripts: false,
    inlineStyles: true,
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
      assetHost: process.env.NUXT_CONTENTSTACK_ASSET_HOST || 'eu-images.contentstack.com/v3/assets',
      preview: process.env.NUXT_CONTENTSTACK_PREVIEW === "true",
      cloudinaryApiKey: process.env.NUXT_CLOUDINARY_API_KEY,
      cloudinaryCloudname: process.env.NUXT_CLOUDINARY_CLOUD_NAME,
      cloudinaryFolder: process.env.NUXT_CLOUDINARY_FOLDER,
      heyGenApiKey: process.env.NUXT_HEYGEN_API_KEY,
      heyGenVoiceId: process.env.NUXT_HEYGEN_VOICE_ID,
    },
  },

  ui: {
    global: true,
    safelistColors: ['brand-primary']
  },

  colorMode: {
    preference: 'dark'
  },

  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/dwfcofnrd/image/fetch/'
    },
    providers: {
      contentstack: {
        name: "contentstack",
        provider: "~/providers/contentstack",
        options: {
          baseURL: `https://${process.env.NUXT_CONTENTSTACK_ASSET_HOST}`,
          apiKey: process.env.NUXT_CONTENTSTACK_API_KEY
        }
      },
    }
  }
})