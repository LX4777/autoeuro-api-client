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
  DATA: T[];
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

export type GetDeliveriesResponse = Response<{
  delivery_key: string;
  name: string;
  time_shift_msk: number;
}>

export type GetWarehousesResponse = Response<{
  warehouse_id: string;
  warehouse_key: string;
  warehouse_name: string;
}>
