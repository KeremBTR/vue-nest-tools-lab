import { createRouter, createWebHistory } from 'vue-router'

import PageDirectory from '../pages/PageDirectory.vue'
import PageHome from '../pages/PageHome.vue'
import PageLogin from '../pages/PageLogin.vue'
import PageNotFound from '../pages/PageNotFound.vue'
import PageProfile from '../pages/PageProfile.vue'

const routes = [
  { path: '/', component: PageHome },
  { path: '/login', component: PageLogin },
  { path: '/profile/:id', component: PageProfile },
  { path: '/directory', component: PageDirectory },
  { path: '/:pathMatch(.*)*', component: PageNotFound },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
