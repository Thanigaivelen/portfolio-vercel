// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Thani Portfolio",
      meta: [{ name: "description", content: "Thani portfolio website" }],
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
});
