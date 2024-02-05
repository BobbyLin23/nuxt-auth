import process from 'node:process'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@vueuse/nuxt',
    'nuxt-icon',
    '@hebilicious/authjs-nuxt',
  ],
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  css: ['~/assets/css/main.css'],
  components: [
    {
      path: '~/components/auth',
      pathPrefix: false,
    },
    '~/components',
  ],
  alias: {
    cookie: 'cookie',
  },
  runtimeConfig: {
    authJs: {
      secret: process.env.NUXT_NEXTAUTH_SECRET,
    },
    github: {
      clientId: process.env.NUXT_GITHUB_CLIENT_ID,
      clientSecret: process.env.NUXT_GITHUB_CLIENT_SECRET,
    },
    public: {
      authJs: {
        baseUrl: process.env.NUXT_NEXTAUTH_URL,
        verifyClientOnEveryRequest: true,
      },
    },
  },
})
