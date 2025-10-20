// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  vite: {
    resolve: {
      alias: {
        // Cloudflare build errors when some packages import node:path default export.
        // Provide a browser-friendly polyfill so rollup can bundle correctly in Cloudflare.
        'node:path': 'path-browserify',
        'path': 'path-browserify'
      }
    }
  },

  modules: ["@nuxt/content", "@nuxt/eslint", "@nuxt/ui", "@nuxt/image"],
});
