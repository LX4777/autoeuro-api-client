"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoeuroService = void 0;
const ApiClient_1 = require("./app/ApiClient");
class AutoeuroService extends ApiClient_1.ApiClient {
    async getBalance() {
        return this.request('/get_balance');
    }
    async getDeliveries() {
        const response = (await this.request('/get_deliveries'));
        if (Array.isArray(response.DATA)) {
            response.DATA = response.DATA.map((item) => (Object.assign(Object.assign({}, item), { time_shift_msk: typeof item.time_shift_msk === 'string' ? Number.parseInt(item.time_shift_msk) : item.time_shift_msk })));
        }
        return response;
    }
    async getWarehouses(data) {
        return this.request('/get_warehouses', data);
    }
    async getPayers() {
        return this.request('/get_payers');
    }
    async getBrands() {
        return this.request('/get_brands');
    }
    async searchBrands(data) {
        return this.request('/search_brands', data);
    }
    async searchItems(data) {
        const response = (await this.request('/search_items', data));
        if (Array.isArray(response.DATA)) {
            response.DATA = response.DATA.map((item) => (Object.assign(Object.assign({}, item), { cross: typeof item.cross === 'string' ? Number.parseInt(item.cross) : item.cross, price: typeof item.price === 'string' ? Number.parseFloat(item.price) : item.price, return: typeof item.return === 'string' ? Number.parseInt(item.return) : item.cross })));
        }
        return response;
    }
    async createOrder(data) {
        return this.request('/create_order', data);
    }
    async getOrders(data) {
        return this.request('/get_orders', data);
    }
    async getStatuses() {
        const response = (await this.request('/get_statuses'));
        if (Array.isArray(response.DATA)) {
            response.DATA = response.DATA.map((item) => (Object.assign(Object.assign({}, item), { status_id: typeof item.status_id === 'string' ? Number.parseInt(item.status_id) : item.status_id })));
        }
        return response;
    }
}
exports.AutoeuroService = AutoeuroService;
//# sourceMappingURL=AutoeuroService.js.map