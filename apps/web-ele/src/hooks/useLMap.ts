import type { LatLngExpression } from 'leaflet';

import { onUnmounted } from 'vue';

import L, { TileLayer } from 'leaflet';

import 'leaflet/dist/leaflet.css';

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

export function useLMap(mapId: string, options: UseLeafletOptions) {
  const initMap = () => {
    if (!mapId) {
      return new Error('没有地图实例');
    }
    // 初始化地图
    mapInstance = L.map(mapId, options);

    // 添加图层
    tileLayer = L.tileLayer(
      options.tileLayerUrl ||
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          options.tileLayerAttribution || '&copy; OpenStreetMap contributors',
      },
    );
    tileLayer.addTo(mapInstance);
    return mapInstance;
  };

  // 销毁地图
  function removeMap() {
    if (mapInstance) {
      mapInstance.remove();
      mapInstance = null;
    }
  }

  onUnmounted(() => {
    removeMap();
  });

  return {
    initMap,
  };
}
