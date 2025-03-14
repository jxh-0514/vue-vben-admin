import type { BasicPrintProps } from '../../Props';
import type { PrintActionType } from '../types/Print';

import { useId } from 'vue';

// import { getPrintDefaultTemplate } from '@/api/erp/website/print';
import { ElMessage } from 'element-plus';

export function usePrint(props: BasicPrintProps) {
  // 获取打印参数
  async function getOptions() {
    const options = await props.options();
    if (!options?.fileName) {
      options.fileName = useId();
    }
    return options;
  }

  // 加载模板数据
  async function reloadTemplateData(): Promise<any> {
    // 获取默认打印模板
    const config = await getPrintDefaultTemplate(props.printType);
    if (!config) {
      ElMessage.warning('当前模板不存在，请创建并设为默认值');
      throw new Error();
    }
    if (!config?.value) {
      ElMessage.warning('检测当前模板数据为空，请检查');
      throw new Error();
    }
    return config.value;
  }

  function registerPrint(fun: (params: PrintActionType) => void) {
    fun({
      getTemplate: reloadTemplateData,
      getOptions,
    });
  }

  return [registerPrint];
}
