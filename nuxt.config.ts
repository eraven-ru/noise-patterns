// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  css: ['~/assets/css/styles.scss'],
  modules: ['@nuxt/fonts'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
});
