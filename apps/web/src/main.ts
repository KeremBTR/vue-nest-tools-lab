import { VueQueryPlugin } from '@tanstack/vue-query'
import { createApp } from 'vue'

import App from './App.vue'

import { router } from './router'

const app = createApp(App)

const plugins = [
  router,
  VueQueryPlugin,
]

plugins.forEach(plugin => app.use(plugin))

app.mount('#app')
