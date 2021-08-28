import colors from 'vuetify/es5/util/colors'

const pkg = require('./package')
const { getConfigForKeys } = require('./lib/config.js')
const ctfConfig = getConfigForKeys([
  'CTF_BLOG_POST_TYPE_ID',
  'CTF_SPACE_ID',
  'CTF_CDA_ACCESS_TOKEN'
])

const { createClient } = require('./plugins/contentful.js')
const cdaClient = createClient(ctfConfig)


export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  mode: 'universal',
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: 'ja',
      prefix: 'og: http://ogp.me/ns#'
    },
    titleTemplate: '%s - naruhero',
    title: 'Naruhe.log',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'NARUHI.log' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'http://naruhero.site/' },
      { hid: 'og:title', property: 'og:title', content: 'Naruhi.log' },
      { hid: 'og:description', property: 'og:description', content: '技術とマニアックな趣味のブログ' },
      { hid: 'og:image', property: 'og:image', content: 'https://res.cloudinary.com/dnltqdyfu/image/authenticated/s--36gs0n6e--/v1630146867/Myicon.jpg' },
      { name: 'twitter:card', content: 'summary' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/common.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    ['@nuxtjs/google-analytics', { id: process.env.GOOGLE_ANALYTICS_ID }],
    '@nuxtjs/markdownit',
    ['@nuxtjs/moment', ['ja']]
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    font: {
      family: 'Libre Baskerville'
    },
    // customVariables: ['~/assets/common.scss'],
    theme: {
      light: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          n_orange: '#e65b20',
          n_gray: '#d1cbc3',
          n_white: '#f7f4f2',
          n_brown: '#3e1300',
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  router: {
    middleware: 'getPosts'
  },
  // generate: {
  //   routes () {
  //     return Promise.all([
  //       sdkClient.getEntries({
  //         content_type: 'blogPost'
  //       })
  //     ]).then(([posts]) => {
  //       return [
  //         ...posts.items.map((post) => {
  //           return { route: `posts/${post.fields.slug}`, payload: post }
  //         })
  //       ]
  //     })
  //   }
  // },
  generate: {
    fallback: true,
    routes() {
      return cdaClient
        .getEntries(ctfConfig.CTF_BLOG_POST_TYPE_ID)
        .then(entries => {
          return [...entries.items.map(entry => `/blog/${entry.fields.id}`)]
          // todo routing setting with id
        })
    }
  },
  env: {
    CTF_SPACE_ID: ctfConfig.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: ctfConfig.CTF_CDA_ACCESS_TOKEN,
    CTF_BLOG_POST_TYPE_ID: ctfConfig.CTF_BLOG_POST_TYPE_ID,
  },

  markdownit: {
    injected: true,
    breaks: true,
    html: true,
    linkify: true,
    typography: true,
    use: [
      'markdown-it-br',
      [
        'markdown-it-link-attributes',
        {
          attrs: {
            target: '_blank',
            rel: 'noopener'
          }
        }
      ]
    ]
  },
}

