import { DEFAULT_LAYOUT } from '../base';

import { AppRouteRecordRaw } from '../types';

const DEMO: AppRouteRecordRaw = {
  path: '/Demo',
  name: 'Demo',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.demo',
    icon: 'icon-question-circle',
    requiresAuth: true,
    order: 10,
  },
  children: [
    {
      path: 'upload',
      name: 'upload',
      component: () => import('@/views/demo/upload/index.vue'),
      meta: {
        locale: '上传',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default DEMO;
