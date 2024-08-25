import { ApiClient } from './ApiClient.js';
import { ApiClientConfig } from './Contracts/ApiClientConfig.js';
import { GetBalanceResponse } from './Response.js';
import { AxiosResponse } from 'axios';

class AutoeuroService extends ApiClient {
  constructor(config: ApiClientConfig) {
    super(config);
  }

  private async getResponse<T>(response: Promise<AxiosResponse<T, ApiClientConfig>>): Promise<T> {
    return (await response).data;
  }

  async getBalance(): Promise<GetBalanceResponse> {
    return this.getResponse<GetBalanceResponse>(this.request<GetBalanceResponse>('/get_balance'));
  }
}
