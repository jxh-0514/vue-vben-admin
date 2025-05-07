<!--  视频树形列表  -->
<script lang="ts" setup>
import { ref, watch } from 'vue';

import { ElInput, ElTree } from 'element-plus';

defineOptions({ name: 'CameraTree' });

const emit = defineEmits<{
  (e: 'nodeClick', data: any): void;
}>();
const data = [
  {
    deviceType: 1,
    deviceTypeDesc: '视频1',
    childrens: [
      {
        deviceID: '1',
        deviceName: '画面1',
        deviceType: 1,
        // webUrl: 'https://sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-720p.flv',
        webUrl:
          'http://5815.liveplay.myqcloud.com/live/5815_62fe94d692ab11e791eae435c87f075e.flv',
      },
      {
        deviceID: '2',
        deviceName: '画面2',
        deviceType: 1,
        webUrl:
          'http://liteavapp.qcloud.com/live/liteavdemoplayerstreamid_demo1080p.flv',
      },
    ],
  },
];
const defaultProps = ref({
  label: 'deviceName',
  children: 'childrens',
});
const value = ref('');
const dragData = ref<any>({});

const filterNode = (value: string, data: any) => {
  if (!value) return true;
  return (
    (data.deviceTypeDesc && data.deviceTypeDesc.includes(value)) ||
    (data.deviceName && data.deviceName.includes(value))
  );
};

const selectTreeNode = (
  data: any,
  checked: boolean,
  indeterminate: boolean,
) => {
  console.log('选择的节点', data, checked);
};

const nodeClick = (data: any) => {
  console.log('节点点击', data);
  if (data.childrens) return;
  emit('nodeClick', data);
};

const onDragStart = (e: any) => {
  console.log('开始拖拽', e);
  dragData.value = e;
};

watch(value, (val) => {
  (tree.value as any).filter(val);
});

const tree = ref<any>(null);
defineExpose({ dragData });
</script>
<template>
  <div class="h-full w-full">
    <div class="title">视频列表</div>
    <ElInput
      v-model="value"
      class="w-36"
      clearable
      placeholder="请输入搜索内容"
    />
    <div class="scroll-box">
      <ElTree
        ref="tree"
        :data="data"
        :filter-node-method="filterNode"
        :props="defaultProps"
        :show-checkbox="false"
        accordion
        class="treeRadio"
        highlight-current
        node-key="id"
        @check-change="selectTreeNode"
        @node-click="nodeClick"
      >
        <template #default="{ node, data }">
          <span class="w-full">
            <span v-if="data.childrens">
              {{ `${data.deviceTypeDesc} (${data.childrens.length})` }}
            </span>
            <p v-else :draggable="true" @dragstart="onDragStart(data)">
              {{ node.label }}
            </p>
          </span>
        </template>
      </ElTree>
    </div>
  </div>
</template>
<style scoped>
.title {
  margin: 10px;
  font-size: 20px;
}
</style>
