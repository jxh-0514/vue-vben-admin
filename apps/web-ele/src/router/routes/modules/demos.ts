import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
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
    component: BasicLayout,
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
        path: '/demos',
        meta: {
          title: 'leaflet',
        },
        children: [
          {
            name: 'LeafletIndex',
            path: '/demos/leaflet',
            component: () => import('#/views/demos/leaflet/index.vue'),
            meta: {
              title: 'leaflet地图',
            },
          },
          {
            name: 'LeafletBaseMaps',
            path: '/demos/leaflet/leaflet-base-maps',
            component: () =>
              import('#/views/demos/leaflet/leaflet-base-maps.vue'),
            meta: {
              title: 'leaflet图层组',
            },
          },
          {
            name: 'LeafletGeoJson',
            path: '/demos/leaflet/leaflet-geojson',
            component: () =>
              import('#/views/demos/leaflet/leaflet-geojson.vue'),
            meta: {
              title: 'leafletGeoJson',
            },
          },
        ],
      },
      {
        name: 'Video',
        path: '/video',
        meta: { title: '视频' },
        component: () => import('#/views/demos/video/videoSurveillance.vue'),
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
