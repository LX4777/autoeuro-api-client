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
  with_crosses: 0|1;
  with_offers: 0|1;
}
