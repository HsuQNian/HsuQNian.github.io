export default defineNuxtConfig({
  devtools: true,
  css: ["@/style.css"],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  modules: ["@nuxt/content", "@pinia/nuxt"],
  content: {
    highlight: {
      // Theme used in all color schemes.
      theme: "github-light",
    },
  },
});
