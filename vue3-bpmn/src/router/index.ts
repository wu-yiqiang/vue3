import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'IndexPage',
        meta: {
            title: '首页',
            keepAlive: true,
            requireAuth: true
        },
        component: () => import('@/pages/index.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;
