import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
    srcDir: './',
    css: [
        '@/assets/css/main.css',
    ],
    build: {
      postcss: {
        postcssOptions: {
          plugins: {
            tailwindcss: {},
            autoprefixer: {},
          }
        }
      },
    },
    publicRuntimeConfig: {
      SITE_URL: process.env.SITE_URL,
      SITE_NAME: process.env.SITE_NAME,
      SITE_TITLE: process.env.SITE_TITLE,
      SITE_DESCRIPTION: process.env.SITE_DESCRIPTION,
      SITE_THUMBNAIL: process.env.SITE_THUMBNAIL,
      TWITTER_AUTHOR: process.env.TWITTER_AUTHOR,
      GA4_ID: process.env.GA4_ID,
      PIXEL_ID: process.env.PIXEL_ID,
    },
    privateRuntimeConfig: {
      NUXT_APP_MAILCHIMP_API_KEY: process.env.NUXT_APP_MAILCHIMP_API_KEY
    },
    vite: {
      logLevel: "info",
      optimizeDeps: {
          include: [
              '@headlessui/vue', '@heroicons/vue/solid', '@heroicons/vue/outline', 'vue'
          ]
      }
  }
})