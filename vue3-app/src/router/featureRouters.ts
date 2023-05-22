import Home from '/@/views/tabbar/Home.vue'
import Category from '/@/views/tabbar/Category.vue'
import User from '/@/views/tabbar/User.vue'
import Scaner from '/@/views/scaner/index.vue'
import theme from '/@/views/user/theme.vue'
import language from '/@/views/user/language.vue'
import setting from '/@/views/user/setting.vue'
export const featureRouters = [
  {
    path: '/home',
    component: Home,
    meta: {
      title: 'home.title',
      icon: 'home-o',
      TabbarShow: true
    }
  },
  {
    path: '/category',
    component: Category,
    meta: {
      title: 'category.title',
      icon: 'qr',
      TabbarShow: true
    }
  },
  {
    path: '/user',
    component: User,
    meta: {
      title: 'user.title',
      icon: 'user-o',
      TabbarShow: true
    }
  },
  {
    path: '/scaner',
    component: Scaner,
    meta: {
      title: '扫码',
      icon: 'user-o',
      TabbarShow: true
    }
  },
  {
    path: '/user/theme',
    component: theme,
    meta: {
      title: 'theme.title'
    }
  },
  {
    path: '/user/language',
    component: setting,
    meta: {
      title: 'language.title'
    }
  },
  {
    path: '/user/setting',
    component: setting,
    meta: {
      title: 'setting.title'
    }
  }
]
