import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Slovarcek from '../views/Slovarcek.vue';
import Brskalnik from '../views/Brskalnik.vue';
import AdminLogin from '../views/Admin/AdminLogin.vue';
import Translations from '../views/Admin/Translations.vue';
import NotAuthorized from '../views/Oopsies/NotAuthorized.vue';
import Words from '../views/Admin/Words.vue';
import Migration from '../views/Migration.vue';

/**
 * POMEMBNO OBVESTILO
 *
 * SITEMAP JE TREBA NA ROKE POPRAVIT. ČE SE KAJ PIPA V TEJ DATOTEKI,
 * POTEM JE TREBA POPRAVITI ŠE vue.config.js KER GRETA SITEMAP PLUGIN
 * IN TYPESCRIPT LIH TOK SKUP KOT VILINI PA ORKI
 */
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Domišljijski slovarček',
    component: Slovarcek
    // redirect: to => {
    //   return { path: '/brskaj' }
    // }
  },
  {
    path: '/brskaj',
    name: 'Domišljijski slovarček | Brskaj',
    component: Brskalnik
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
    path: '/migration',
    name: 'migrate shit here',
    component: Migration
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
});

export default router
