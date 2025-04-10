<!--  初始化leaflet地图组件  -->
<script lang="ts" setup>
import { useLMap } from '#/hooks/useLMap';

defineOptions({ name: 'InitLMap' });

const { mapInstance } = useLMap('LMap', {
  center: [39.9, 116.3],
  zoom: 11,
});

defineExpose({
  mapInstance,
});
</script>
<template>
  <div id="LMap" class="h-full w-full"></div>
</template>
<style scoped></style>
