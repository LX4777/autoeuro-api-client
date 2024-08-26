import { ApiClient } from './app/ApiClient.js';
export class AutoeuroService extends ApiClient {
    async getResponse(response) {
        return (await response).data;
    }
    async getBalance() {
        return this.getResponse(this.request('/get_balance'));
    }
    async getDeliveries() {
        return this.getResponse(this.request('/get_deliveries'));
    }
    async getWarehouses(data) {
        return this.getResponse(this.request('/get_warehouses', data));
    }
    async getPayers() {
        return this.getResponse(this.request('/get_payers'));
    }
    async getBrands() {
        return this.getResponse(this.request('/get_brands'));
    }
    async searchBrands(data) {
        return this.getResponse(this.request('/search_brands', data));
    }
    async searchItems(data) {
        return this.getResponse(this.request('/search_items', data));
    }
    async createOrder(data) {
        return this.getResponse(this.request('/create_order', data));
    }
    async getOrders(data) {
        return this.getResponse(this.request('/get_orders', data));
    }
    async getStatuses() {
        return this.getResponse(this.request('/get_statuses'));
    }
}
//# sourceMappingURL=AutoeuroService.js.map