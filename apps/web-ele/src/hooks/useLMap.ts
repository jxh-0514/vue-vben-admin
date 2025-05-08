import type { LatLngExpression } from 'leaflet';

import { onUnmounted } from 'vue';

import L, { TileLayer } from 'leaflet';

import { useTheme } from '#/hooks/useTheme';

import '#/utils/tileLayer-colorfilter.js'; // 设置图层颜色
import '#/utils/leaflet-marker-extend.js'; // 扩展图标逻辑

import 'leaflet/dist/leaflet.css';
import '#/styles/leaflet.css'; // 自定义样式

interface UseLeafletOptions {
  center: LatLngExpression;
  zoom: number;
  tileLayerUrl?: string;
  tileLayerAttribution?: string;
  layers?: L.Layer[];
}

export { L };

let mapInstance: L.Map | null = null;
let tileLayer: null | TileLayer = null;

const tileLayerTheme = (theme: string) => {
  return theme === 'dark' ? ['hue:185deg', 'invert:100%'] : [];
};

export function useLMap(mapId: string, options: UseLeafletOptions) {
  const initMap = () => {
    if (!mapId) {
      return new Error('没有地图实例');
    }
    // 初始化地图
    mapInstance = L.map(mapId, options);

    const { theme } = useTheme();
    const filters = tileLayerTheme(theme.value);

    // 添加图层
    tileLayer = L.tileLayer?.colorFilter(
      options.tileLayerUrl ||
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          options.tileLayerAttribution || '&copy; OpenStreetMap contributors',
        filter: filters,
      },
    );
    tileLayer.addTo(mapInstance);
    return mapInstance;
  };

  // 监听系统主题变化并更新地图样式
  useTheme((theme: string) => {
    if (!mapInstance) {
      return;
    }
    const filters = tileLayerTheme(theme);
    if (!tileLayer) {
      return;
    }
    tileLayer?.updateFilter(filters);
  });

  // 销毁地图
  function removeMap() {
    if (mapInstance) {
      mapInstance.remove();
      mapInstance = null;
      tileLayer = null;
    }
  }

  onUnmounted(() => {
    removeMap();
  });

  return {
    initMap,
  };
}
