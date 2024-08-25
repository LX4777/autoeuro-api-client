export type GetWarehousesRequestData = {
  delivery_key: string;
}

export type SearchBrandsRequestData = {
  code: string;
}

export type SearchItemsRequestData = {
  brand: string;
  code: string;
  delivery_key: string;
  with_crosses?: 0 | 1;
  with_offers?: 0 | 1;
}

export type CreateOrderRequestData = {
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