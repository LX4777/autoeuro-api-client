export type Response<T> = {
  META: {
    resource: string;
    version: string;
    section: string;
    parameters: Record<string, string | number | boolean>;
    date: string;
    user_id: string;
  };
} & {
  DATA: T;
  ERROR: never;
} | {
  DATA: never;
  ERROR: {
    code: number;
    message: string;
  }
}

export type GetBalanceResponse = Response<{
  balance: number;
  credit: number;
  ordered: number;
  reserved: number;
  limit: number;
  pay_tomorrow: number;
  shipping_from: number;
  active: 0 | 1;
}>
