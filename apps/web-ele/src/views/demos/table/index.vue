<!--  el-table  -->
<script lang="ts" setup>
import { ref } from 'vue';

import { ElCard } from 'element-plus';

import Table from '#/components/TableComs/Table.vue';

const data = ref([
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
]);
const tableHeader = ref([
  { type: 'index', label: '序号', width: '55px' },
  {
    prop: 'name',
    label: 'Name',
  },
  {
    prop: 'age',
    label: 'Age',
  },
  {
    prop: 'address',
    label: 'Address',
  },
]);
</script>
<template>
  <div class="p-4">
    <ElCard>
      <Table :data :table-header>
        <template #name="{ row }">
          <span class="text-blue-950">{{ row.name }}</span>
        </template>
      </Table>
    </ElCard>
  </div>
</template>
<style scoped></style>
