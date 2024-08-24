export interface ApiClientConfig {
  baseURL: string;
  headers?: Record<string, string>;
  timeout?: number;
}