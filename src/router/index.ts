import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Slovarcek from '../views/Slovarcek.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Domišljijski slovarček',
    component: Slovarcek
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/durin',
    name: 'Ta temen košček je admin kot. Da mi nikoli ne greš tja, simba.',
    component: () => import(/* webpackChunkName: "durin" */ '../views/Admin/AdminLogin.vue'),
  },
  {
    path: '/durin/translation',
    name: 'Upravljanje s prevodi',
    component: () => import(/* webpackChunkName: "durin-translations" */ '../views/Admin/Translations.vue')
  },
  {
    path: '/oopsie/notallowed',
    name: 'ok wt',
    component: () => import(/* webpackChunkName: "durin-not-authorized" */ '../views/Oopsies/NotAuthorized.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
