// blog/config.js
import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/blog/',
  title: "Ilir's Blog",
  description: "Math, code, and curiosity.",

  head: [
    ['meta', { name: 'author', content: 'Ilir' }],
    ['meta', { property: 'og:title', content: "Ilir's Blog" }],
    ['meta', { property: 'og:description', content: "Math, code, and curiosity." }],
    ['link', { rel: 'icon', href: '/favicon.svg' }],
    ['script', { src: 'https://vercel.com/analytics/script.js', defer: true }]
  ]
})

