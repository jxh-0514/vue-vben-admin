import { onMounted, onUnmounted, ref } from 'vue';

import L, { LatLngExpression, Map, TileLayer } from 'leaflet';

import 'leaflet/dist/leaflet.css';

interface UseLeafletOptions {
  center: LatLngExpression;
  zoom: number;
  tileLayerUrl?: string;
  tileLayerAttribution?: string;
}

export function useLMap(mapId: string, options: UseLeafletOptions) {
  const mapInstance = ref<Map | null>(null);
  const tileLayer = ref<null | TileLayer>(null);

  onMounted(() => {
    if (!mapId) {
      return new Error(`Map container not found`);
    }
    // 初始化地图
    mapInstance.value = L.map(mapId, options);

    // 添加图层
    tileLayer.value = L.tileLayer(
      options.tileLayerUrl ||
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          options.tileLayerAttribution || '&copy; OpenStreetMap contributors',
      },
    );
    tileLayer.value.addTo(mapInstance.value);
  });

  onUnmounted(() => {
    // 销毁地图实例
    if (mapInstance.value) {
      mapInstance.value.remove();
      mapInstance.value = null;
    }
  });

  return {
    mapInstance,
  };
}
