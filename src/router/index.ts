import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Slovarcek from '../views/Slovarcek.vue'

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
    component: () => import(/* webpackChunkName: "durin" */ '../views/Admin/AdminLogin.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
