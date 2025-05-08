<!--  flv视频播放组件  -->
<script lang="ts" setup>
import { onBeforeUnmount, ref } from 'vue';

import FlvExtend from 'flv-extend';

defineOptions({ name: 'Flv' });

const props = withDefaults(
  defineProps<{
    height: string;
    isShowControls?: boolean;
    timeIntval?: number;
    webUrl: string;
    width: string;
  }>(),
  {
    isShowControls: true, // 是否显示控件
    timeIntval: 0,
    width: '300px',
  },
);

const videoRef = ref<HTMLVideoElement | null>(null);
const player = ref(null);

// 初始化播放器
function initFlvExtend() {
  const element = videoRef.value;
  // 实时
  // 配置需要的功能
  const flv = new FlvExtend({
    element,
    frameTracking: true, // 开启帧追踪
    maxReconnectAttempts: 3, // 最大重连次数（为null则不限制次数）
    reconnect: true, // 断流后重连
    reconnectInterval: 1000, // 重连间隔(ms)
    updateOnFocus: false, // 焦点时更新帧信息
    updateOnStart: false, // 开始播放时更新帧信息
  });
  player.value = flv.init(
    {
      isLive: true,
      type: 'flv',
      url: props.webUrl, // flv视频地址
    },
    {
      autoCleanupSourceBuffer: true, // 自动清理SourceBuffer
      enableStashBuffer: false, // 禁用缓冲区
      stashInitialSize: 128, // 初始缓冲区大小
    },
  );
  player.value.play(); // 播放
}

// 销毁视频播放器
function close() {
  if (player.value) {
    player.value.close();
    player.value = null;
  }
}

onBeforeUnmount(() => {
  console.log('flv组件销毁');
  close();
});

defineExpose({ close, initFlvExtend });
</script>
<template>
  <div :style="{ width, height }">
    <video
      id="videoElement"
      ref="videoRef"
      :controls="isShowControls"
      autoplay
      class="h-full w-full"
      muted
    ></video>
  </div>
</template>
<style scoped></style>
