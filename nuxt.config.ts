// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  head: {
    meta: [
      { charset: "utf-8" },
      { name: "format-detection", content: "telephone=no" },
      {
        name: "viewport",
        content:
          "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0",
      },
    ],
  },
  devtools: true,
  css: ["@/style.css"],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  modules: ["@nuxt/content", "@pinia/nuxt"],
});
