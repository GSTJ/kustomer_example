/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
declare const Kustomer = {
  request: (props: {
    method: "get" | "post";
    url: string;
    body?: any;
  }): Promise<any> => {},

  initialize: (func: (context: any) => void): void => {},

  resize: (): void => {},

  showModal: (params: any): void => {},
};

interface Window {
  readonly Kustomer: typeof Kustomer;
}