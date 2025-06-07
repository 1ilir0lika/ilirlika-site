// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // ⬅️ import the router

import './style.css' 

createApp(App).use(router).mount('#app') // ⬅️ register router
