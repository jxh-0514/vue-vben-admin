<!--  el-table  -->
<script lang="ts" setup>
import { ElButton, ElCard, ElMessage } from 'element-plus';

import Table from '#/components/TableComs/Table.vue';

const data = [
  {
    name: 'John',
    age: 18,
    address: 'New York No. 1 Lake Park',
  },
  {
    name: 'Jim Green',
    age: 24,
    address: 'London No. 1 Lake Park',
  },
  {
    name: 'Joe Black',
    age: 30,
    address: 'Sydney No. 1 Lake Park',
  },
  {
    name: 'Jon Snow',
    age: 26,
  },
];
const tableHeader = [
  { type: 'selection', label: '全选', width: '55px' },
  { type: 'index', label: '序号', width: '55px' },
  { prop: 'name', label: 'Name' },
  { prop: 'age', label: 'Age' },
  { prop: 'address', label: 'Address' },
  { prop: 'operation', label: '操作', width: 200 },
];

const handleEdit = (row) => {
  ElMessage.warning('点击了编辑按钮！！！');
};
</script>
<template>
  <div class="p-4">
    <ElCard>
      <Table :data :table-header>
        <template #name="{ row }">
          <span class="text-blue-500">{{ row.name }}</span>
        </template>
        <template #operation="{ row }">
          <ElButton type="primary" @click="handleEdit(row)">编辑</ElButton>
        </template>
      </Table>
    </ElCard>
  </div>
</template>
<style scoped></style>
