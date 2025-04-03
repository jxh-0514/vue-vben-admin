<!--  hiPrint组件  -->
<script lang="ts" setup>
import type { PrintActionType } from '#/components/Hiprint/src/types/Print';

import { BasicPrint } from '#/components/Hiprint';

defineOptions({ name: 'HiPrint' });
const handleRegister = (callback: (printAction: PrintActionType) => void) => {
  const printAction = { action: 'print', data: 'Some data' };
  callback(printAction);
};
</script>
<template>
  <div>
    <BasicPrint @register="handleRegister" />
  </div>
</template>
<style></style>
