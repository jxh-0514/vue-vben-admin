<!--  leaflet  -->
<script lang="ts" name="index" setup>
import { ref } from 'vue';

import InitLMap from '#/components/Map/InitLMap.vue';
import { getCurrentPosition } from '#/utils/getGeolocation';

const initLMapRef = ref<InstanceType<typeof InitLMap>>();
getCurrentPosition().then((res) => {
  const { lat, lng } = res;
  // 设置地图中心为当前位置
  initLMapRef.value?.mapInstance.setView([lat, lng], 13);

  // 在当前位置添加一个标记
  const elementStr = `<div><marquee>我在这里！！！</marquee></div>`;
  L.marker([lat, lng])
    .addTo(initLMapRef.value?.mapInstance)
    .bindTooltip(elementStr, { permanent: true, className: 'custom-tooltip' });
});
</script>
<template>
  <InitLMap ref="initLMapRef" />
</template>
<style>
.custom-tooltip {
  width: 100px;
  color: #f00;
}
</style>
