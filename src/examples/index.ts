import { AutoeuroService } from '../AutoeuroService.js';

const token = "YOUR TOKEN HAS TO BE HERE";

const client = new AutoeuroService({
  baseURL: 'https://api.autoeuro.ru/api/v2/json',
  token: token,
});

console.log(await client.getStatuses());
