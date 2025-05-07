<!--  视频监控布局  -->
<script lang="ts" setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';

import { Icon } from '@iconify/vue';
import { ElCard, ElCol, ElRow } from 'element-plus';

import Flv from '#/components/VideoComs/Flv.vue';
import CameraTree from '#/views/demos/video/CameraTree.vue';

defineOptions({ name: 'VideoSurveillance' });

const topList = [
  { key: 1, value: 'tabler:square-number-1-filled' },
  { key: 4, value: 'tabler:square-number-4-filled' },
  { key: 6, value: 'tabler:square-number-6-filled' },
  { key: 8, value: 'tabler:square-number-8-filled' },
  { key: 9, value: 'tabler:square-number-9-filled' },
];
const CameraListRef = ref();
// 用来存储每个 Flv 组件的实例
const flvRefs = ref([]);
const videoNum = ref(1); // 分屏数量
const videoList = ref([{}]); // 视频列表
const fullscreen = ref(false); // 是否全屏
const dragIndex = ref<null | number>(null); // 当前拖动到的位置
const playIndex = ref(0); // 当前播放的视频框
const dragIndexList = ref<number[]>([]); // 存放所有拖动结束的位置

// 计算属性，动态视频框样式
const videoBoxMapping = {
  1: 'videoBox1',
  4: 'videoBox4',
  6: 'videoBox6',
  8: 'videoBox8',
  9: 'videoBox9',
  16: 'videoBox16',
};
const videoBoxItem = computed(() => videoBoxMapping[videoNum.value] || '');

// 处理拖拽事件
const onDragenter = (e: DragEvent, i: number) => {
  dragIndex.value = i;
  playIndex.value = i;
};

const onDrop = async (e: DragEvent, i: number) => {
  const data = CameraListRef.value?.dragData;
  videoList.value[i] = data;
  await nextTick();
  flvRefs.value[i].initFlvExtend();
};

const onChangeIndex = (i: number) => {
  dragIndex.value = i;
  playIndex.value = i;
};

// 点击树形数据播放视频
const nodeClick = async (data: any) => {
  const index = findNextAvailableIndex();
  if (index !== -1) {
    videoList.value[index] = data;
    await nextTick();
    if (!flvRefs.value) return;
    flvRefs.value[index].initFlvExtend();
  }
};

// 添加一个变量来追踪当前应该插入的位置
const currentInsertIndex = ref(0);

// 修改 findNextAvailableIndex 函数
function findNextAvailableIndex() {
  // 第一轮：查找空位置
  for (let i = 0; i < videoList.value.length; i++) {
    if (!videoList.value[i].webUrl) {
      currentInsertIndex.value = (i + 1) % videoList.value.length; // 更新下一次插入的位置
      return i;
    }
  }

  // 如果没有空位置，使用 currentInsertIndex 的位置
  const index = currentInsertIndex.value;
  currentInsertIndex.value =
    (currentInsertIndex.value + 1) % videoList.value.length;
  return index;
}

// 点击顶部按钮更改视频框数量
const topBtn = (key: number) => {
  if (key === 20) {
    fullBtn();
  } else {
    if (videoNum.value === key) return;
    const oldVideoNum = videoNum.value;
    videoNum.value = key;
    // 保存已播放的视频
    const newVideoList = new Array(key).fill({});
    for (let i = 0; i < Math.min(oldVideoNum, key); i++) {
      newVideoList[i] = videoList.value[i];
    }
    videoList.value = newVideoList;
    dragIndexList.value = [];
    dragIndex.value = null;
    currentInsertIndex.value = 0; // 重置插入位置
  }
};

// 切换全屏模式
const fullBtn = () => {
  const element = document.querySelector('#full_box')!;
  if (fullscreen.value) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  } else {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    }
  }
};
const screenIcon = computed(() => {
  return fullscreen.value
    ? 'material-symbols:fullscreen-exit-rounded'
    : 'material-symbols:fullscreen-rounded';
});

// 计算全屏的高度
const boxHeight = computed(() => {
  return fullscreen.value ? 'calc(100vh - 130px)' : 'calc(100vh - 245px)';
});
const handleFullscreenChange = () => {
  fullscreen.value = !!document.fullscreenElement;
};
onBeforeUnmount(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange);
});
onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange);
});
</script>
<template>
  <div id="full_box" class="-mt-2 h-full w-full p-5">
    <ElCard>
      <div>
        <ElRow :gutter="20" align="middle">
          <ElCol :offset="12" :span="12">
            <div class="flex justify-end">
              <div class="flex space-x-2">
                <div
                  v-for="item in topList"
                  :key="item.id"
                  class="flex h-10 w-10 items-center justify-center rounded"
                  @click="topBtn(item.key)"
                >
                  <Icon
                    :icon="item.value"
                    class="cursor-pointer"
                    color="var(--el-color-primary)"
                    width="30px"
                  />
                </div>
                <div
                  class="flex h-10 w-10 cursor-pointer items-center justify-center rounded"
                  @click="topBtn(20)"
                >
                  <Icon
                    :icon="screenIcon"
                    class="cursor-pointer"
                    color="var(--el-color-primary)"
                    width="30px"
                  />
                </div>
              </div>
            </div>
          </ElCol>
        </ElRow>
        <div :style="{ height: boxHeight }" class="mt-2.5 flex w-full gap-2">
          <div class="w-[240px]">
            <CameraTree ref="CameraListRef" @node-click="nodeClick" />
          </div>
          <div :class="videoBoxItem" class="grid h-full w-full bg-gray-900">
            <div
              v-for="(item, index) in videoList"
              :key="index"
              class="videoItemBox relative h-full w-full border"
              @click="onChangeIndex(index)"
              @dragenter="onDragenter($event, index)"
              @drop="onDrop($event, index)"
              @dragover.prevent
            >
              <span
                v-if="item.deviceName"
                class="videoItemSpan absolute left-0 top-0 hidden bg-gray-400 bg-opacity-50 p-1 text-white"
              >
                {{ item.deviceName || item.deviceID }}
              </span>
              <Flv
                v-if="item.webUrl"
                :ref="(el) => (flvRefs[index] = el)"
                :web-url="item.webUrl"
                height="100%"
                width="100%"
              />
            </div>
          </div>
        </div>
      </div>
    </ElCard>
  </div>
</template>
<style scoped>
.videoBox1 {
  grid-template-rows: minmax(0, 1fr);
  grid-template-columns: 1fr;
  //width: 100%;
  //height: 100%;
}

.videoBox4 {
  grid-template-rows: minmax(0, 1fr) minmax(0, 1fr);
  grid-template-columns: 1fr 1fr;
  //grid-template-rows: 1fr 1fr;
}

.videoBox6 {
  grid-template-rows: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
  grid-template-columns: 1fr 1fr 1fr;
  //grid-template-rows: 1fr 1fr 1fr;

  :nth-child(1) {
    grid-row: 1 / 3;
    grid-column: 1 / 3;
  }
}

.videoBox8 {
  grid-template-rows: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(
      0,
      1fr
    );
  grid-template-columns: 1fr 1fr 1fr 1fr;
  //grid-template-rows: 1fr 1fr 1fr 1fr;

  :nth-child(1) {
    grid-row: 1 / 4;
    grid-column: 1 / 4;
  }
}

.videoBox9 {
  grid-template-rows: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
  grid-template-columns: 1fr 1fr 1fr;
  //grid-template-rows: 1fr 1fr 1fr;
}

.videoBox16 {
  grid-template-rows: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(
      0,
      1fr
    );
  grid-template-columns: 1fr 1fr 1fr 1fr;
  //grid-template-rows: 1fr 1fr 1fr 1fr;
}

.videoItemBox:hover .videoItemSpan {
  display: block;
}
</style>
