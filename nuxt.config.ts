// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Thani Portfolio",
      meta: [{ name: "description", content: "Thani portfolio website" }],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", href: "/favicon.svg" },
      ],
    },
  },

  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxt/image",
  ],
  build: {
    transpile: ["troisjs"],
  },
  icon: {
    mode: "css",
    cssLayer: "base",
  },
  css: [],
  
  // Vercel deployment optimizations
  nitro: {
    preset: "vercel",
    compressPublicAssets: true,
  },
  
  // Ensure static assets are properly handled
  experimental: {
    payloadExtraction: false,
  },
});
