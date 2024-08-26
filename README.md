# Api клиент на NodeJs для веб-сервиса Авто-Евро

Установка:
```shell
npm install git+https://github.com/LX4777/autoeuro-api-client.git
```

Пример использования:
```ts --пример использования
// ES Module импорт
import { AutoeuroService } from 'autoeuro-api-client/AutoeuroService';
// CommonJS импорт
const { AutoeuroService } = require('autoeuro-api-client/AutoeuroService');

const token = 'YOUR TOKEN HAS TO BE HERE';

const client = new AutoeuroService({
  baseURL: 'https://api.autoeuro.ru/api/v2/json',
  token: token,
});

const example = async () => {
  console.log(await client.getStatuses());
};

example()
```
