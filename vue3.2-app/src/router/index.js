import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    {
        path:'/',
        redirect:'/home', //重定向
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/content/home/index.vue')
    },
    {
        path: '/detail/:id',
        name: 'detail',
        component: () => import('../views/content/detail.vue')
    },
    {
        path: '/search',
        name: 'search',
        component: () => import('../views/content/search/index.vue')
    },
    {
        path: '/shopping',
        name: 'shopping',
        component: () => import('../views/content/shopping/index.vue')
    },
    {
        path: '/mine',
        name: 'mine',
        component: () => import('../views/content/mine/index.vue')
    },
]

const router = createRouter({
    history:createWebHashHistory(),
    linkActiveClass:'active',
    routes
})

export default router;