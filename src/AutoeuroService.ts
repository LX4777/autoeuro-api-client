import { ApiClient } from './app/ApiClient.js';
import type {
  CreateOrderResponse,
  GetBalanceResponse, GetBrandsResponse,
  GetDeliveriesResponse, GetOrdersResponse,
  GetPayersResponse, GetStatusesResponse,
  GetWarehousesResponse, SearchBrandsResponse, SearchItemsResponse,
} from './types/Response.js';
import type { AxiosResponse } from 'axios';
import type {
  CreateOrderRequestData, GetOrdersRequestData,
  GetWarehousesRequestData,
  SearchBrandsRequestData,
  SearchItemsRequestData,
} from './types/RequestData.js';

export class AutoeuroService extends ApiClient {
  /**
   * Возвращает тело ответа
   * @param {Promise<AxiosResponse>} response
   * @private
   * @return {Promise}
   */
  private async getResponse<T>(response: Promise<AxiosResponse<T>>): Promise<T> {
    return (await response).data;
  }

  /**
   * Получение детальной информации о состоянии баланса личного счета
   * @return {Promise<GetBalanceResponse>}
   */
  async getBalance(): Promise<GetBalanceResponse> {
    return this.getResponse<GetBalanceResponse>(this.request<GetBalanceResponse>('/get_balance'));
  }

  /**
   * Получение массива возможных вариантов получения товара для клиента
   * @return {Promise<GetDeliveriesResponse>}
   */
  async getDeliveries(): Promise<GetDeliveriesResponse> {
    return this.getResponse<GetDeliveriesResponse>(this.request<GetDeliveriesResponse>('/get_deliveries'));
  }

  /**
   * Список складов, доступных клиенту для способа доставки
   * @param {GetWarehousesRequestData} data
   * @return {Promise<GetWarehousesResponse>}
   */
  async getWarehouses(data: GetWarehousesRequestData): Promise<GetWarehousesResponse> {
    return this.getResponse<GetWarehousesResponse>(this.request<GetWarehousesResponse>('/get_warehouses', data));
  }

  /**
   * Получение списка плательщиков (подразделений) для клиента
   * @return {GetPayersResponse}
   */
  async getPayers(): Promise<GetPayersResponse> {
    return this.getResponse<GetPayersResponse>(this.request<GetPayersResponse>('/get_payers'));
  }

  /**
   * Получение списка производителей
   * @return {Promise<GetBrandsResponse>}
   */
  async getBrands(): Promise<GetBrandsResponse> {
    return this.getResponse<GetBrandsResponse>(this.request<GetBrandsResponse>('/get_brands'));
  }

  /**
   * Получение списка брендов у которых есть искомый артикул
   * @param {SearchBrandsRequestData} data
   * @return {Promise<SearchBrandsResponse>}
   */
  async searchBrands(data: SearchBrandsRequestData): Promise<SearchBrandsResponse> {
    return this.getResponse<SearchBrandsResponse>(this.request<SearchBrandsResponse>('/search_brands', data));
  }

  /**
   * Поиск доступных для заказа товаров по бренду и коду с кроссами из наличия и под заказ
   * @param {SearchItemsRequestData} data
   * @return {Promise<SearchItemsResponse>}
   */
  async searchItems(data: SearchItemsRequestData): Promise<SearchItemsResponse> {
    const responsePromise = this.getResponse<SearchItemsResponse>(this.request<SearchItemsResponse>('/search_items', data));
    const response = await responsePromise;

    // Поля по факту приходят в виде строк. поэтому преобразуем их в number или float
    // @ts-ignore
    response.DATA = response.DATA.map(item => ({
      ...item,
      cross: typeof item.cross === 'string' ? Number.parseInt(item.cross) : item.cross,
      price: typeof item.price === 'string' ? Number.parseFloat(item.price) : item.price,
      return: typeof item.return === 'string' ? Number.parseInt(item.return) : item.cross,
    }));

    return response;
  }

  /**
   * Оформление заказа
   * @param {CreateOrderRequestData} data
   * @return {Promise<CreateOrderResponse>}
   */
  async createOrder(data: CreateOrderRequestData): Promise<CreateOrderResponse> {
    return this.getResponse<CreateOrderResponse>(this.request<CreateOrderResponse>('/create_order', data));
  }

  /**
   * Получение списка текущих, завершенных и отменных товаров с деталями заказа
   * @param {GetOrdersRequestData} data
   * @return {Promise<GetOrdersResponse>}
   */
  async getOrders(data: GetOrdersRequestData): Promise<GetOrdersResponse> {
    return this.getResponse<GetOrdersResponse>(this.request('/get_orders', data));
  }

  /**
   * Список возможных статусов для списка заказов
   * @return {Promise<GetStatusesResponse>}
   */
  async getStatuses(): Promise<GetStatusesResponse> {
    return this.getResponse<GetStatusesResponse>(this.request<GetStatusesResponse>('/get_statuses'));
  }
}
