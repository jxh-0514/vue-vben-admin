<script lang="ts" setup>
import { nextTick, ref } from 'vue';
import { hiprint } from 'vue-plugin-hiprint';

import { ElButton, ElDialog, ElSpace } from 'element-plus';

defineOptions({ name: 'PrintPreview' });
//  将一下代码转成vue3 的写法
const visible = ref(false);
const spinning = ref(true);
const waitShowPrinter = ref(false);
const hiprintTemplateData = ref({});
const hiprintTemplateRef = ref() as any;
const printHtml = ref('') as any;

const title = ref<string>('');

function hideModal() {
  visible.value = false;
}

function show(template, printData, printTitle) {
  title.value = printTitle;

  const hiprintTemplate = new hiprint.PrintTemplate({
    template,
    settingContainer: '#PrintElementOptionSetting',
    paginationContainer: '.hiprint-printPagination',
  });

  hiprintTemplateRef.value = hiprintTemplate;
  hiprintTemplateData.value = printData;
  visible.value = true;
  spinning.value = true;
  nextTick(() => {
    if (hiprintTemplateRef.value) {
      printHtml.value = hiprintTemplate.getHtml(printData)[0].innerHTML;
      spinning.value = false;
    }
  });
}

function print() {
  waitShowPrinter.value = true;
  hiprintTemplateRef.value.print(
    hiprintTemplateData.value,
    {},
    {
      callback: () => {
        waitShowPrinter.value = false;
      },
    },
  );
}

function toPdf() {
  hiprintTemplateRef.value.toPdf(hiprintTemplateData.value, title.value);
}

defineExpose({
  show,
});
</script>

<template>
  <div>
    <ElDialog v-model="visible" :width="'215' + 'mm'">
      <div v-if="title" style="margin-right: 0px; width: '215mm'">
        {{ title }}
      </div>
      <ElSpace>
        <ElButton :loading="waitShowPrinter" type="primary" @click.stop="print">
          打印
        </ElButton>
        <ElButton type="primary" @click.stop="toPdf"> pdf</ElButton>
      </ElSpace>

      <div v-loading="spinning" style="min-height: 100px">
        <div
          style="
            box-shadow:
              5px 5px 9px #a4a4a4,
              -5px -5px 9px #ffffff;
            border: 1px solid #bbbbbb;
            margin-bottom: 10px;
            margin-top: 20px !important;
          "
          v-html="printHtml"
        ></div>
      </div>
      <template #footer>
        <ElButton key="close" @click="hideModal"> 关闭</ElButton>
      </template>
    </ElDialog>
  </div>
</template>
<style scoped>
:deep(.ant-modal-body) {
  padding: 0px;
}

:deep(.ant-modal-content) {
  margin-bottom: 24px;
}
</style>
