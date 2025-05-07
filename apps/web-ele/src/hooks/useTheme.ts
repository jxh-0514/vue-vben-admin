import { watch } from 'vue';

import { usePreferences } from '@vben/preferences';

export function useTheme(onChange?: (theme: string) => void) {
  const { theme } = usePreferences();

  // 监听 isDark 的变化并调用外部回调
  watch(
    theme,
    (newValue) => {
      if (onChange) {
        onChange(newValue); // 触发外部的回调
      }
    },
    { immediate: true },
  ); // 立即执行回调以确保首次调用

  // 返回 isDark 供外部使用
  return { theme };
}
