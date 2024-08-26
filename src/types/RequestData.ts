export interface GetWarehousesRequestData {
  delivery_key: string;
}

export interface SearchBrandsRequestData {
  code: string;
}

export interface SearchItemsRequestData {
  brand: string;
  code: string;
  delivery_key: string;
  with_crosses?: 0 | 1;
  with_offers?: 0 | 1;
}

export interface CreateOrderRequestData {
  delivery_key: string;
  payer_key: string;
  stock_items: {
    offer_key: string;
    quantity: number;
    price?: number;
    comment?: string;
  }[];
  wait_all_goods?: 0 | 1;
  comment?: string;
  delivery_date?: string;
}

type RequireOnlyOne<T, K extends keyof T = keyof T> =
  K extends keyof T
    ? { [P in K]: T[P] } & Partial<Record<Exclude<keyof T, K>, never>>
    : never;

export type GetOrdersRequestData = RequireOnlyOne<{
  orders: string[];
  filters: {
    from: string;
    to: string;
    delivery_key: string;
    payer_key?: string;
  };
}>;