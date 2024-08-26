import axios from 'axios';
export class ApiClient {
    constructor(config) {
        this.axiosInstance = axios.create({
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
//# sourceMappingURL=ApiClient.js.map