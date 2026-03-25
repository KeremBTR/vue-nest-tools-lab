import { createRouter, createWebHistory } from 'vue-router'

import PageDirectory from '../pages/PageDirectory.vue'
import PageHome from '../pages/PageHome.vue'
import PageLogin from '../pages/PageLogin.vue'
import PageNotFound from '../pages/PageNotFound.vue'
import PageProfile from '../pages/PageProfile.vue'

const routes = [
  { path: '/', name: 'home', component: PageHome },
  { path: '/login', name: 'login', component: PageLogin },
  { path: '/profile/:id', name: 'profile', component: PageProfile },
  { path: '/directory', name: 'directory', component: PageDirectory },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: PageNotFound },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
