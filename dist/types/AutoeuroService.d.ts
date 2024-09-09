import { ApiClient } from './app/ApiClient';
import type { CreateOrderResponse, GetBalanceResponse, GetBrandsResponse, GetDeliveriesResponse, GetOrdersResponse, GetPayersResponse, GetStatusesResponse, GetWarehousesResponse, SearchBrandsResponse, SearchItemsResponse } from './types/Response.js';
import type { CreateOrderRequestData, GetOrdersRequestData, GetWarehousesRequestData, SearchBrandsRequestData, SearchItemsRequestData } from './types/RequestData.js';
export declare class AutoeuroService extends ApiClient {
    private getResponse;
    getBalance(): Promise<GetBalanceResponse>;
    getDeliveries(): Promise<GetDeliveriesResponse>;
    getWarehouses(data: GetWarehousesRequestData): Promise<GetWarehousesResponse>;
    getPayers(): Promise<GetPayersResponse>;
    getBrands(): Promise<GetBrandsResponse>;
    searchBrands(data: SearchBrandsRequestData): Promise<SearchBrandsResponse>;
    searchItems(data: SearchItemsRequestData): Promise<SearchItemsResponse>;
    createOrder(data: CreateOrderRequestData): Promise<CreateOrderResponse>;
    getOrders(data: GetOrdersRequestData): Promise<GetOrdersResponse>;
    getStatuses(): Promise<GetStatusesResponse>;
}
