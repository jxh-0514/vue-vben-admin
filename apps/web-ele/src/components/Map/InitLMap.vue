<!--  初始化leaflet地图组件  -->
<script lang="ts" setup>
import { onMounted } from 'vue';

import { useLMap } from '#/hooks/useLMap';

defineOptions({ name: 'InitLMap' });

const { initMap } = useLMap('LMap', {
  center: [39.9, 116.3],
  zoom: 11,
});
onMounted(() => {
  const mapInstance = initMap();
});
</script>
<template>
  <div id="LMap" class="h-full w-full"></div>
</template>
<style scoped></style>
