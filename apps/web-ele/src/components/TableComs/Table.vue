<!--  表格  -->
<script lang="ts" name="Table" setup>
import { ElTable, ElTableColumn } from 'element-plus';

defineProps<{
  columns: any[];
}>();
</script>
<template>
  <div>
    <ElTable v-bind="$attrs">
      <ElTableColumn v-for="column in columns" :key="column.id" v-bind="column">
        <template v-for="(_, slot) in Object.keys($slots)" #[slot]="scope">
          <slot :name="slot" v-bind="scope"></slot>
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>
<style scoped></style>
