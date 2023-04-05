import { DEFAULT_LAYOUT } from '../base';

import { AppRouteRecordRaw } from '../types';

const DEMO: AppRouteRecordRaw = {
  path: '/Demo',
  name: 'Demo',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.faq',
    icon: 'icon-question-circle',
    requiresAuth: true,
    order: 10,
  },
  children: [
    {
      path: 'demo1',
      name: 'Demo1',
      component: () => import('@/views/demo/index.vue'),
      meta: {
        locale: 'menu.list.cardList',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default DEMO;
