"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AutoeuroService_js_1 = require("../AutoeuroService.js");
const token = 'YOUR TOKEN HAS TO BE HERE';
const client = new AutoeuroService_js_1.AutoeuroService({
    baseURL: 'https://api.autoeuro.ru/api/v2/json',
    token: token,
    timeout: 2000,
});
const example = async () => {
    const response = await client.getBalance().catch((err) => {
        console.error(err);
        return null;
    });
    console.log(response);
};
example();
//# sourceMappingURL=index.js.map