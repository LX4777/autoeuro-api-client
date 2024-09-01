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

## Примечания
- Официальная документация [здесь](https://api.autoeuro.ru/doc/v2)
- Есть неточности в документации, которые я заметил. Поэтому были добавлены преобразования к данным полям:
  - В ответе `search_items` свойства `price`, `return`, `cross` по документации должны иметь тип `number`, а по факту `string`
  - В ответе `get_deliveries` свойство `time_shift_msk` по документации возвращает `number`, а по факту `string`
  - В ответе `get_statuses` свойство `status_id` по документации возвращает `number`, а по факту `string`
