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
  balance: number; //float
  credit: number; //float
  ordered: number; //float
  reserved: number; //float
  limit: number; //float
  pay_tomorrow: number; //float
  shipping_from: number; //float
  active: 0 | 1; //bit
}>

export type GetDeliveriesResponse = Response<{
  delivery_key: string; //string
  name: string; //string
  time_shift_msk: number; // float, а по факту приходит string
}>

export type GetWarehousesResponse = Response<{
  warehouse_id: string; //string
  warehouse_key: string; //string
  warehouse_name: string; //string
}>

export type GetPayersResponse = Response<{
  payer_name: string; //string
  payer_key: string; //string
}>

export type GetBrandsResponse = Response<{
  brand: string; //string
}>

export type SearchBrandsResponse = Response<{
  brand: string; //string
  code: string; //string
  name: string; //string
}>

export type SearchItemsResponse = Response<{
  offer_key: string; //string
  stock: 0 | 1; //bit
  cross: null | 0 | 1 | 2 | 3 | 10 | 11 | 12; // int, а по факту приходит string
  brand: string; //string
  code: string; //string
  name: string; //string
  packing: number; //int
  price: number; //float, а по факту приходит string
  currency: string; //string
  amount: number; //int
  unit: string; //string
  return: 0 | 1; //bit, а по факту приходит string
  order_before: string; //datetime
  delivery_time: string; //datetime
  delivery_time_max: string; //datetime
  rejects: number; //float
  dealer: 0 | 1; //bit
  warehouse_name: string; //string
  warehouse_key: string; //string
}>

export type CreateOrderResponse = Response<{
  order_id: number; //int
  result: boolean; //boolean
  result_description: string; //string
}>

export type GetOrdersResponse = Response<{
  brand: string; //string
  code: string; //string
  name: string; //string
  price: number; //float
  amount: number; //int
  unit: string; //string
  dealer: 0 | 1; //bit
  cancelable: 0 | 1; //bit
  returnable: 0 | 1; //bit
  status_id: number; //int
  status: string; //string
  document: string; //string
  order_id: number; //int
  comment: string; //string
  united: 0 | 1; //bit
  order_date: string; //date
  order_number: string; //string
  delivery: string; //string
  delivery_date: string; //date
  order_key: string; //date
}>

export type GetStatusesResponse = Response<{
  group: string; //string
  status_id: number; //int, а по факту приходит string
  name: string; //string
  description: string; //text
}>