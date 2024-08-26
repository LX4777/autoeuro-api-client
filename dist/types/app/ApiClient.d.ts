import { ApiClientConfig } from '../types/ApiClientConfig.js';
import { AxiosInstance, AxiosResponse } from 'axios';
import { CreateOrderRequestData, GetOrdersRequestData, GetWarehousesRequestData, SearchBrandsRequestData, SearchItemsRequestData } from '../types/RequestData.js';
export declare class ApiClient {
    protected axiosInstance: AxiosInstance;
    constructor(config: ApiClientConfig);
    protected request<T>(endpoint: string, data?: GetWarehousesRequestData | SearchBrandsRequestData | SearchItemsRequestData | CreateOrderRequestData | GetOrdersRequestData): Promise<AxiosResponse<T>>;
}
