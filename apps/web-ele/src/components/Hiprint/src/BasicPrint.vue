<script lang="ts" setup>
import { ElCard } from 'element-plus';

import Print from './design/index.vue';

withDefaults(
  defineProps<{
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  },
);
</script>

<template>
  <div class="p-5">
    <ElCard>
      <Print />
    </ElCard>
  </div>
</template>
