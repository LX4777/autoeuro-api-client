"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiClient = void 0;
class ApiClient {
    constructor(config) {
        this.config = config;
    }
    async request(endpoint, data) {
        const controller = new AbortController();
        const timeout = this.config.timeout || 10000;
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        try {
            const response = await fetch(`${this.config.baseURL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    key: this.config.token,
                },
                body: data ? JSON.stringify(data) : undefined,
                signal: controller.signal,
            });
            const responseData = await response.json();
            return responseData;
        }
        catch (error) {
            if (error instanceof Error && error.name === 'AbortError') {
                throw new Error(`Request timeout after ${timeout}ms`);
            }
            throw error;
        }
        finally {
            clearTimeout(timeoutId);
        }
    }
}
exports.ApiClient = ApiClient;
//# sourceMappingURL=ApiClient.js.map