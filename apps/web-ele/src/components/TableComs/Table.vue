<!--  表格  -->
<script lang="ts" setup>
import { ref } from 'vue';

import { ElTable, ElTableColumn, type TableColumnCtx } from 'element-plus';

defineProps<{
  tableHeader: TableColumnCtx<any>[];
}>();

const tableRef = ref();
// 使用代理的方式暴露table的事件
defineExpose(
  new Proxy(
    {},
    {
      get(target, key) {
        return tableRef.value?.[key];
      },
      has(target, key) {
        return key in tableRef.value;
      },
    },
  ),
);
</script>
<template>
  <div>
    <ElTable
      ref="tableRef"
      :header-cell-style="{ backgroundColor: 'var(--el-fill-color-light)' }"
      show-overflow-tooltip
      v-bind="$attrs"
    >
      <template v-for="column in tableHeader" :key="column.prop || column.type">
        <!-- 特殊列（selection 或 index） -->
        <ElTableColumn
          v-if="column.type === 'selection' || column.type === 'index'"
          :label="column.label"
          :type="column.type"
          :width="column.width"
        />
        <ElTableColumn v-else v-bind="column">
          <template #default="scope">
            <!--  如果存在具名插槽，则渲染插槽内容  -->
            <template v-if="$slots[column.prop]">
              <slot
                :index="scope.$index"
                :name="column.prop"
                :prop="column.prop"
                v-bind="scope"
              ></slot>
            </template>
            <template v-else>
              <span>{{ scope.row[column.prop] }}</span>
            </template>
          </template>
        </ElTableColumn>
      </template>
      <!--  el-table内置插槽 -->
      <template v-for="(_, name) in $slots" :key="name" #[name]="scope">
        <slot :name="name" v-bind="scope"></slot>
      </template>
    </ElTable>
  </div>
</template>
<style scoped></style>
