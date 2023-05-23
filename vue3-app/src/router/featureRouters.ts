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
      TabbarShow: true,
      NavbarShow: true
    }
  },
  {
    path: '/category',
    component: Category,
    meta: {
      title: 'category.title',
      icon: 'qr',
      TabbarShow: true,
      NavbarShow: true
    }
  },
  {
    path: '/user',
    component: User,
    meta: {
      title: 'user.title',
      icon: 'user-o',
      TabbarShow: true,
      NavbarShow: true
    }
  },
  {
    path: '/scaner',
    component: Scaner,
    meta: {
      title: '扫码',
      icon: 'user-o',
      TabbarShow: true,
      NavbarShow: false
    }
  },
  {
    path: '/user/theme',
    component: theme,
    meta: {
      title: 'theme.title',
      NavbarShow: true
    }
  },
  {
    path: '/user/language',
    component: setting,
    meta: {
      title: 'language.title',
      NavbarShow: true
    }
  },
  {
    path: '/user/setting',
    component: setting,
    meta: {
      title: 'setting.title',
      NavbarShow: true
    }
  }
]
