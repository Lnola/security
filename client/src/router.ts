import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/home-page.vue';
import SqlInjection from '@/pages/sql-injection-page.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/sql-injection',
    name: 'SqlInjection',
    component: SqlInjection,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
