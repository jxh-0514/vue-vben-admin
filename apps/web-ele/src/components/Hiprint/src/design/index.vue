<script lang="ts" setup>
import { getCurrentInstance, onMounted, ref } from 'vue';
import { hiprint, hiPrintPlugin } from 'vue-plugin-hiprint';

import {
  ElAlert,
  ElButton,
  ElDialog,
  ElInput,
  ElInputNumber,
  ElMessage,
} from 'element-plus';
// 导出文件
import { saveAs } from 'file-saver';

// 组合式函数 hooks
import { usePaper } from './hooks/use-paper';
import { useZoom } from './hooks/use-zoom';
import PrintView from './preview.vue';
import printData from './printData.js';
import { provider1 } from './provider1';
import { provider2 } from './provider2';
import { basicTemplate } from './template';
// 工具
import { newHiprintPrintTemplate } from './utils/template-helper';

// 预览

// 容器
const emit = defineEmits(['submitJson', 'submitJsonTid', 'save']);

const providerContainerOne = ref() as any;
const providerContainerTwo = ref() as any;
const preViewRef = ref() as any;
// 模板容器
const hiprintPrintTemplate = ref() as any;
// 元素参数容器
const PrintElementOptionSetting = ref() as any;

const TEMPLATE_KEY = getCurrentInstance().type.name; // 存储模板对象的 key
const {
  paperTypes,
  curPaperType,
  paperPopVisible,
  paperWidth,
  paperHeight,
  showPaperPop,
  setPaper,
  setPaperOther,
  hidePaperPop,
} = usePaper(TEMPLATE_KEY);
const { scaleValue, changeScale } = useZoom(TEMPLATE_KEY);

// 自定义传入 provider 的参数
const options = {
  config: {
    tid: 'providerModule1.header',
    title: '单据表头',
    data: '单据表头',
    type: 'text',
    options: {
      testData: '单据表头',
      height: 17,
      fontSize: 16.5,
      fontWeight: '700',
      textAlign: 'center',
      hideTitle: true,
    },
  },
};
// 初始化 provider
hiprint.init({
  providers: [provider1(options), provider2(options)],
});

/**
 * 构建左侧可拖拽元素
 * 注意: 可拖拽元素必须在 hiprint.init() 之后调用
 * 调用之前 可以先 console.log($("#hiprint-printTemplate")) 看看是否有该 dom
 */
const buildLeftElement = () => {
  providerContainerOne.value.innerHTML = ''; // 先清空, 避免重复构建
  providerContainerTwo.value.innerHTML = ''; // 先清空, 避免重复构建
  hiprint.PrintElementTypeManager.build(
    providerContainerOne.value,
    'providerModule1',
  );
  hiprint.PrintElementTypeManager.build(
    providerContainerTwo.value,
    'providerModule2',
  );
};
/**
 * 构建设计器
 * 注意: 必须要在 onMounted 中去构建
 * 因为都是把元素挂载到对应容器中, 必须要先找到该容器
 */
let hiprintTemplate;
// ref 创建的模板json
const buildDesigner = (template?: any) => {
  hiprintPrintTemplate.value.innerHTML = ''; // 先清空, 避免重复构建
  // 注意事项: 模板json(object)
  // 如果使用 vue ref创建的模板json, 需要使用 .value 获取 (确保内部能够使用 object.key 拿到对应数据就行)
  hiprintTemplate = newHiprintPrintTemplate(TEMPLATE_KEY, {
    template: template || basicTemplate, // 模板json(object)
    settingContainer: PrintElementOptionSetting.value, // 元素参数容器
    fontList: [{ title: '微软雅黑', value: 'Microsoft YaHei' }],
    // 处理图片上传
    onImageChooseClick: (target) => {
      // 创建input，模拟点击，然后 target.refresh 更新
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.click();
      input.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
          const reader = new FileReader();
          // 通过文件流行文件转换成Base64字行串
          reader.readAsDataURL(file);
          // 转换成功后
          reader.onloadend = function () {
            // 通过 target.refresh 更新图片元素
            target.refresh(reader.result);
          };
        }
      });
      input.remove();
    },
  });
  // 构建 并填充到 容器中
  hiprintTemplate.design(hiprintPrintTemplate.value);
};

/**
 * 预览
 */
const handlePreview = () => {
  const json = hiprintTemplate.getJson();
  preViewRef.value.show(json, printData);
};

/**
 * 浏览器打印
 */
const directPrint = () => {
  hiPrintPlugin.disAutoConnect();
  // 参数: 打印时设置 左偏移量，上偏移量
  const options = { leftOffset: -1, topOffset: -1 };
  // 扩展
  const ext = {
    callback: () => {},
    styleHandler: () =>
      '<link rel="stylesheet" type="text/css" media="print" href="/public/resource/css/print-lock.css">',
  };

  hiprintTemplate.print(printData, options, ext);
};
/**
 * 直接打印: 借助客户端,静默打印(无弹窗直接打印)
 * 注意: 需要先连接客户端
 */
const collectClientToPrint = () => {
  if (hiprint.hiwebSocket.opened) {
    hiprintTemplate.print2(printData);
  } else {
    ElMessage.warning('请先连接客户端(刷新网页), 然后再点击「直接打印」');
  }
};
// ----------------- 模板对象 api 部分 -----------------
/**
 * 旋转纸张
 */
const rotatePaper = () => {
  hiprintTemplate.rotatePaper();
};
/**
 * 清空所有元素
 */
const clearPaper = () => {
  hiprintTemplate.clear();
};
/**
 * 导出模板 json
 * 必须确保 hiprintTemplate 已成功创建
 */
const exportJson = () => {
  if (!hiprintTemplate.getJson()) {
    return ElMessage.info('模版内容不能为空');
  }
  const jsonContent = JSON.stringify(hiprintTemplate.getJson());
  try {
    const str = new Blob([jsonContent], { type: 'text/plain;charset=utf-8' });
    saveAs(str, `json模版.txt`);
  } catch (error) {
    return ElMessage.error(`导出模版失败：${error}`);
  }
  ElMessage.success('导出模版成功');
};
/**
 * 导入josn模板
 */
const importJsonTemplateVisible = ref<boolean>(false);
const importJsonTemplateInput = ref() as any;
// 弹窗控制
const importJsonTemplate = () => {
  importJsonTemplateVisible.value = true;
  importJsonTemplateInput.value = null;
};

// 执行导入josn模版
const handleImportJsonTemOk = () => {
  if (!importJsonTemplateInput.value) {
    return ElMessage.warning('json模版导入：数据不能为空！');
  }
  if (hiprintTemplate) {
    try {
      hiprintTemplate.update(JSON.parse(importJsonTemplateInput.value));
    } catch (error) {
      return ElMessage.error(`json模版导入: 失败${error}`);
    }
    ElMessage.success(`json模版导入: 成功`);
    importJsonTemplateVisible.value = false;
    importJsonTemplateInput.value = null;
  }
};

/**
 * 保存模板
 */
const handleSaveTemplateJson = () => {
  const json = hiprintTemplate.getJson();
  emit('save', json);
};

/**
 * 这里必须要在 onMounted 中去构建 左侧可拖拽元素 或者 设计器
 * 因为都是把元素挂载到对应容器中, 必须要先找到该容器
 */
onMounted(() => {
  buildLeftElement();
  hiPrintPlugin.disAutoConnect();
  buildDesigner();
});

defineExpose({
  buildDesigner,
});
</script>

<template>
  <div class="m-3 flex items-center">
    <!-- 纸张大小 A3、A4 等 -->
    <div class="paper">
      <span>纸张设置：</span>
      <template v-for="(value, type) in paperTypes" :key="type">
        <ElButton
          :type="curPaperType === type ? 'primary' : 'default'"
          class="mr-2"
          size="small"
          @click="setPaper(type, value)"
        >
          {{ type }}
        </ElButton>
      </template>
      <!-- 自定义纸张 -->
      <ElButton
        :type="'other' === curPaperType ? 'primary' : 'default'"
        size="small"
        @click="showPaperPop"
      >
        自定义
      </ElButton>
      <div class="popover">
        <div v-show="paperPopVisible" class="popover-content flex-col">
          <div style="font-size: 16px; font-weight: bold">设置纸张宽高(mm)</div>
          <div class="mt-10 flex items-center">
            <ElInputNumber
              v-model:value="paperWidth"
              placeholder="宽(mm)"
              size="small"
            />
            <span class="ml-5 mr-5">x</span>
            <ElInputNumber
              v-model:value="paperHeight"
              placeholder="高(mm)"
              size="small"
            />
          </div>
          <div class="mt-5 flex justify-end gap-2">
            <ElButton size="small" @click.stop="setPaperOther">确定</ElButton>
            <ElButton size="small" @click.stop="hidePaperPop">取消</ElButton>
          </div>
        </div>
      </div>
    </div>
    <!-- 缩放 -->
    <div class="ml-3 mr-3 flex flex-row items-center">
      <span>纸张缩放：</span>
      <ElButton class="info circle-10" size="small" @click="changeScale(false)">
        -
      </ElButton>
      <div style="margin: 0 4px; width: 40px">
        {{ (scaleValue * 100).toFixed(0) }}%
      </div>
      <ElButton class="info circle-10" size="small" @click="changeScale(true)">
        +
      </ElButton>
    </div>
    <div class="flex gap-2">
      <ElButton size="small" type="primary" @click.stop="rotatePaper">
        旋转纸张
      </ElButton>
      <ElButton size="small" type="primary" @click.stop="clearPaper">
        清空纸张
      </ElButton>
      <ElButton size="small" type="primary" @click.stop="exportJson">
        导出模板
      </ElButton>
      <ElButton size="small" type="primary" @click.stop="importJsonTemplate">
        导入模版
      </ElButton>
      <ElButton size="small" type="primary" @click="handlePreview">
        预览
      </ElButton>
      <ElButton danger size="small" @click.stop="directPrint">
        浏览器打印
      </ElButton>
      <ElButton
        danger
        size="small"
        type="primary"
        @click.stop="collectClientToPrint"
      >
        直接打印(需连接客户端)
      </ElButton>
      <ElButton size="small" type="primary" @click="handleSaveTemplateJson">
        保存模版
      </ElButton>
    </div>
  </div>
  <ElAlert
    class="m-3"
    show-icon
    title="温馨提示：使用logo时，请在右侧选择图片，拖动过来的仅供演示作用"
    type="success"
  />
  <div class="flex h-full flex-row gap-2" style="margin: 10px 10px 0 0">
    <!--  工具  -->
    <div
      class="center p-l-2 p-r-2 border-rounded h-[calc(100vh-100px)] w-[260px] overflow-y-scroll"
    >
      <div ref="providerContainerOne" class="rect-printElement-types"></div>
      <div ref="providerContainerTwo" class="rect-printElement-types"></div>
    </div>
    <!--  模板  -->
    <div class="center flex-1">
      <div ref="hiprintPrintTemplate"></div>
    </div>
    <!--  设置  -->
    <div class="right w-1/5">
      <div ref="PrintElementOptionSetting"></div>
    </div>
  </div>
  <ElDialog v-model="importJsonTemplateVisible" title="导入模版">
    <ElAlert
      banner
      title="将导出模版的内容，全选，然后粘贴到下方，点击确定即可。"
    />
    <ElInput
      v-model="importJsonTemplateInput"
      :rows="20"
      class="mt-5"
      placeholder="请输入json模版数据"
      type="textarea"
    />
    <template #footer>
      <ElButton @click="importJsonTemplateVisible = false">取消</ElButton>
      <ElButton type="primary" @click="handleImportJsonTemOk">确定</ElButton>
    </template>
  </ElDialog>
  <PrintView ref="preViewRef" />
</template>

<style scoped>
.hiprint-printElement-image-content img {
  content: url('http://hiprint.io/Content/assets/hi.png');
}

.rect-printElement-types .hiprint-printElement-type > li > ul > li > a {
  height: auto !important;
  margin: 8px 3px;
  padding: 0 !important;
  color: #000000 !important;
  border: 1px solid #eaeaea !important;
  border-radius: 14px !important;
  line-height: 28px;
}

.rect-printElement-types .hiprint-printElement-type > li .title {
  background-color: #f7f9fd !important;
  line-height: 20px;
  padding-left: 5px !important;
  border: 1px solid #eaeaea;
  margin-bottom: 5px;
}

/* api按钮 */
.api {
  background: #00acc1;
}

.auto {
  width: auto !important;
}

/* 纸张 */
.paper {
  margin-right: 10px;
}

.paper button:not([class*='auto']) {
  width: 60px !important;
}

/* 多个 button 间距 */
.paper button + button {
  margin-left: -1px;
}

.paper button:first-child:last-child {
  border-radius: 4px;
}

/* 两边的 btn 圆角 */
.paper button:first-child:not(:last-child) {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.paper button:last-child:not(:first-child) {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.popover {
  position: absolute;
  margin-top: 10px;
  z-index: 10;
}

.popover .popover-content {
  background: white;
  border-radius: 4px;
  padding: 10px 14px;
  box-shadow: 5px 5px 10px #c3c3c3;
}

.popover .input {
  height: 24px;
  padding: 2px 4px;
}

.popover .input:hover {
  border-color: rgb(245, 155, 241);
  border-radius: 4px;
}

.center {
  margin: 0 10px;
  background: white;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  padding: 20px;
  box-shadow: 1px 1px 5px #c3c3c3;
  overflow: auto;
}

.right {
  background: white;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  padding: 10px 0;
  box-shadow: 1px 1px 5px #c3c3c3;
  overflow: auto;
}
</style>
