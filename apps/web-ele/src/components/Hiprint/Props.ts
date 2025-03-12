export interface PrintOptions {
  data: any;
  fileName?: string;
}

export interface BasicPrintProps {
  printType: any;
  options: () => Promise<PrintOptions>;
}
