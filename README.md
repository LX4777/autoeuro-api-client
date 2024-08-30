# Api клиент на NodeJs для веб-сервиса Авто-Евро

Установка из npm:
```shell
npm install autoeuro-api-client
```

Пример использования:
```ts --пример использования
// ES Module
import { AutoeuroService } from 'autoeuro-api-client';
// CommonJS
const { AutoeuroService } = require('autoeuro-api-client');

const token = 'YOUR TOKEN HAS TO BE HERE';

const client = new AutoeuroService({
  baseURL: 'https://api.autoeuro.ru/api/v2/json',
  token: token,
  timeout: 2000, // опционально
});

const example = async () => {
  const response =  await client.getBalance().catch((err) => {
    console.error(err)
    return null
  })

  console.log(response)
}

example()
```
