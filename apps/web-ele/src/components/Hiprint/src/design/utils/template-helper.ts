import { hiprint } from 'vue-plugin-hiprint';

const templateMap = {};

export function newHiprintPrintTemplate(key, options) {
  const template = new hiprint.PrintTemplate(options);
  templateMap[key] = template;
  return template;
}

export function getHiprintPrintTemplate(key) {
  return templateMap[key];
}
