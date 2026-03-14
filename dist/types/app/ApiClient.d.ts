import { ApiClientConfig } from '../types/ApiClientConfig.js';
import { CreateOrderRequestData, GetOrdersRequestData, GetWarehousesRequestData, SearchBrandsRequestData, SearchItemsRequestData } from '../types/RequestData.js';
export declare class ApiClient {
    protected config: ApiClientConfig;
    constructor(config: ApiClientConfig);
    protected request<T>(endpoint: string, data?: GetWarehousesRequestData | SearchBrandsRequestData | SearchItemsRequestData | CreateOrderRequestData | GetOrdersRequestData): Promise<T>;
}
