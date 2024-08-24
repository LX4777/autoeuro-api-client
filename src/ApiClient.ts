import { ApiClientConfig } from './Contracts/ApiClientConfig.js';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class ApiClient {
  protected axiosInstance: AxiosInstance;

  constructor(config: ApiClientConfig) {
    this.axiosInstance = axios.create({
      baseURL: config.baseURL,
      headers: config.headers,
      timeout: config.timeout,
    });
  }

  protected async request<T>(method: string, endpoint: string, data?: any): Promise<T> {
    const config: AxiosRequestConfig = {
      method,
      url: endpoint,
      data,
    };

    const response: AxiosResponse<T> = await this.axiosInstance.request<T>(config);
    return response.data;
  }

  protected get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    return this.axiosInstance.get<T>(endpoint, { params }).then(response => response.data);
  }

  protected post<T>(endpoint: string, data: any): Promise<T> {
    return this.axiosInstance.post<T>(endpoint, data).then(response => response.data);
  }

  protected put<T>(endpoint: string, data: any): Promise<T> {
    return this.axiosInstance.put<T>(endpoint, data).then(response => response.data);
  }

  protected delete<T>(endpoint: string): Promise<T> {
    return this.axiosInstance.delete<T>(endpoint).then(response => response.data);
  }
}
