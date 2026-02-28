// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Thanigaivelen C | Software Developer",
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Thanigaivelen C — Software Developer specializing in full-stack development, AI/ML integration, and automation. Explore my interactive 3D portfolio.",
        },
        { name: "author", content: "Thanigaivelen C" },
        // Open Graph
        {
          property: "og:title",
          content: "Thanigaivelen C | Software Developer",
        },
        {
          property: "og:description",
          content:
            "Interactive 3D portfolio of Thanigaivelen C — Full-stack developer, AI/ML enthusiast, and automation expert.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "/images/profile-pic.jpeg" },
        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Thanigaivelen C | Software Developer",
        },
        {
          name: "twitter:description",
          content:
            "Interactive 3D portfolio — Full-stack developer, AI/ML enthusiast, and automation expert.",
        },
        // Theme
        { name: "theme-color", content: "#1c1917" },
      ],
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
  fonts: {
    families: [
      {
        name: "Space Grotesk",
        provider: "google",
        weights: [300, 400, 500, 600, 700],
      },
      {
        name: "Inter",
        provider: "google",
        weights: [300, 400, 500, 600, 700],
      },
      {
        name: "JetBrains Mono",
        provider: "google",
        weights: [400, 500, 700],
      },
    ],
  },
  css: ["~/assets/css/global.css"],

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
