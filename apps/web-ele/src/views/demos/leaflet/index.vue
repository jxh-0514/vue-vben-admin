<!--  leaflet  -->
<script lang="ts" setup>
import { onMounted } from 'vue';

import { L, useLMap } from '#/hooks/useLMap';
import { getCurrentPosition } from '#/utils/getGeolocation';

const { initMap } = useLMap('LMap', {
  center: [39.9, 116.3],
  zoom: 11,
});

onMounted(() => {
  const mapInstance = initMap();

  getCurrentPosition().then((res) => {
    const { lat, lng } = res;
    // 设置地图中心为当前位置
    mapInstance?.setView([lat, lng], 13);
    // 在当前位置添加一个标记
    const elementStr = `<div><marquee>切换系统主题，看看效果</marquee></div>`;
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
