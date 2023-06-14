import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Login from '/@/views/Login.vue'
import Layout from '/@/layout/Index.vue'
import { useAppStore } from '/@/store'
import { getToken } from '/@/utils/auth'
import { t } from '/@/plugins/i18n'
import { featureRouters } from './featureRouters'
export const tabbar: Array<RouteRecordRaw> = featureRouters
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/scan',
    children: tabbar
  },
  {
    path: '/login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由白名单
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  const title = (to.meta.title as string) || 'Vite App'
  const tabbarShow = (to.meta.TabbarShow as boolean) || false
  const navbarShow = (to.meta.NavbarShow as boolean) || false
  document.title = t(title)
  const token = getToken()
  if (to.path === '/login' || whiteList.includes(to.path)) {
    if (token) {
      next('/')
    } else {
      next()
    }
  } else {
    const store = useAppStore()
    if (!token) {
      store.setState({ title })
      return next('/login')
    }
    store.setState({ title, token, tabbarShow, navbarShow })
    next()
  }
})

export default router
