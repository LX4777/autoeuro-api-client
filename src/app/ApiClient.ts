import { ApiClientConfig } from '../types/ApiClientConfig.js';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  CreateOrderRequestData, GetOrdersRequestData,
  GetWarehousesRequestData,
  SearchBrandsRequestData,
  SearchItemsRequestData,
} from '../types/RequestData.js';

export class ApiClient {
  protected axiosInstance: AxiosInstance;

  constructor(config: ApiClientConfig) {
    this.axiosInstance = axios.create({
      baseURL: config.baseURL,
      headers: {
        'Content-Type': 'application/json',
        key: config.token,
      },
    });
  }

  protected async request<T>(endpoint: string, data?: GetWarehousesRequestData | SearchBrandsRequestData | SearchItemsRequestData | CreateOrderRequestData | GetOrdersRequestData): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(endpoint, data);
  }
}
