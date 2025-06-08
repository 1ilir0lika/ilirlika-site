// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // ⬅️ import the router
import './style.css' 
import { inject } from '@vercel/analytics'
inject()

createApp(App).use(router).mount('#app') // ⬅️ register router
