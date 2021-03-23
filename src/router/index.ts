import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Slovarcek from '../views/Slovarcek.vue';
import AdminLogin from '../views/Admin/AdminLogin.vue';
import Translations from '../views/Admin/Translations.vue';
import NotAuthorized from '../views/Oopsies/NotAuthorized.vue';
import Words from '../views/Admin/Words.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Domišljijski slovarček',
    component: Slovarcek
  },
  {
    path: '/durin',
    name: 'Ta temen košček je admin kot. Da mi nikoli ne greš tja, simba.',
    component: AdminLogin
    // component: () => import(/* webpackChunkName: "durin" */ '../views/Admin/AdminLogin.vue'),
  },
  {
    path: '/durin/translation',
    name: 'Upravljanje s prevodi',
    component: Translations
  },
  {
    path: '/durin/words',
    name: 'Upravljanje z besedami',
    component: Words
  },
  {
    path: '/oopsie/notallowed',
    name: 'ok wt',
    component: NotAuthorized
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
