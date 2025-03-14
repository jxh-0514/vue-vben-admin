/*
 * @Description:
 * @Author: CcSimple
 * @Github: https://github.com/CcSimple
 * @Date: 2023-02-09 10:40:26
 * @LastEditors: CcSimple
 * @LastEditTime: 2023-02-09 11:37:21
 */
import { hiprint } from 'vue-plugin-hiprint';

export const provider1 = function (options) {
  const addElementTypes = function (context) {
    context.removePrintElementTypes('providerModule1');
    context.addPrintElementTypes('providerModule1', [
      new hiprint.PrintElementTypeGroup('辅助工具', [
        {
          tid: 'providerModule1.customText',
          title: '文本',
          customText: '自定义文本',
          custom: true,
          type: 'text',
        },
        {
          tid: 'providerModule1.longText',
          title: '长文本',
          type: 'longText',
          options: {
            field: 'test.longText',
            width: 200,
            testData: '长文本分页/不分页测试',
          },
        },
        {
          tid: 'providerModule1.zdx',
          title: '装订线',
          type: 'vline',
          options: {
            left: 25.5,
            top: 57,
            height: 705,
            width: 9,
            fixed: true,
            borderStyle: 'dotted',
          },
        },
        {
          tid: 'providerModule1.hline',
          title: '横线',
          type: 'hline',
        },
        {
          tid: 'providerModule1.vline',
          title: '竖线',
          type: 'vline',
        },
        {
          tid: 'providerModule1.rect',
          title: '矩形',
          type: 'rect',
        },
        {
          tid: 'providerModule1.oval',
          title: '椭圆',
          type: 'oval',
        },
        {
          tid: 'providerModule1.image',
          title: '图片',
          data: 'http://hiprint.io/Content/assets/hi.png',
          type: 'image',
          options: {
            width: 204,
            height: 93,
          },
        },
      ]),
      new hiprint.PrintElementTypeGroup('常规', [
        options.config,
        {
          tid: 'providerModule1.qrcode',
          title: '二维码',
          data: 'XS888888888',
          type: 'text',
          options: {
            field: 'qrcode',
            testData: 'XS888888888',
            height: 32,
            fontSize: 12,
            lineHeight: 18,
            textType: 'qrcode',
          },
        },
        {
          tid: 'providerModule1.platform',
          title: '平台名称',
          data: '平台名称',
          type: 'text',
          options: {
            field: 'platform',
            testData: '平台名称',
            height: 17,
            fontSize: 16.5,
            fontWeight: '700',
            textAlign: 'center',
            hideTitle: true,
          },
        },
        {
          tid: 'rmb',
          title: '币别',
          data: '币别:  RMB',
          type: 'text',
          options: {
            height: 24,
            width: 562.5,
            fontSize: '9pt',
            textAlign: 'left',
            textContentVerticalAlign: 'middle',
          },
        },
        {
          tid: 'outTime',
          title: '单据日期',
          data: 'Dj12345654',
          type: 'text',
          options: {
            field: 'outTime',
            testData: 'Dj12345654',
            height: 24,
            width: 562.5,
            fontSize: '9pt',
            textAlign: 'left',
            textContentVerticalAlign: 'middle',
          },
        },
        {
          tid: 'no',
          title: '单据编号',
          data: '18888888888',
          type: 'text',
          options: {
            field: 'no',
            testData: '18888888888',
            height: 24,
            width: 562.5,
            fontSize: '9pt',
            textAlign: 'left',
            textContentVerticalAlign: 'middle',
          },
        },
      ]),
    ]);
  };
  return {
    addElementTypes,
  };
};
