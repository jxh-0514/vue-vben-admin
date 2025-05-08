<!--  加载geojson数据  -->
<script lang="ts" setup>
import { onBeforeUnmount, onMounted } from 'vue';

import { ElMessage } from 'element-plus';

import { L } from '#/hooks/useLMap';

defineOptions({ name: 'LeafletGeojson' });

const getGeojsonData = async () => {
  try {
    const response = await fetch(
      'https://geojson.cn/api/china/1.6.2/china.json',
    );

    if (!response.ok) {
      throw new Error(
        `Network response was not ok: ${response.status} ${response.statusText}`,
      );
    }

    const geojsonData = await response.json();
    return geojsonData;
  } catch (error) {
    console.error('Failed to fetch GeoJSON data:', error);
    throw error; // 可选择重新抛出以便外部处理
  }
};

let map = null;
const initMap = () => {
  map = L.map('LMap', {
    center: [39.9, 116.3],
    attributionControl: false,
    zoomControl: false,
    doubleClickZoom: false,
    dragging: true,
    zoom: 12,
    minZoom: 3,
    zoomSnap: 0.1,
  });
};

// 马卡龙风格颜色数组（Macaron colors）
const macaronColors = [
  '#F4E6C9', // 浅米色
  '#FFE5D9', // 桃粉色
  '#DCC7AA', // 米灰色
  '#C2D9A0', // 薄荷绿
  '#BEE3DB', // 浅蓝绿
  '#C5DEF5', // 天空蓝
  '#D8B4E2', // 紫罗兰
  '#F4CACA', // 粉红色
  '#FAEED1', // 奶油橙
];

onBeforeUnmount(() => {
  if (map) {
    map.remove();
  }
});
onMounted(async () => {
  initMap();
  try {
    const geoJsonData = await getGeojsonData();
    // 提前创建 colorMap
    const allProvinces = geoJsonData.features
      .map((f) => f.properties.name)
      .sort(); // 确保每次颜色一致

    const colorMap = {};
    allProvinces.forEach((name, index) => {
      colorMap[name] = macaronColors[index % macaronColors.length];
    });

    L.geoJSON(geoJsonData, {
      style: (feature) => ({
        color: colorMap[feature.properties.name],
        fillOpacity: 0.6,
        weight: 1.5,
      }),
      onEachFeature: (feature, layer) => {
        // 获取中心点坐标
        const center = feature.properties.center || feature.properties.chenter;

        if (center && Array.isArray(center) && center.length >= 2) {
          const [lng, lat] = center;
          const label = L.marker([lat, lng], {
            icon: L.divIcon({
              className: 'polygon-label',
              html: `<span>${feature.properties.name}</span>`,
              iconSize: [50, 20],
            }),
            interactive: false, // 不响应交互事件
            permanent: true,
          }).addTo(map);
        }
        // 鼠标移入高亮边界
        layer.on('mouseover', () => {
          layer.setStyle({ weight: 3, color: '#51acff' });
        });

        // 鼠标移出恢复样式
        layer.on('mouseout', () => {
          layer.setStyle({
            weight: 1.5,
            color: colorMap[feature.properties.name],
          });
        });
      },
    }).addTo(map);
    map.fitBounds(L.geoJSON(geoJsonData).getBounds());
  } catch (error) {
    ElMessage.error('加载地理数据失败，请检查网络或稍后再试。');
    console.error('Failed to load or render GeoJSON:', error);
  }
});
</script>
<template>
  <div class="h-full w-full">
    <div id="LMap" class="h-full w-full"></div>
  </div>
</template>
<style scoped></style>
