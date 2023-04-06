// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/style.css"],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  modules: ["@nuxt/devtools", "@nuxt/content"],
  content: {
    highlight: {
      theme: {
        default: "min-light",
      },
    },
  },
});
