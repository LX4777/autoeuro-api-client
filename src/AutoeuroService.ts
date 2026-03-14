/**
 * Пакет реализует API Client для работы с веб-сервисом компании АО "Авто-Евро"
 * Автор: Рожков Василий <profilrv@gmail.com> (GitHub: https://github.com/LX4777)
 *
 * Лицензия: MIT (https://opensource.org/licenses/MIT)
 * Данный пакет реализует работу со всеми функциями веб-сервиса на дату 01.09.2024.
 *
 * Для дополнительной информации посетите репозиторий: https://github.com/LX4777/autoeuro-api-client
 */

import { ApiClient } from './app/ApiClient';
import type {
  CreateOrderResponse,
  GetBalanceResponse,
  GetBrandsResponse,
  GetDeliveriesResponse,
  GetOrdersResponse,
  GetPayersResponse,
  GetStatusesResponse,
  GetWarehousesResponse,
  Response,
  SearchBrandsResponse,
  SearchItemsResponse,
} from './types/Response.js';
import type {
  CreateOrderRequestData,
  GetOrdersRequestData,
  GetWarehousesRequestData,
  SearchBrandsRequestData,
  SearchItemsRequestData,
} from './types/RequestData.js';

export class AutoeuroService extends ApiClient {
  /**
   * Получение детальной информации о состоянии баланса личного счёта
   * @return {Promise<GetBalanceResponse>}
   */
  async getBalance(): Promise<GetBalanceResponse> {
    return this.request<GetBalanceResponse>('/get_balance');
  }

  /**
   * Получение массива возможных вариантов получения товара для клиента
   * @return {Promise<GetDeliveriesResponse>}
   */
  async getDeliveries(): Promise<GetDeliveriesResponse> {
    const response = (await this.request<GetDeliveriesResponse>('/get_deliveries')) as Response<{
      time_shift_msk: number | string; // float, а по факту приходит string
    }>;

    if (Array.isArray(response.DATA)) {
      // свойство time_shift_msk по факту приходит в виде строки, поэтому преобразуем его в number.
      response.DATA = response.DATA.map((item) => ({
        ...item,
        time_shift_msk:
          typeof item.time_shift_msk === 'string' ? Number.parseInt(item.time_shift_msk) : item.time_shift_msk,
      }));
    }

    return response as GetDeliveriesResponse;
  }

  /**
   * Список складов, доступных клиенту для способа доставки
   * @param {GetWarehousesRequestData} data
   * @return {Promise<GetWarehousesResponse>}
   */
  async getWarehouses(data: GetWarehousesRequestData): Promise<GetWarehousesResponse> {
    return this.request<GetWarehousesResponse>('/get_warehouses', data);
  }

  /**
   * Получение списка плательщиков (подразделений) для клиента
   * @return {GetPayersResponse}
   */
  async getPayers(): Promise<GetPayersResponse> {
    return this.request<GetPayersResponse>('/get_payers');
  }

  /**
   * Получение списка производителей
   * @return {Promise<GetBrandsResponse>}
   */
  async getBrands(): Promise<GetBrandsResponse> {
    return this.request<GetBrandsResponse>('/get_brands');
  }

  /**
   * Получение списка брендов, у которых есть искомый артикул
   * @param {SearchBrandsRequestData} data
   * @return {Promise<SearchBrandsResponse>}
   */
  async searchBrands(data: SearchBrandsRequestData): Promise<SearchBrandsResponse> {
    return this.request<SearchBrandsResponse>('/search_brands', data);
  }

  /**
   * Поиск доступных для заказа товаров по бренду и коду с кроссами из наличия и под заказ
   * @param {SearchItemsRequestData} data
   * @return {Promise<SearchItemsResponse>}
   */
  async searchItems(data: SearchItemsRequestData): Promise<SearchItemsResponse> {
    const response = (await this.request<SearchItemsResponse>('/search_items', data)) as Response<{
      cross: string | number;
      price: string | number;
      return: string | number;
    }>;

    if (Array.isArray(response.DATA)) {
      // Поля по факту приходят в виде строк, поэтому преобразуем их в number или float.
      response.DATA = response.DATA.map((item) => ({
        ...item,
        cross: typeof item.cross === 'string' ? Number.parseInt(item.cross) : item.cross,
        price: typeof item.price === 'string' ? Number.parseFloat(item.price) : item.price,
        return: typeof item.return === 'string' ? Number.parseInt(item.return) : item.cross,
      }));
    }

    return response as SearchItemsResponse;
  }

  /**
   * Оформление заказа
   * @param {CreateOrderRequestData} data
   * @return {Promise<CreateOrderResponse>}
   */
  async createOrder(data: CreateOrderRequestData): Promise<CreateOrderResponse> {
    return this.request<CreateOrderResponse>('/create_order', data);
  }

  /**
   * Получение списка текущих, завершенных и отменных товаров с деталями заказа
   * @param {GetOrdersRequestData} data
   * @return {Promise<GetOrdersResponse>}
   */
  async getOrders(data: GetOrdersRequestData): Promise<GetOrdersResponse> {
    return this.request<GetOrdersResponse>('/get_orders', data);
  }

  /**
   * Список возможных статусов для списка заказов
   * @return {Promise<GetStatusesResponse>}
   */
  async getStatuses(): Promise<GetStatusesResponse> {
    const response = (await this.request<GetStatusesResponse>('/get_statuses')) as Response<{
      status_id: string | number;
    }>;

    if (Array.isArray(response.DATA)) {
      // свойство status_id по факту приходит в виде строки, поэтому преобразуем его в number.
      response.DATA = response.DATA.map((item) => ({
        ...item,
        status_id: typeof item.status_id === 'string' ? Number.parseInt(item.status_id) : item.status_id,
      }));
    }

    return response as GetStatusesResponse;
  }
}
