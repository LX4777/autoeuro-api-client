export interface GetWarehousesRequestData {
  delivery_key: string; //string
}

export interface SearchBrandsRequestData {
  code: string; //string:200
}

export interface SearchItemsRequestData {
  brand: string; //string:255
  code: string; //string:255
  delivery_key: string; //text
  with_crosses?: 0 | 1; //bit
  with_offers?: 0 | 1; //bit
}

export interface CreateOrderRequestData {
  delivery_key: string; //text
  payer_key: string; //text
  stock_items: {
    offer_key: string; //string
    quantity: number; //int
    price?: number; //float
    comment?: string; //string
  }[];
  wait_all_goods?: 0 | 1; //bit
  comment?: string; //string:255
  delivery_date?: string; //string
}

type RequireOnlyOne<T, K extends keyof T = keyof T> =
  K extends keyof T
    ? { [P in K]: T[P] } & Partial<Record<Exclude<keyof T, K>, never>>
    : never;

export type GetOrdersRequestData = RequireOnlyOne<{
  orders: string[];
  filters: {
    from: string; //string:10
    to: string; //string:10
    delivery_key: string; //string
    payer_key?: string; //string
  }[];
}>;