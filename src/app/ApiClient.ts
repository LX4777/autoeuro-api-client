import { ApiClientConfig } from '../types/ApiClientConfig.js';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

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

  protected async request<T>(endpoint: string, data?: any): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(endpoint, data);
  }
}
