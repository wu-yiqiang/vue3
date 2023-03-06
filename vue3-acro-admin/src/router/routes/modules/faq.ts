import { DEFAULT_LAYOUT } from '../base';

import { AppRouteRecordRaw } from '../types';

// export default {
//   path: '/faq',
//   name: 'faq',
//   component: DEFAULT_LAYOUT,
//   meta: {
//     locale: 'menu.faq',
//     icon: 'icon-question-circle',
//     requiresAuth: true,
//     order: 9,
//   },
// };

const FAQ: AppRouteRecordRaw = {
  path: '/faq',
  name: 'faq',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.faq',
    icon: 'icon-question-circle',
    requiresAuth: true,
    order: 10,
  },
  children: [
    {
      path: 'onineChat',
      name: 'onineChat',
      component: () => import('@/views/faq/chat/index.vue'),
      meta: {
        locale: 'menu.list.searchTable',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'card',
      name: 'Card',
      component: () => import('@/views/list/card/index.vue'),
      meta: {
        locale: 'menu.list.cardList',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default FAQ;
