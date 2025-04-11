<!--  leaflet  -->
<script lang="ts" setup>
import { onMounted } from 'vue';

import { L, useLMap } from '#/hooks/useLMap';
import { getCurrentPosition } from '#/utils/getGeolocation';

const aurora = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.');
const denver = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.');
const golden = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');
const littleton = L.marker([39.61, -105.02]).bindPopup(
  'This is Littleton, CO.',
);
const cities = L.layerGroup([littleton, denver, aurora, golden]);
const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap',
});

const streets = L.tileLayer(
  'http://t{s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=56b81006f361f6406d0e940d2f89a39c',
  { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] },
);

const { initMap } = useLMap('LMap', {
  center: [39.9, 116.3],
  zoom: 11,
  layers: [osm, streets],
});
const baseMaps = {
  'Mapbox Streets': streets,
  OpenStreetMap: osm,
};

const overlayMaps = {
  Cities: cities,
};
onMounted(() => {
  const mapInstance = initMap();
  L.control.layers(baseMaps, overlayMaps).addTo(mapInstance);

  getCurrentPosition().then((res) => {
    const { lat, lng } = res;
    // 设置地图中心为当前位置
    mapInstance.setView([lat, lng], 13);
    // 在当前位置添加一个标记
    const elementStr = `<div><marquee>我在这里！！！</marquee></div>`;
    L.marker([lat, lng]).addTo(mapInstance).bindTooltip(elementStr, {
      permanent: true,
      className: 'custom-tooltip',
    });
  });
});
</script>
<template>
  <div class="h-full w-full">
    <!-- 需要加上根标签，否则刷新可能会出问题 -->
    <div id="LMap" class="h-full w-full"></div>
  </div>
</template>
<style>
.custom-tooltip {
  width: 100px;
  color: #f00;
}
</style>
