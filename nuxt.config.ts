// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  nitro: {
    prerender: {
      autoSubfolderIndex: false
    }
  },

  modules: ["@nuxt/content", "@nuxt/eslint", "@nuxt/ui", "@nuxt/image"],
});
