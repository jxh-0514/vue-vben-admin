<!--  el-table  -->
<script lang="ts" name="index" setup>
import { ref } from 'vue';

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
const columns = ref([
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
    <Table :columns :data stripe>
      <template #name>12</template>
    </Table>
  </div>
</template>
<style scoped></style>
