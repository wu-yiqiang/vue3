import { DEFAULT_LAYOUT } from '../base';

import { AppRouteRecordRaw } from '../types';

const WEBRTC: AppRouteRecordRaw = {
  path: '/webrtc',
  name: 'WEBRTC',
  component: () => import('@/views/webrtc/index.vue'),
  meta: {
    locale: 'rtc',
    icon: 'icon-question-circle',
    requiresAuth: true,
    order: 10,
  },
  // children: [
  //   {
  //     path: 'demo1',
  //     name: 'Demo1',
  //     component: () => import('@/views/demo/index.vue'),
  //     meta: {
  //       locale: 'menu.list.cardList',
  //       requiresAuth: true,
  //       roles: ['*'],
  //     },
  //   },
  // ],
};

export default WEBRTC;
