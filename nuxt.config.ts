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
      assetHost: 'eu-assets.contentstack.com/v3/assets',
      cloudinaryApiKey: process.env.NUXT_CLOUDINARY_API_KEY,
      cloudinaryCloudname: process.env.NUXT_CLOUDINARY_CLOUD_NAME,
      cloudinaryFolder: process.env.NUXT_CLOUDINARY_FOLDER,
      heyGenApiKey: process.env.NUXT_HEYGEN_API_KEY,
      heyGenAvatarGroup: process.env.NUXT_HEYGEN_AVATAR_GROUP,
      heyGenVoiceId: process.env.NUXT_HEYGEN_VOICE_ID,
      elevenLabsApiKey: process.env.NUXT_ELEVENLABS_API_KEY,
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