"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoeuroService = void 0;
const ApiClient_1 = require("./app/ApiClient");
class AutoeuroService extends ApiClient_1.ApiClient {
    async getResponse(response) {
        return (await response).data;
    }
    async getBalance() {
        return this.getResponse(this.request('/get_balance'));
    }
    async getDeliveries() {
        const responsePromise = this.getResponse(this.request('/get_deliveries'));
        const response = (await responsePromise);
        if (Array.isArray(response.DATA)) {
            response.DATA = response.DATA.map(item => (Object.assign(Object.assign({}, item), { time_shift_msk: typeof item.time_shift_msk === 'string' ? Number.parseInt(item.time_shift_msk) : item.time_shift_msk })));
        }
        return response;
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
        const responsePromise = this.getResponse(this.request('/search_items', data));
        const response = (await responsePromise);
        if (Array.isArray(response.DATA)) {
            response.DATA = response.DATA.map(item => (Object.assign(Object.assign({}, item), { cross: typeof item.cross === 'string' ? Number.parseInt(item.cross) : item.cross, price: typeof item.price === 'string' ? Number.parseFloat(item.price) : item.price, return: typeof item.return === 'string' ? Number.parseInt(item.return) : item.cross })));
        }
        return response;
    }
    async createOrder(data) {
        return this.getResponse(this.request('/create_order', data));
    }
    async getOrders(data) {
        return this.getResponse(this.request('/get_orders', data));
    }
    async getStatuses() {
        const responsePromise = this.getResponse(this.request('/get_statuses'));
        const response = (await responsePromise);
        if (Array.isArray(response.DATA)) {
            response.DATA = response.DATA.map(item => (Object.assign(Object.assign({}, item), { status_id: typeof item.status_id === 'string' ? Number.parseInt(item.status_id) : item.status_id })));
        }
        return response;
    }
}
exports.AutoeuroService = AutoeuroService;
//# sourceMappingURL=AutoeuroService.js.map