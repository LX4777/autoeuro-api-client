import {
  GetBalanceResponse,
  GetDeliveriesResponse,
  GetWarehousesResponse,
  GetPayersResponse,
  GetBrandsResponse,
  SearchBrandsResponse,
  SearchItemsResponse,
  CreateOrderResponse,
  GetOrdersResponse,
  GetStatusesResponse,
} from '../types/Response';
import { AutoeuroService } from '../AutoeuroService';

describe('AutoeuroService', () => {
  let service: AutoeuroService;
  let mockedFetch: jest.Mock;

  beforeEach(() => {
    mockedFetch = jest.fn();
    global.fetch = mockedFetch;
    service = new AutoeuroService({ token: '', baseURL: '' });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('тест /get_balance', async () => {
    // @ts-ignore
    const mockData: GetBalanceResponse = {
      META: {
        resource: '/get_balance',
        version: '1.0',
        section: 'balance',
        parameters: {},
        date: '2024-09-01',
        user_id: '12345',
      },
      DATA: [
        {
          balance: 100.5,
          credit: 50.0,
          ordered: 25.0,
          reserved: 10.0,
          limit: 500.0,
          pay_tomorrow: 15.0,
          shipping_from: 5.0,
          active: 1,
        },
      ],
    };

    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const result = await service.getBalance();

    expect(result.DATA[0]).toEqual(mockData.DATA[0]);
    expect(mockedFetch).toHaveBeenCalledWith('/get_balance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        key: '',
      },
      body: undefined,
      signal: expect.any(AbortSignal),
    });
  });

  it('тест /get_deliveries', async () => {
    // @ts-ignore
    const mockData: GetDeliveriesResponse = {
      META: {
        resource: '/get_deliveries',
        version: '1.0',
        section: 'deliveries',
        parameters: {},
        date: '2024-09-01',
        user_id: '12345',
      },
      DATA: [
        {
          delivery_key: 'DEL1',
          name: 'Delivery One',
          time_shift_msk: 3,
        },
      ],
    };

    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const result = await service.getDeliveries();

    expect(result.DATA[0]).toEqual(mockData.DATA[0]);
    expect(mockedFetch).toHaveBeenCalledWith('/get_deliveries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        key: '',
      },
      body: undefined,
      signal: expect.any(AbortSignal),
    });
  });

  it('тест /get_deliveries - с неверным типом данных в time_shift_msk', async () => {
    // @ts-ignore
    const mockData = {
      META: {
        resource: '/get_deliveries',
        version: '1.0',
        section: 'deliveries',
        parameters: {},
        date: '2024-09-01',
        user_id: '12345',
      },
      DATA: [
        {
          delivery_key: 'DEL1',
          name: 'Delivery One',
          time_shift_msk: '3',
        },
      ],
    };

    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const result = await service.getDeliveries();

    expect(result.DATA[0].time_shift_msk).toEqual(Number.parseInt(mockData.DATA[0].time_shift_msk));
  });

  it('тест /get_warehouses', async () => {
    // @ts-ignore
    const mockData: GetWarehousesResponse = {
      META: {
        resource: '/get_warehouses',
        version: '1.0',
        section: 'warehouses',
        parameters: {},
        date: '2024-09-01',
        user_id: '12345',
      },
      DATA: [
        {
          warehouse_id: 'WH1',
          warehouse_key: 'KEY1',
          warehouse_name: 'Warehouse One',
        },
      ],
    };

    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const result = await service.getWarehouses({ delivery_key: 'KEY' });

    expect(result.DATA[0]).toEqual(mockData.DATA[0]);
    expect(mockedFetch).toHaveBeenCalledWith('/get_warehouses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        key: '',
      },
      body: JSON.stringify({ delivery_key: 'KEY' }),
      signal: expect.any(AbortSignal),
    });
  });

  it('тест /get_payers', async () => {
    // @ts-ignore
    const mockData: GetPayersResponse = {
      META: {
        resource: '/get_payers',
        version: '1.0',
        section: 'payers',
        parameters: {},
        date: '2024-09-01',
        user_id: '12345',
      },
      DATA: [
        {
          payer_name: 'Payer One',
          payer_key: 'PKEY1',
        },
      ],
    };

    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const result = await service.getPayers();

    expect(result.DATA[0]).toEqual(mockData.DATA[0]);
    expect(mockedFetch).toHaveBeenCalledWith('/get_payers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        key: '',
      },
      body: undefined,
      signal: expect.any(AbortSignal),
    });
  });

  it('тест /get_brands', async () => {
    // @ts-ignore
    const mockData: GetBrandsResponse = {
      META: {
        resource: '/get_brands',
        version: '1.0',
        section: 'brands',
        parameters: {},
        date: '2024-09-01',
        user_id: '12345',
      },
      DATA: [
        {
          brand: 'Brand One',
        },
      ],
    };

    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const result = await service.getBrands();

    expect(result).toEqual(mockData);
    expect(mockedFetch).toHaveBeenCalledWith('/get_brands', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        key: '',
      },
      body: undefined,
      signal: expect.any(AbortSignal),
    });
  });

  it('test /search_items', async () => {
    // @ts-ignore
    const mockData: SearchItemsResponse = {
      META: {
        resource: '/search_items',
        version: '1.0',
        section: 'items',
        parameters: {},
        date: '2024-09-01',
        user_id: '12345',
      },
      DATA: [
        {
          offer_key: 'OFF1',
          stock: 1,
          cross: 1, // приходит как строка
          brand: 'Brand One',
          code: 'CODE1',
          name: 'Item One',
          packing: 10,
          price: 100.5, // приходит как строка
          currency: 'USD',
          amount: 20,
          unit: 'pcs',
          return: 0, // приходит как строка
          order_before: '2024-09-07',
          delivery_time: '2024-09-10',
          delivery_time_max: '2024-09-12',
          rejects: 0,
          dealer: 1,
          warehouse_name: 'Warehouse One',
          warehouse_key: 'KEY1',
        },
      ],
    };

    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const result = await service.searchItems({ brand: 'Brand One', code: 'CODE1', delivery_key: 'KEY' });

    // Проверяем что данные корректно преобразуются
    expect(result).toEqual(mockData);
    expect(mockedFetch).toHaveBeenCalledWith('/search_items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        key: '',
      },
      body: JSON.stringify({
        brand: 'Brand One',
        code: 'CODE1',
        delivery_key: 'KEY',
      }),
      signal: expect.any(AbortSignal),
    });
  });

  it('тест /search_items с неверными типами свойств', async () => {
    // @ts-ignore
    const mockData = {
      META: {
        resource: '/search_items',
        version: '1.0',
        section: 'items',
        parameters: {},
        date: '2024-09-01',
        user_id: '12345',
      },
      DATA: [
        {
          offer_key: 'OFF1',
          stock: 1,
          cross: '1', // приходит как строка
          brand: 'Brand One',
          code: 'CODE1',
          name: 'Item One',
          packing: 10,
          price: '100.5', // приходит как строка
          currency: 'USD',
          amount: 20,
          unit: 'pcs',
          return: '0', // приходит как строка
          order_before: '2024-09-07',
          delivery_time: '2024-09-10',
          delivery_time_max: '2024-09-12',
          rejects: 0,
          dealer: 1,
          warehouse_name: 'Warehouse One',
          warehouse_key: 'KEY1',
        },
      ],
    };

    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const result = await service.searchItems({ brand: 'Brand One', code: 'CODE1', delivery_key: 'KEY' });

    // Проверяем что данные корректно преобразуются
    expect(result.DATA).toEqual(
      mockData.DATA.map((row) => ({
        ...row,
        return: Number.parseInt(row.return),
        price: Number.parseFloat(row.price),
        cross: Number.parseInt(row.cross),
      })),
    );
    expect(mockedFetch).toHaveBeenCalledWith('/search_items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        key: '',
      },
      body: JSON.stringify({
        brand: 'Brand One',
        code: 'CODE1',
        delivery_key: 'KEY',
      }),
      signal: expect.any(AbortSignal),
    });
  });

  it('тест /search_brands', async () => {
    //@ts-ignore
    const mockResponse: SearchBrandsResponse = {
      META: { resource: 'brands', version: '1.0', section: 'test', parameters: {}, date: '', user_id: '' },
      DATA: [{ brand: 'Brand1', code: '123', name: 'Test Brand' }],
    };

    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await service.searchBrands({ code: '123' });

    expect(mockedFetch).toHaveBeenCalledWith('/search_brands', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        key: '',
      },
      body: JSON.stringify({ code: '123' }),
      signal: expect.any(AbortSignal),
    });
    expect(result.DATA[0].code).toBe('123');
  });

  it('тест /search_brands - получение ошибки от веб-сервиса', async () => {
    //@ts-ignore
    const mockErrorResponse: SearchBrandsResponse = {
      META: { resource: 'brands', version: '1.0', section: 'test', parameters: {}, date: '', user_id: '' },
      ERROR: { code: 400, message: 'Bad Request' },
    };

    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => mockErrorResponse,
    });

    const result = await service.searchBrands({ code: '123' });

    expect(result.ERROR.code).toBe(400);
    expect(result.ERROR.message).toBe('Bad Request');
  });

  it('тест /create_order', async () => {
    //@ts-ignore
    const mockResponse: CreateOrderResponse = {
      META: { resource: 'order', version: '1.0', section: 'test', parameters: {}, date: '', user_id: '' },
      DATA: [{ order_id: 123, result: true, result_description: 'Order created successfully' }],
    };

    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await service.createOrder({ delivery_key: '', payer_key: '', stock_items: [] });

    expect(mockedFetch).toHaveBeenCalledWith('/create_order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        key: '',
      },
      body: JSON.stringify({
        delivery_key: '',
        payer_key: '',
        stock_items: [],
      }),
      signal: expect.any(AbortSignal),
    });
    expect(result.DATA[0].result).toBe(true);
    expect(result.DATA[0].order_id).toBe(123);
  });

  it('тест /create_order - получение ошибки от веб-сервиса', async () => {
    //@ts-ignore
    const mockErrorResponse: CreateOrderResponse = {
      META: { resource: 'order', version: '1.0', section: 'test', parameters: {}, date: '', user_id: '' },
      ERROR: { code: 500, message: 'Internal Server Error' },
    };

    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => mockErrorResponse,
    });

    const result = await service.createOrder({ delivery_key: '', payer_key: '', stock_items: [] });

    expect(result.ERROR.code).toBe(500);
    expect(result.ERROR.message).toBe('Internal Server Error');
  });

  it('тест /get_orders', async () => {
    //@ts-ignore
    const mockResponse: GetOrdersResponse = {
      META: { resource: 'orders', version: '1.0', section: 'test', parameters: {}, date: '', user_id: '' },
      DATA: [
        {
          brand: 'Brand1',
          code: '',
          order_id: 456,
          price: 10,
          status_id: 2,
          amount: 3,
          cancelable: 0,
          dealer: 1,
          name: '',
          comment: '',
          delivery: '',
          delivery_date: '',
          order_date: '',
          order_key: 'order_key',
          order_number: '23231',
          unit: 'ps',
          document: '123',
          returnable: 1,
          status: 'ok',
          united: 0,
        },
      ],
    };

    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await service.getOrders({ orders: [456] });

    expect(mockedFetch).toHaveBeenCalledWith('/get_orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        key: '',
      },
      body: JSON.stringify({ orders: [456] }),
      signal: expect.any(AbortSignal),
    });
    expect(result).toEqual(mockResponse);
  });

  it('тест /get_orders - получение ошибки от веб-сервиса', async () => {
    //@ts-ignore
    const mockErrorResponse: GetOrdersResponse = {
      META: { resource: 'orders', version: '1.0', section: 'test', parameters: {}, date: '', user_id: '' },
      ERROR: { code: 404, message: 'Orders not found' },
    };

    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => mockErrorResponse,
    });

    const result = await service.getOrders({ orders: [456] });

    expect(result.ERROR.code).toBe(404);
    expect(result.ERROR.message).toBe('Orders not found');
  });

  it('тест /get_statuses', async () => {
    //@ts-ignore
    const mockResponse: GetStatusesResponse = {
      META: { resource: 'statuses', version: '1.0', section: 'test', parameters: {}, date: '', user_id: '' },
      DATA: [{ group: 'Group1', status_id: 1, name: 'Status1', description: 'Test description' }],
    };

    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await service.getStatuses();

    expect(mockedFetch).toHaveBeenCalledWith('/get_statuses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        key: '',
      },
      body: undefined,
      signal: expect.any(AbortSignal),
    });
    expect(result.DATA[0].status_id).toBe(1);
    expect(result.DATA[0].name).toBe('Status1');
  });

  it('тест /get_statuses - с неверным типом status_is', async () => {
    const mockResponse = {
      META: { resource: 'statuses', version: '1.0', section: 'test', parameters: {}, date: '', user_id: '' },
      DATA: [{ group: 'Group1', status_id: '1', name: 'Status1', description: 'Test description' }],
    };

    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await service.getStatuses();

    expect(result.DATA[0].status_id).toBe(Number.parseInt(mockResponse.DATA[0].status_id));
  });

  it('тест /get_statuses - получение ошибки от веб-сервиса', async () => {
    //@ts-ignore
    const mockErrorResponse: GetStatusesResponse = {
      META: { resource: 'statuses', version: '1.0', section: 'test', parameters: {}, date: '', user_id: '' },
      ERROR: { code: 500, message: 'Internal Server Error' },
    };

    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => mockErrorResponse,
    });

    const result = await service.getStatuses();

    expect(result.ERROR.code).toBe(500);
    expect(result.ERROR.message).toBe('Internal Server Error');
  });
});
