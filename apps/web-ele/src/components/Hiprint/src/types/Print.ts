import type { PrintOptions } from '../../Props';

export interface PrintActionType {
  getTemplate: () => Promise<any>;
  getOptions: () => Promise<PrintOptions>;
}
