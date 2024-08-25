import { ApiClient } from './ApiClient.js';
import type { ApiClientConfig } from './Contracts/ApiClientConfig.js';
import type { GetBalanceResponse, GetDeliveriesResponse, GetWarehousesResponse } from './Response.js';
import type { AxiosResponse } from 'axios';
import type { GetWarehousesRequestData } from './RequestData.js';

export class AutoeuroService extends ApiClient {
  constructor(config: ApiClientConfig) {
    super(config);
  }

  private async getResponse<T>(response: Promise<AxiosResponse<T, ApiClientConfig>>): Promise<T> {
    return (await response).data;
  }

  async getBalance(): Promise<GetBalanceResponse> {
    return this.getResponse<GetBalanceResponse>(this.request<GetBalanceResponse>('/get_balance'));
  }

  async getDeliveries(): Promise<GetDeliveriesResponse> {
    return this.getResponse<GetDeliveriesResponse>(this.request<GetDeliveriesResponse>('/get_deliveries'));
  }

  async getWarehouses(data: GetWarehousesRequestData): Promise<GetWarehousesResponse> {
    return this.getResponse<GetWarehousesResponse>(this.request<GetWarehousesResponse>('/get_warehouses', data));
  }
}
