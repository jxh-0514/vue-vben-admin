<!--  leaflet  -->
<script lang="ts" name="index" setup>
import { onMounted } from 'vue';

import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

function initMap() {
  const map = L.map('map').setView([51.505, -0.09], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
}

onMounted(() => {
  initMap();
});
</script>
<template>
  <div id="map" class="h-full w-full"></div>
</template>
<style scoped></style>
