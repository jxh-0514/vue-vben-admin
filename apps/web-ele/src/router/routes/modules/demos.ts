import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 1000,
      title: $t('demos.title'),
    },
    name: 'Demos',
    path: '/demos',
    children: [
      {
        meta: {
          title: $t('demos.elementPlus'),
        },
        name: 'NaiveDemos',
        path: '/demos/element',
        component: () => import('#/views/demos/element/index.vue'),
      },
      {
        meta: {
          title: $t('demos.form'),
        },
        name: 'BasicForm',
        path: '/demos/form',
        component: () => import('#/views/demos/form/basic.vue'),
      },
      {
        name: 'Leaflet',
        path: '/demos/leaflet',
        component: () => import('#/views/demos/leaflet/index.vue'),
        meta: {
          title: 'leaflet地图',
        },
      },
      {
        name: 'Table',
        path: '/demos/table',
        component: () => import('#/views/demos/table/index.vue'),
        meta: {
          title: '表格',
        },
      },
      {
        name: 'HiPrint',
        path: '/demos/hiPrint',
        component: () => import('#/views/demos/hiPrint/hiPrint.vue'),
        meta: {
          title: 'hiPrint',
        },
      },
    ],
  },
];

export default routes;
