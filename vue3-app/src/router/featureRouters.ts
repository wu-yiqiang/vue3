import Home from '/@/views/tabbar/Home.vue'
import Category from '/@/views/tabbar/Category.vue'
import User from '/@/views/tabbar/User.vue'
import myApply from '/@/views/eHome/vpnApply/my-apply.vue'
import applyNotice from '/@/views/eHome/vpnApply/apply-notice.vue'
import myApplyLists from '/@/views/eHome/vpnApply/my-apply-lists.vue'
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
    path: '/eHome/vpnApply/my-apply',
    component: myApply,
    meta: {
      title: 'myApply.title',
      icon: 'scan',
      TabbarShow: true
    }
  },
  {
    path: '/eHome/vpnApply/apply-notice',
    component: applyNotice,
    meta: {
      title: 'applyNotice.title',
      icon: 'scan'
    }
  },
  {
    path: '/eHome/vpnApply/my-apply-lists',
    component: myApplyLists,
    meta: {
      title: 'myApplyLists.title',
      icon: 'scan',
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
