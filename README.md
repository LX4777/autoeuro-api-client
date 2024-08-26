# Api клиент на NodeJs для веб-сервиса Авто-Евро

Пример использования:
```ts --пример использования

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
