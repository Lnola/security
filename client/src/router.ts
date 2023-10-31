import { createRouter, createWebHistory } from 'vue-router';
import SqlInjection from '@/pages/sql-injection-page.vue';

const routes = [
  {
    path: '/sql-injection',
    name: 'SqlInjection',
    component: SqlInjection,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/sql-injection',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
