export default {
  title: 'Nuppukids',
  titleTemplate: '%s - Nuppukids',
  htmlAttrs: {
    lang: 'fi'
  },
  meta: [
    { charset: 'utf-8' },
    {
      vmid: 'description',
      name: 'description',
      content:
        'Nuppukids on suomalainen pienyritys joka '
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, minimal-ui'
    },
    { name: 'robots', content: 'index, follow' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'theme-color', content: '#ffffff' },
    { name: 'apple-mobile-web-app-status-bar-style', content: '#ffffff' }
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/assets/favicon-32x32.png',
      sizes: '32x32'
    },
    {
      rel: 'icon',
      type: 'image/png',
      href: '/assets/favicon-16x16.png',
      sizes: '16x16'
    },
    { rel: 'apple-touch-icon', href: '/assets/apple-touch-icon.png' },
    { rel: 'manifest', href: '/assets/manifest.json' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com/', crossorigin: 'anonymous' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com/', crossorigin: 'anonymous' },
    { rel: 'preconnect', href: 'https://cdn.jsdelivr.net/', crossorigin: 'anonymous' }
  ],
  script: [
    {
      src: 'https://cdn.jsdelivr.net/npm/pwacompat@2.0.17/pwacompat.min.js',
      async: true,
      crossorigin: 'anonymous'
    }
  ]
};
