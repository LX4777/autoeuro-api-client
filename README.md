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
- Официальная документация доступна [здесь](https://api.autoeuro.ru/doc/v2).
- Имеются расхождения в типах свойств ответов от API с указанными в документации. В связи с этим были добавлены преобразования типов для следующих полей в соответствии с документацией:
  - В ответе `search_items` свойства `price`, `return`, `cross` по документации должны иметь типы `float`, `bit` и `int`, однако фактически возвращаются как `string`.
  - В ответе `get_deliveries` свойство `time_shift_msk` по документации должно быть `float`, но на практике возвращается как `string`.
  - В ответе `get_statuses` свойство `status_id` по документации должно быть `int`, но фактически возвращается как `string`.
- Валидация намеренно не добавлена, чтобы избежать увеличения количества зависимостей.
- Также доступна реализация клиента на [Go](https://github.com/LX4777/autoeuro-go-api-client).
