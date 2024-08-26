"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AutoeuroService_js_1 = require("../AutoeuroService.js");
const token = 'YOUR TOKEN HAS TO BE HERE';
const client = new AutoeuroService_js_1.AutoeuroService({
    baseURL: 'https://api.autoeuro.ru/api/v2/json',
    token: token,
});
const example = async () => {
    console.log(await client.getStatuses());
};
example();
//# sourceMappingURL=index.js.map