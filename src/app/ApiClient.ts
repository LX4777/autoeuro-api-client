import { ApiClientConfig } from '../types/ApiClientConfig.js';
import {
  CreateOrderRequestData,
  GetOrdersRequestData,
  GetWarehousesRequestData,
  SearchBrandsRequestData,
  SearchItemsRequestData,
} from '../types/RequestData.js';

export class ApiClient {
  protected config: ApiClientConfig;

  /**
   * Создаёт экземпляр api-клиента
   * @param {ApiClientConfig} config
   */
  constructor(config: ApiClientConfig) {
    this.config = config;
  }

  /**
   * Делает запрос
   * @param {string} endpoint
   * @param {GetWarehousesRequestData|SearchBrandsRequestData|SearchItemsRequestData|CreateOrderRequestData|GetOrdersRequestData} data
   * @protected
   */
  protected async request<T>(
    endpoint: string,
    data?:
      | GetWarehousesRequestData
      | SearchBrandsRequestData
      | SearchItemsRequestData
      | CreateOrderRequestData
      | GetOrdersRequestData,
  ): Promise<T> {
    const controller = new AbortController();
    const timeout = this.config.timeout || 10000;
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.config.baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          key: this.config.token,
        },
        body: data ? JSON.stringify(data) : undefined,
        signal: controller.signal,
      });

      const responseData: T = await response.json();
      return responseData;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(`Request timeout after ${timeout}ms`);
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }
}
