import { ApiClient } from './ApiClient.js';
import type { ApiClientConfig } from './Contracts/ApiClientConfig.js';
import type {
  GetBalanceResponse, GetBrandsResponse,
  GetDeliveriesResponse,
  GetPayersResponse,
  GetWarehousesResponse, SearchBrandsResponse, SearchItemsResponse,
} from './Response.js';
import type { AxiosResponse } from 'axios';
import type { GetWarehousesRequestData, SearchBrandsRequestData, SearchItemsRequestData } from './RequestData.js';

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

  async getPayers(): Promise<GetPayersResponse> {
    return this.getResponse<GetPayersResponse>(this.request<GetPayersResponse>('/get_payers'));
  }

  async getBrands(): Promise<GetBrandsResponse> {
    return this.getResponse<GetBrandsResponse>(this.request<GetBrandsResponse>('/get_brands'));
  }

  async searchBrands(data: SearchBrandsRequestData): Promise<SearchBrandsResponse> {
    return this.getResponse<SearchBrandsResponse>(this.request<SearchBrandsResponse>('/search_brands', data));
  }

  async searchItems(data: SearchItemsRequestData): Promise<SearchItemsResponse> {
    return this.getResponse<SearchItemsResponse>(this.request<SearchItemsResponse>('/search_items', data));
  }
}
