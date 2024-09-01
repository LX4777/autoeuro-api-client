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
    };
};
export type GetBalanceResponse = Response<{
    balance: number;
    credit: number;
    ordered: number;
    reserved: number;
    limit: number;
    pay_tomorrow: number;
    shipping_from: number;
    active: 0 | 1;
}>;
export type GetDeliveriesResponse = Response<{
    delivery_key: string;
    name: string;
    time_shift_msk: number;
}>;
export type GetWarehousesResponse = Response<{
    warehouse_id: string;
    warehouse_key: string;
    warehouse_name: string;
}>;
export type GetPayersResponse = Response<{
    payer_name: string;
    payer_key: string;
}>;
export type GetBrandsResponse = Response<{
    brand: string;
}>;
export type SearchBrandsResponse = Response<{
    brand: string;
    code: string;
    name: string;
}>;
export type SearchItemsResponse = Response<{
    offer_key: string;
    stock: 0 | 1;
    cross: null | 0 | 1 | 2 | 3 | 10 | 11 | 12;
    brand: string;
    code: string;
    name: string;
    packing: number;
    price: number;
    currency: string;
    amount: number;
    unit: string;
    return: 0 | 1;
    order_before: string;
    delivery_time: string;
    delivery_time_max: string;
    rejects: number;
    dealer: 0 | 1;
    warehouse_name: string;
    warehouse_key: string;
}>;
export type CreateOrderResponse = Response<{
    order_id: number;
    result: boolean;
    result_description: string;
}>;
export type GetOrdersResponse = Response<{
    brand: string;
    code: string;
    name: string;
    price: number;
    amount: number;
    unit: string;
    dealer: 0 | 1;
    cancelable: 0 | 1;
    returnable: 0 | 1;
    status_id: number;
    status: string;
    document: string;
    order_id: number;
    comment: string;
    united: 0 | 1;
    order_date: string;
    order_number: string;
    delivery: string;
    delivery_date: string;
    order_key: string;
}>;
export type GetStatusesResponse = Response<{
    group: string;
    status_id: number;
    name: string;
    description: string;
}>;
