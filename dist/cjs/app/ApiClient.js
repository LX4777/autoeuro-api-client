"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiClient = void 0;
const axios_1 = __importDefault(require("axios"));
class ApiClient {
    constructor(config) {
        this.axiosInstance = axios_1.default.create({
            baseURL: config.baseURL,
            headers: {
                'Content-Type': 'application/json',
                key: config.token,
            },
        });
    }
    async request(endpoint, data) {
        return this.axiosInstance.post(endpoint, data);
    }
}
exports.ApiClient = ApiClient;
//# sourceMappingURL=ApiClient.js.map